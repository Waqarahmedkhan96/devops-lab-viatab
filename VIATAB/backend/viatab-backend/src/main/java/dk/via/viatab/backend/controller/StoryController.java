package dk.via.viatab.backend.controller;

import dk.via.viatab.backend.dto.PagedResponse;
import dk.via.viatab.backend.dto.StoryRequest;
import dk.via.viatab.backend.dto.StoryResponse;
import dk.via.viatab.backend.entity.Department;
import dk.via.viatab.backend.entity.StoryStatus;
import dk.via.viatab.backend.service.StoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    private final StoryService storyService;

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @GetMapping
    public ResponseEntity<PagedResponse<StoryResponse>> getStories(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "createdAt") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam(value = "department", required = false) Department department,
            @RequestParam(value = "status", required = false) StoryStatus status,
            @RequestParam(value = "search", required = false) String search
    ) {
        return ResponseEntity.ok(storyService.getStories(page, size, sortBy, sortDir, department, status, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoryResponse> getStoryById(@PathVariable Long id) {
        return ResponseEntity.ok(storyService.getStoryById(id));
    }

    @PostMapping
    public ResponseEntity<StoryResponse> createStory(@Valid @RequestBody StoryRequest request) {
        return ResponseEntity.ok(storyService.createStory(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StoryResponse> updateStory(@PathVariable Long id, @Valid @RequestBody StoryRequest request) {
        return ResponseEntity.ok(storyService.updateStory(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        storyService.deleteStory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/mine")
    public ResponseEntity<PagedResponse<StoryResponse>> getMine(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "createdAt") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir
    ) {
        return ResponseEntity.ok(storyService.getMyStories(page, size, sortBy, sortDir));
    }
}
