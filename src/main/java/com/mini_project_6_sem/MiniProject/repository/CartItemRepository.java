package com.mini_project_6_sem.MiniProject.repository;

import com.mini_project_6_sem.MiniProject.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long> {
}
