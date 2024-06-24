package com.mini_project_6_sem.MiniProject.repository;

import com.mini_project_6_sem.MiniProject.models.ApplicationAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AdminRepository extends JpaRepository<ApplicationAdmin, Integer> {
    Optional<ApplicationAdmin> findByUsername(String username);
    void deleteByUsername(String username);
    boolean existsByUsername(String username);
}
