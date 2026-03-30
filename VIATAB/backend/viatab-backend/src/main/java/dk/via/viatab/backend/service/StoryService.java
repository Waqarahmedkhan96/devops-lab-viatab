package dk.via.viatab.backend.service;

import dk.via.viatab.backend.dto.PagedResponse;
import dk.via.viatab.backend.dto.StoryRequest;
import dk.via.viatab.backend.dto.StoryResponse;
import dk.via.viatab.backend.entity.Department;
import dk.via.viatab.backend.entity.RoleName;
import dk.via.viatab.backend.entity.Story;
import dk.via.viatab.backend.entity.StoryStatus;
import dk.via.viatab.backend.entity.User;
import dk.via.viatab.backend.exception.ForbiddenException;
import dk.via.viatab.backend.exception.ResourceNotFoundException;
import dk.via.viatab.backend.mapper.StoryMapper;
import dk.via.viatab.backend.repository.StoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoryService {

    private final StoryRepository storyRepository;
    private final UserService userService;

    public StoryService(StoryRepository storyRepository, UserService userService) {
        this.storyRepository = storyRepository;
        this.userService = userService;
    }

    public PagedResponse<StoryResponse> getStories(int page, int size, String sortBy, String sortDir,
                                                    Department department, StoryStatus status, String search) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(sortDir).orElse(Sort.Direction.DESC);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        String normalizedSearch = StringUtils.hasText(search) ? search.trim() : null;
        Page<Story> storyPage = storyRepository.searchStories(department, status, normalizedSearch, pageable);

        List<StoryResponse> content = storyPage.stream()
                .map(StoryMapper::toStoryResponse)
                .collect(Collectors.toList());

        return new PagedResponse<>(content,
                storyPage.getNumber(),
                storyPage.getSize(),
                storyPage.getTotalElements(),
                storyPage.getTotalPages(),
                storyPage.isLast());
    }

    public StoryResponse getStoryById(Long id) {
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id " + id));
        return StoryMapper.toStoryResponse(story);
    }

    public PagedResponse<StoryResponse> getMyStories(int page, int size, String sortBy, String sortDir) {
        User currentUser = userService.getAuthenticatedUser();
        Sort.Direction direction = Sort.Direction.fromOptionalString(sortDir).orElse(Sort.Direction.DESC);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<Story> storyPage = storyRepository.findByAuthorId(currentUser.getId(), pageable);

        List<StoryResponse> content = storyPage.stream()
                .map(StoryMapper::toStoryResponse)
                .collect(Collectors.toList());

        return new PagedResponse<>(content,
                storyPage.getNumber(),
                storyPage.getSize(),
                storyPage.getTotalElements(),
                storyPage.getTotalPages(),
                storyPage.isLast());
    }

    public StoryResponse createStory(StoryRequest request) {
        User currentUser = userService.getAuthenticatedUser();
        Story story = StoryMapper.toStoryEntity(request);
        story.setAuthor(currentUser);
        Story savedStory = storyRepository.save(story);
        return StoryMapper.toStoryResponse(savedStory);
    }

    public StoryResponse updateStory(Long id, StoryRequest request) {
        User currentUser = userService.getAuthenticatedUser();
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id " + id));

        if (!isAuthorOrAdmin(story, currentUser)) {
            throw new ForbiddenException("You do not have permission to modify this story");
        }

        story.setTitle(request.getTitle());
        story.setCaption(request.getCaption());
        story.setContent(request.getContent());
        story.setDepartment(request.getDepartment());
        story.setStatus(request.getStatus());
        story.setImageUrl(request.getImageUrl());
        story.setCategory(request.getCategory());

        Story updatedStory = storyRepository.save(story);
        return StoryMapper.toStoryResponse(updatedStory);
    }

    public void deleteStory(Long id) {
        User currentUser = userService.getAuthenticatedUser();
        Story story = storyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id " + id));

        if (!isAuthorOrAdmin(story, currentUser)) {
            throw new ForbiddenException("You do not have permission to delete this story");
        }

        storyRepository.delete(story);
    }

    private boolean isAuthorOrAdmin(Story story, User currentUser) {
        return story.getAuthor().getId().equals(currentUser.getId())
                || currentUser.getRoles().contains(RoleName.ADMIN);
    }
}
