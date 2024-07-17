package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.dto.UserUpdateDTO;
import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import com.mini_project_6_sem.MiniProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
//    @Autowired
    private ApplicationUser applicationUser;

    @GetMapping("/profile")
    public ResponseEntity<ApplicationUser> getUserProfile(@AuthenticationPrincipal Jwt jwt) {
        String username = jwt.getClaimAsString("sub");
        ApplicationUser user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/profile")
    public ResponseEntity<ApplicationUser> updateUserProfile(@AuthenticationPrincipal Jwt jwt, @RequestBody UserUpdateDTO updateDTO) {
        String username = jwt.getClaimAsString("sub");
        ApplicationUser user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        if (updateDTO.getUsername() != null) {
            user.setUsername(updateDTO.getUsername());
        }
        if (updateDTO.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
        }

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

}


