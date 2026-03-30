package dk.via.viatab.backend.mapper;

import dk.via.viatab.backend.dto.AuthResponse;
import dk.via.viatab.backend.security.UserPrincipal;

import java.util.stream.Collectors;

public class AuthMapper {

    public static AuthResponse toAuthResponse(UserPrincipal principal, String token) {
        return new AuthResponse(
                token,
                "Bearer",
                principal.getId(),
                principal.getUsername(),
                principal.getRoles()
                        .stream()
                        .map(Enum::name)
                        .collect(Collectors.toList())
        );
    }
}