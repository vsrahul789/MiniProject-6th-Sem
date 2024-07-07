package com.mini_project_6_sem.MiniProject.repository;

import com.mini_project_6_sem.MiniProject.models.MenuItem;
import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.utils.FoodType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("SELECT r FROM Restaurant r WHERE LOWER(r.restaurantName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Restaurant> findByRestaurantNameContainingIgnoreCase(@Param("searchTerm") String searchTerm);

    @Query("SELECT r FROM Restaurant r WHERE (6371 * acos(cos(radians(:lat)) * cos(radians(r.latitude)) * cos(radians(r.longitude) - radians(:lon)) + sin(radians(:lat)) * sin(radians(r.latitude)))) < :radius")
    List<Restaurant> findNearbyRestaurants(@Param("lat") double latitude, @Param("lon") double longitude, @Param("radius") double radius);

    List<MenuItem> findByFoodType(FoodType foodType);
}
