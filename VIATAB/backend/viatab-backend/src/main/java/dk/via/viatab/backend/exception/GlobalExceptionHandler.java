package dk.via.viatab.backend.exception;

import dk.via.viatab.backend.dto.ApiErrorResponse;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex,
            HttpServletRequest request) {
        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }
        ApiErrorResponse response = new ApiErrorResponse(Instant.now(), HttpStatus.BAD_REQUEST.value(),
                "Validation failed", "One or more fields are invalid", request.getRequestURI(), fieldErrors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiErrorResponse> handleConstraintViolation(ConstraintViolationException ex,
            HttpServletRequest request) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getConstraintViolations().forEach(violation -> fieldErrors.put(
                violation.getPropertyPath().toString(), violation.getMessage()));
        ApiErrorResponse response = new ApiErrorResponse(Instant.now(), HttpStatus.BAD_REQUEST.value(),
                "Validation failed", "Request constraint violated", request.getRequestURI(), fieldErrors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceNotFound(ResourceNotFoundException ex,
            HttpServletRequest request) {
        ApiErrorResponse response = new ApiErrorResponse(Instant.now(), HttpStatus.NOT_FOUND.value(),
                "Not Found", ex.getMessage(), request.getRequestURI(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiErrorResponse> handleBadRequest(BadRequestException ex,
            HttpServletRequest request) {
        ApiErrorResponse response = new ApiErrorResponse(Instant.now(), HttpStatus.BAD_REQUEST.value(),
                "Bad Request", ex.getMessage(), request.getRequestURI(), null);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ApiErrorResponse> handleForbidden(ForbiddenException ex,
            HttpServletRequest request) {
        ApiErrorResponse response = new ApiErrorResponse(Instant.now(), HttpStatus.FORBIDDEN.value(),
                "Forbidden", ex.getMessage(), request.getRequestURI(), null);
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({ AuthenticationException.class, BadCredentialsException.class, JwtException.class,
            UnauthorizedException.class })
    public ResponseEntity<ApiErrorResponse> handleAuthenticationExceptions(Exception ex,
            HttpServletRequest request) {
        ApiErrorResponse response = new ApiErrorResponse(Instant.now(), HttpStatus.UNAUTHORIZED.value(),
                "Unauthorized", ex.getMessage(), request.getRequestURI(), null);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiErrorResponse> handleAccessDenied(AccessDeniedException ex,
            HttpServletRequest request) {
        ApiErrorResponse response = new ApiErrorResponse(Instant.now(), HttpStatus.FORBIDDEN.value(),
                "Access Denied", ex.getMessage(), request.getRequestURI(), null);
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGenericException(Exception ex,
            HttpServletRequest request) {
        ApiErrorResponse response = new ApiErrorResponse(Instant.now(), HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error", ex.getMessage(), request.getRequestURI(), null);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
