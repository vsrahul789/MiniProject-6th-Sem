package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.models.ApplicationAdmin;
import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import com.mini_project_6_sem.MiniProject.dto.LoginResponseDTO;
import com.mini_project_6_sem.MiniProject.dto.RegistrationDTO;
import com.mini_project_6_sem.MiniProject.repository.UserRepository;
import com.mini_project_6_sem.MiniProject.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserRepository userRepository;

//    USER
    @PostMapping("/register/user")
    public ApplicationUser registerUser(@RequestBody RegistrationDTO body) {
        return authenticationService.registerUser(body.getUsername(),
                body.getPassword(),
                body.getAge(),
                body.getEmail(),
                body.getPreferredCuisine().toString());
    }

    @PostMapping("/login/user")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body) {
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }

    @DeleteMapping("/delete/user/{username}")
    public void deleteUser(@PathVariable String username){
        authenticationService.deleteUser(username);
    }

//    ADMIN
    @PostMapping("/register/admin")
    public ApplicationAdmin registerAdmin(@RequestBody RegistrationDTO body) {
        return authenticationService.registerAdmin(
                body.getUsername(),
                body.getPassword(),
                body.getAge(),
                body.getEmail());
    }

    @PostMapping("/login/admin")
    public LoginResponseDTO loginAdmin(@RequestBody RegistrationDTO body) {
        return authenticationService.loginAdmin(body.getUsername(), body.getPassword());
    }

    @DeleteMapping("/delete/admin/{username}")
    public void deleteAdmin(@PathVariable String username){
        authenticationService.deleteAdmin(username);
    }

}