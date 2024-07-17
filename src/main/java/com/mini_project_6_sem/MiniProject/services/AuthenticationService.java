package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.models.ApplicationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import com.mini_project_6_sem.MiniProject.dto.LoginResponseDTO;
import com.mini_project_6_sem.MiniProject.models.Role;
import com.mini_project_6_sem.MiniProject.repository.RoleRepository;
import com.mini_project_6_sem.MiniProject.repository.UserRepository;
import com.mini_project_6_sem.MiniProject.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenServices tokenServices;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private JwtDecoder jwtDecoder;
    @Autowired
    private EmailService emailService;



    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    public ApplicationUser registerUser(String username,
                                        String password,
                                        Integer age,
                                        String email,
                                        String preferredCuisine) {
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);
        ApplicationUser user = new ApplicationUser(0, username, encodedPassword, authorities, age, email, preferredCuisine);

        String otp = generateOtp();
        user.setOtp(otp);
        ApplicationUser savedUser = userRepository.save(user);
        savedUser.setVerified(false);
        sendVerificationEmail(savedUser.getEmail(), otp);
        return savedUser;
    }

    public ApplicationAdmin registerAdmin(String username,
                                          String password,
                                          Integer age,
                                          String email) {
        String encodedPassword = passwordEncoder.encode(password);
        Role adminRole = roleRepository.findByAuthority("ADMIN").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(adminRole);

        return adminRepository.save(new ApplicationAdmin(0, username, encodedPassword, authorities, age, email));
    }

    public LoginResponseDTO loginUser(String username, String password) {

        try {
            logger.info("Attempting to authenticate user: {}", username);
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            logger.info("Authentication successful for user: {}", username);

            String token = tokenServices.generateJwt(auth);
            ApplicationUser user = userRepository.findByUsername(username).orElse(null);
//            if (user == null) {
//                throw new AuthenticationException("Invalid username or password"); // Generic error message
//            }
            return new LoginResponseDTO(user, token);
        } catch (AuthenticationException e) {
            logger.error("Authentication failed for user: {}", username, e);
            return new LoginResponseDTO((ApplicationUser) null, "");
        }
    }

    public LoginResponseDTO loginAdmin(String username, String password) {
        try {
            logger.info("Attempting to authenticate admin: {}", username);
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            logger.info("Authentication successful for admin: {}", username);

            String token = tokenServices.generateJwt(auth);
            ApplicationAdmin admin = adminRepository.findByUsername(username).orElse(null);
            return new LoginResponseDTO(admin, token);
        } catch (AuthenticationException e) {
            logger.error("Authentication failed for user: {}", username, e);
            return new LoginResponseDTO((ApplicationAdmin) null, "");
        }
    }

    public void deleteUser(String username) {
        if (userRepository.existsByUsername(username)) {
            userRepository.deleteByUsername(username);
        } else {
            logger.error("User not found with username: {}", username);
        }
    }

    public void deleteAdmin(String username) {
        if (adminRepository.existsByUsername(username)) {
            adminRepository.deleteByUsername(username);
        } else {
            logger.error("Admin not found with username: {}", username);
        }
    }

//    To check weather the user has the token or not based on this the user is deemed authorized
    public Boolean isTokenValid(String token){
        try{
            Jwt decodedJwt = jwtDecoder.decode(token);
            Instant expiration = decodedJwt.getExpiresAt();
            assert expiration != null;
            return expiration.isAfter(Instant.now());
        }catch (Exception e){
            logger.error("Invalid token: {}", token, e);
            return false;
        }
    }

    public String generateOtp(){
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public void sendVerificationEmail(String email, String otp) {
        // Implementation for sending verification email
        String subject = "Verification Email";
        String body = "Your OTP is: " + otp;
        emailService.sendEmail(email, subject, body);
    }

    public void verify(String email, String otp){
        ApplicationUser user = userRepository.findByEmail(email).orElse(null);
        if (user == null){
            throw new RuntimeException("User not found");
        } else if (user.getVerified()) {
            throw new RuntimeException("User is already verified");
        } else if (otp.equals(user.getOtp())) {
            user.setVerified(true);
            userRepository.save(user);
        }else {
            throw new RuntimeException("Internal Server error");
        }
    }

}

