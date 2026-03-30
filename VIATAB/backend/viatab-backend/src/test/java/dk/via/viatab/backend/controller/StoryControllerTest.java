package dk.via.viatab.backend.controller;

import dk.via.viatab.backend.dto.PagedResponse;
import dk.via.viatab.backend.dto.StoryResponse;
import dk.via.viatab.backend.security.JwtAuthenticationEntryPoint;
import dk.via.viatab.backend.security.JwtAuthenticationFilter;
import dk.via.viatab.backend.service.StoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(StoryController.class)
@AutoConfigureMockMvc(addFilters = false)
class StoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private StoryService storyService;

    @MockitoBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockitoBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Test
    void getStories_returnsPagedStories() throws Exception {
        StoryResponse story = new StoryResponse();
        story.setId(1L);
        story.setTitle("Sample Story");
        story.setCaption("My caption");
        story.setContent("My content");
        story.setImageUrl("https://example.com/story.png");
        story.setCategory("News");
        story.setAuthorId(1L);
        story.setAuthorName("VIATAB Admin");
        story.setCreatedAt(LocalDateTime.now());
        story.setUpdatedAt(LocalDateTime.now());

        PagedResponse<StoryResponse> page =
                new PagedResponse<>(List.of(story), 0, 10, 1, 1, true);

        when(storyService.getStories(0, 10, "createdAt", "desc", null, null, null))
                .thenReturn(page);

        mockMvc.perform(get("/api/stories")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "createdAt")
                        .param("sortDir", "desc")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].title").value("Sample Story"))
                .andExpect(jsonPath("$.totalElements").value(1));
    }
}