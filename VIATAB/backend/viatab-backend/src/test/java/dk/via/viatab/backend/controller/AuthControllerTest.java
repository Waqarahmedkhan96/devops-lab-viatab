package dk.via.viatab.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dk.via.viatab.backend.dto.AuthResponse;
import dk.via.viatab.backend.dto.LoginRequest;
import dk.via.viatab.backend.dto.RegisterRequest;
import dk.via.viatab.backend.security.JwtAuthenticationEntryPoint;
import dk.via.viatab.backend.security.JwtAuthenticationFilter;
import dk.via.viatab.backend.service.AuthService;
import dk.via.viatab.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockitoBean
    private AuthService authService;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockitoBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Test
    void register_returnsAuthResponse() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setFullName("VIATAB User");
        request.setEmail("user@viatab.dk");
        request.setPassword("Password123");

        AuthResponse response = new AuthResponse(
                "token123",
                "Bearer",
                1L,
                "user@viatab.dk",
                List.of("USER")
        );

        when(authService.register(any(RegisterRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("token123"))
                .andExpect(jsonPath("$.email").value("user@viatab.dk"));
    }

    @Test
    void login_returnsAuthResponse() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@viatab.dk");
        request.setPassword("Password123");

        AuthResponse response = new AuthResponse(
                "token123",
                "Bearer",
                1L,
                "user@viatab.dk",
                List.of("USER")
        );

        when(authService.login(any(LoginRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("token123"))
                .andExpect(jsonPath("$.roles[0]").value("USER"));
    }
}