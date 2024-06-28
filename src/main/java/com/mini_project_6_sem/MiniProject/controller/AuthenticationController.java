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
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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



//    VERIFICATION
    @PostMapping("/verify")
    public ResponseEntity<?> verification(@RequestBody VerificationDTO  body){
        try{
            authenticationService.verify(body.getEmail(), body.getOtp());
            return new ResponseEntity<>("Verification Email Sent", HttpStatus.OK);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
//        try{
//            authenticationService.verify(email, otp);
//            return new ResponseEntity<>("User Verified Successfully", HttpStatus.OK);
//        }catch (RuntimeException e){
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

}