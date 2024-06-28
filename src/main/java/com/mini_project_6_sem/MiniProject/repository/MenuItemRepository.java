package com.mini_project_6_sem.MiniProject.repository;

import com.mini_project_6_sem.MiniProject.models.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantID(Long restaurantID);
}
