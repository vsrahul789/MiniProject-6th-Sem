package com.mini_project_6_sem.MiniProject;

import com.mini_project_6_sem.MiniProject.models.ApplicationAdmin;
import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import com.mini_project_6_sem.MiniProject.utils.FoodType;
import com.mini_project_6_sem.MiniProject.models.Role;
import com.mini_project_6_sem.MiniProject.repository.RoleRepository;
import com.mini_project_6_sem.MiniProject.repository.UserRepository;
import com.mini_project_6_sem.MiniProject.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class MiniProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiniProjectApplication.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository, AdminRepository adminRepository, PasswordEncoder passwordEncoder){

		return args -> {
//		if "update" is used then
			if(roleRepository.findByAuthority("ADMIN").isPresent()){
				return;
			}
			Role adminRole = roleRepository.save(new Role("ADMIN"));
			roleRepository.save(new Role("USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);

			ApplicationAdmin admin1 = new ApplicationAdmin(1,
					"admin1",
					passwordEncoder.encode("admin"),
					roles,
					26,
					"email@email.com");

			adminRepository.save(admin1);
		};
	}

}
