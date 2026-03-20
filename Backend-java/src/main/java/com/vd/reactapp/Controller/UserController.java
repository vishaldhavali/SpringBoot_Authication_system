package com.vd.reactapp.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vd.reactapp.Repositry.UserRepo;
import com.vd.reactapp.entities.User;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, allowCredentials = "true")
public class UserController {

    private final UserRepo userRepo;

    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> getUser() {
        try {
            // Get username from JWT token
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            User user = userRepo.findByUsername(username);

            if (user == null) {
                return ResponseEntity.status(401)
                        .body(Map.of("message", "User not found"));
            }

            return ResponseEntity.ok(Map.of(
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "verified", String.valueOf(user.isVerified())
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Unauthorized"));
        }
    }
}
