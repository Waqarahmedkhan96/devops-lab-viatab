package dk.via.viatab.backend.mapper;

import dk.via.viatab.backend.dto.StoryRequest;
import dk.via.viatab.backend.dto.StoryResponse;
import dk.via.viatab.backend.entity.Story;

public class StoryMapper {

    public static StoryResponse toStoryResponse(Story story) {
        return new StoryResponse(
                story.getId(),
                story.getTitle(),
                story.getCaption(),
                story.getContent(),
                story.getDepartment(),
                story.getStatus(),
                story.getImageUrl(),
                story.getCategory(),
                story.getAuthor().getId(),
                story.getAuthor().getFullName(),
                story.getCreatedAt(),
                story.getUpdatedAt()
        );
    }

    public static Story toStoryEntity(StoryRequest request) {
        Story story = new Story();
        story.setTitle(request.getTitle());
        story.setCaption(request.getCaption());
        story.setContent(request.getContent());
        story.setDepartment(request.getDepartment());
        story.setStatus(request.getStatus());
        story.setImageUrl(request.getImageUrl());
        story.setCategory(request.getCategory());
        return story;
    }
}
