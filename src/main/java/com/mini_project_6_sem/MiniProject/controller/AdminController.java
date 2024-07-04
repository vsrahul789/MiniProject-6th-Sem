package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.services.RestaurantServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/restaurants")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private RestaurantServices restaurantService;

    // Admin can create a new restaurant
    @PostMapping("/add")
    public Restaurant createRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantService.saveRestaurant(restaurant);
    }

    // Admin can update an existing restaurant
    @PutMapping("/{restaurantId}")
    public Restaurant updateRestaurant(@PathVariable Long restaurantId, @RequestBody Restaurant restaurantDetails) {
        Optional<Restaurant> optionalRestaurant = restaurantService.findById(restaurantId);
        if (optionalRestaurant.isPresent()) {
            Restaurant restaurant = optionalRestaurant.get();
            restaurant.setRestaurantName(restaurantDetails.getRestaurantName());
            restaurant.setRestaurantAddress(restaurantDetails.getRestaurantAddress());
            restaurant.setFoodType(restaurantDetails.getFoodType());
            return restaurantService.saveRestaurant(restaurant);
        } else {
            // Handle restaurant not found
            throw new RuntimeException("Restaurant not found with id " + restaurantId);
        }
    }

    // Admin can delete a restaurant
    @DeleteMapping("/{restaurantId}")
    public void deleteRestaurant(@PathVariable Long restaurantId) {
        restaurantService.deleteRestaurant(restaurantId);
    }

    // Admin can get a restaurant by ID
    @GetMapping("/{restaurantId}")
    public Optional<Restaurant> getRestaurantById(@PathVariable Long restaurantId) {
        return restaurantService.findById(restaurantId);
    }

    // Admin can get all restaurants
    @GetMapping("/all")
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.findAll();
    }
}
