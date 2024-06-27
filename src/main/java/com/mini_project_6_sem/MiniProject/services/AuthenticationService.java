package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.models.ApplicationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import com.mini_project_6_sem.MiniProject.models.LoginResponseDTO;
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


        return userRepository.save(new ApplicationUser(0,
                username,
                encodedPassword,
                authorities,
                age,
                email,
                preferredCuisine));
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

    //        public LoginResponseDTO loginUser(String username, String password) {
////        String encodedPassword = passwordEncoder.encode(password);
//            try {
//                System.out.println("Before Auth");
//                Authentication auth = authenticationManager.authenticate(
//                        new UsernamePasswordAuthenticationToken(username, password)// generated token for the user
//                );
//                System.out.println(auth);
//
//                String token = tokenServices.generateJwt(auth);
//
//                return new LoginResponseDTO(userRepository.findByUsername(username).get(), token);
//
//            } catch (AuthenticationException e) {
//                return new LoginResponseDTO(null, "");
//            }
//        }
    public LoginResponseDTO loginUser(String username, String password) {

        try {
            logger.info("Attempting to authenticate user: {}", username);
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            logger.info("Authentication successful for user: {}", username);

            String token = tokenServices.generateJwt(auth);
            ApplicationUser user = userRepository.findByUsername(username).orElse(null);
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

}

