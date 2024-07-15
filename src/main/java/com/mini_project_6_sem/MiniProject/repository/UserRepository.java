package com.mini_project_6_sem.MiniProject.repository;


import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;

@Repository
// the repository should be interface and not class because we need to implement these methods in other classes
public interface UserRepository extends JpaRepository<ApplicationUser, Integer> {
    Optional<ApplicationUser> findByUsername(String username);
    void deleteByUsername(String username);

    boolean existsByUsername(String username);

    Optional<ApplicationUser> findByEmail(String email);
//    Optional<ApplicationUser>findById(Integer id);
}
