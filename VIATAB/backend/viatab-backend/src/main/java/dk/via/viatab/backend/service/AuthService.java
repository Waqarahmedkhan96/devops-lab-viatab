package dk.via.viatab.backend.service;

import dk.via.viatab.backend.dto.AuthResponse;
import dk.via.viatab.backend.dto.LoginRequest;
import dk.via.viatab.backend.dto.RegisterRequest;
import dk.via.viatab.backend.entity.RoleName;
import dk.via.viatab.backend.entity.User;
import dk.via.viatab.backend.mapper.AuthMapper;
import dk.via.viatab.backend.repository.UserRepository;
import dk.via.viatab.backend.security.JwtService;
import dk.via.viatab.backend.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new dk.via.viatab.backend.exception.BadRequestException("Email already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(Collections.singleton(RoleName.USER));

        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser.getEmail());
        return AuthMapper.toAuthResponse(UserPrincipal.create(savedUser), token);
    }

    public AuthResponse login(LoginRequest request) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        String token = jwtService.generateToken(principal.getUsername());
        return AuthMapper.toAuthResponse(principal, token);
    }
}
