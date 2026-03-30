package dk.via.viatab.backend.service;

import dk.via.viatab.backend.dto.UserProfileResponse;
import dk.via.viatab.backend.entity.User;
import dk.via.viatab.backend.exception.ResourceNotFoundException;
import dk.via.viatab.backend.mapper.UserMapper;
import dk.via.viatab.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new dk.via.viatab.backend.exception.UnauthorizedException("User is not authenticated");
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }

    public UserProfileResponse getCurrentUserProfile() {
        return UserMapper.toUserProfileResponse(getAuthenticatedUser());
    }

    public List<UserProfileResponse> getAllUserProfiles() {
        return userRepository.findAll().stream()
                .map(UserMapper::toUserProfileResponse)
                .collect(Collectors.toList());
    }
}
