package dk.via.viatab.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class UserProfileResponse {

    private Long id;
    private String fullName;
    private String email;
    private List<String> roles;
    private LocalDateTime joinedAt;

    public UserProfileResponse() {
    }

    public UserProfileResponse(Long id, String fullName, String email, List<String> roles, LocalDateTime joinedAt) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.roles = roles;
        this.joinedAt = joinedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }
}
