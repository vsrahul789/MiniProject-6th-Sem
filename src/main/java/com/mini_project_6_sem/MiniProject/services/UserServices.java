package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.repository.AdminRepository;
import com.mini_project_6_sem.MiniProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServices implements UserDetailsService {

    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("In the user detail service");

        if(userRepository.existsByUsername(username)){
            System.out.println("user is valid");
            return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
        }else{
            System.out.println("Admin is valid");
            return adminRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
        }


//        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
    }
}
