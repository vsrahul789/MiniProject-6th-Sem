package com.mini_project_6_sem.MiniProject.repository;


import com.mini_project_6_sem.MiniProject.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
