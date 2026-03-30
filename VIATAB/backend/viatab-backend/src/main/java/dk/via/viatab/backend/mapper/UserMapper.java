package dk.via.viatab.backend.mapper;

import dk.via.viatab.backend.dto.UserProfileResponse;
import dk.via.viatab.backend.entity.User;
import java.util.stream.Collectors;

public class UserMapper {

    public static UserProfileResponse toUserProfileResponse(User user) {
        return new UserProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRoles().stream().map(Enum::name).collect(Collectors.toList()),
                user.getCreatedAt()
        );
    }
}
