package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.dto.VerificationDTO;
import com.mini_project_6_sem.MiniProject.models.ApplicationAdmin;
import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import com.mini_project_6_sem.MiniProject.dto.LoginResponseDTO;
import com.mini_project_6_sem.MiniProject.dto.RegistrationDTO;
import com.mini_project_6_sem.MiniProject.repository.UserRepository;
import com.mini_project_6_sem.MiniProject.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserRepository userRepository;

    // USER
    @PostMapping("/register/user")
    public ResponseEntity<ApplicationUser> registerUser(@RequestBody RegistrationDTO body) {
        ApplicationUser user = authenticationService.registerUser(
                body.getUsername(),
                body.getPassword(),
                body.getAge(),
                body.getEmail(),
                body.getPreferredCuisine().toString());

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login/user")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody RegistrationDTO body) {
        LoginResponseDTO response = authenticationService.loginUser(body.getUsername(), body.getPassword());
        if(response.getUser()==null){
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user/getInfo")
    public ResponseEntity<Map<String, Object>> getUserInfo(@AuthenticationPrincipal Jwt jwt){
        Map<String,Object> userInfo = new HashMap<>();
        userInfo.put("username",jwt.getSubject());
        userInfo.put("authorities", jwt.getClaims().get("roles"));

        return ResponseEntity.ok(userInfo);
    }

    @DeleteMapping("/delete/user/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        authenticationService.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // ADMIN
    @PostMapping("/register/admin")
    public ResponseEntity<ApplicationAdmin> registerAdmin(@RequestBody RegistrationDTO body) {
        ApplicationAdmin admin = authenticationService.registerAdmin(
                body.getUsername(),
                body.getPassword(),
                body.getAge(),
                body.getEmail());

        return new ResponseEntity<>(admin, HttpStatus.CREATED);
    }

    @PostMapping("/login/admin")
    public ResponseEntity<LoginResponseDTO> loginAdmin(@RequestBody RegistrationDTO body) {
        LoginResponseDTO response = authenticationService.loginAdmin(body.getUsername(), body.getPassword());
        if(response.getAdmin()==null){
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/admin/{username}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable String username) {
        authenticationService.deleteAdmin(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // VERIFICATION
    @PostMapping("/verify")
    public ResponseEntity<String> verification(@RequestBody VerificationDTO body) {
        try {
            authenticationService.verify(body.getEmail(), body.getOtp());
            return new ResponseEntity<>("Verification Email Sent", HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
