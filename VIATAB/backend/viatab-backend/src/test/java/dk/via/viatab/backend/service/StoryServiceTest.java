package dk.via.viatab.backend.service;

import dk.via.viatab.backend.dto.PagedResponse;
import dk.via.viatab.backend.dto.StoryRequest;
import dk.via.viatab.backend.dto.StoryResponse;
import dk.via.viatab.backend.entity.Story;
import dk.via.viatab.backend.entity.User;
import dk.via.viatab.backend.exception.ForbiddenException;
import dk.via.viatab.backend.entity.Department;
import dk.via.viatab.backend.entity.RoleName;
import dk.via.viatab.backend.entity.StoryStatus;
import dk.via.viatab.backend.repository.StoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StoryServiceTest {

    @Mock
    private StoryRepository storyRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private StoryService storyService;

    private User author;

    @BeforeEach
    void setUp() {
        author = new User();
        author.setId(1L);
        author.setFullName("VIATAB Author");
        author.setEmail("author@viatab.dk");
        author.setRoles(Set.of(RoleName.USER));
    }

    @Test
    void getStories_returnsPagedResponse() {
        Story story = new Story();
        story.setId(1L);
        story.setTitle("Test Story");
        story.setCaption("Caption");
        story.setContent("Content");
        story.setDepartment(Department.SOFTWARE_ENGINEERING);
        story.setStatus(StoryStatus.PUBLISHED);
        story.setCategory("News");
        story.setImageUrl("https://example.com/image.png");
        story.setAuthor(author);

        PageRequest pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Story> page = new PageImpl<>(List.of(story), pageable, 1);

        when(storyRepository.searchStories(Department.SOFTWARE_ENGINEERING, null, null, pageable))
                .thenReturn(page);

        PagedResponse<StoryResponse> result =
                storyService.getStories(0, 10, "createdAt", "desc",
                        Department.SOFTWARE_ENGINEERING, null, null);

        assertEquals(1, result.getTotalElements());
        assertEquals("Test Story", result.getContent().get(0).getTitle());
    }

    @Test
    void updateStory_whenNotAuthorOrAdmin_throwsForbiddenException() {
        Story story = new Story();
        story.setId(1L);
        story.setAuthor(author);

        User otherUser = new User();
        otherUser.setId(2L);
        otherUser.setRoles(Set.of(RoleName.USER));

        when(storyRepository.findById(1L)).thenReturn(Optional.of(story));
        when(userService.getAuthenticatedUser()).thenReturn(otherUser);

        StoryRequest request = new StoryRequest();
        request.setTitle("Updated title");
        request.setCaption("Updated caption");
        request.setContent("Updated content");
        request.setDepartment(Department.BUSINESS);
        request.setStatus(StoryStatus.DRAFT);
        request.setImageUrl("https://example.com/updated.png");
        request.setCategory("Updated");

        assertThrows(ForbiddenException.class, () -> storyService.updateStory(1L, request));
    }

    @Test
    void createStory_setsAuthorAndReturnsStoryResponse() {
        when(userService.getAuthenticatedUser()).thenReturn(author);

        StoryRequest request = new StoryRequest();
        request.setTitle("New story");
        request.setCaption("Caption");
        request.setContent("Body");
        request.setDepartment(Department.CONSTRUCTION);
        request.setStatus(StoryStatus.DRAFT);
        request.setImageUrl("https://example.com/new.png");
        request.setCategory("Update");

        Story stored = new Story();
        stored.setId(2L);
        stored.setTitle(request.getTitle());
        stored.setCaption(request.getCaption());
        stored.setContent(request.getContent());
        stored.setDepartment(request.getDepartment());
        stored.setStatus(request.getStatus());
        stored.setImageUrl(request.getImageUrl());
        stored.setCategory(request.getCategory());
        stored.setAuthor(author);

        when(storyRepository.save(any(Story.class))).thenReturn(stored);

        StoryResponse response = storyService.createStory(request);

        assertEquals(2L, response.getId());
        assertEquals("New story", response.getTitle());
        assertEquals(author.getFullName(), response.getAuthorName());
    }
}