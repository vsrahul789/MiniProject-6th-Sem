package com.mini_project_6_sem.MiniProject.controller;


import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.services.RestaurantServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantServices restaurantServices;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addRestaurants")
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant) {
        Restaurant createdRestaurant = restaurantServices.createRestaurant(restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRestaurant);
    }

    @PreAuthorize("hasRole('USER', 'ADMIN')")
    @GetMapping("/getRestaurant")
    public ResponseEntity<List<Restaurant>> findAllRestaurant() {
        return ResponseEntity.ok(restaurantServices.findAll());
    }

    @PreAuthorize("hasRole('USER', 'ADMIN')")
    @GetMapping("/getRestaurant/{id}")
    public ResponseEntity<Restaurant> findById(@PathVariable Long id) {
        Optional<Restaurant> restaurant = restaurantServices.findById(id);
        return restaurant.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestParam("searchTerm") String searchTerm) {
        List<Restaurant> restaurants = restaurantServices.searchGlobal(searchTerm);
        return ResponseEntity.ok(restaurants);
    }

        @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteRestaurant/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        try {
            restaurantServices.deleteRestaurant(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<Restaurant>> getNearbyRestaurants(@RequestParam double latitude, @RequestParam double longitude, @RequestParam double radius) {
        List<Restaurant> restaurants = restaurantServices.getNearbyRestaurants(latitude, longitude, radius);
        return ResponseEntity.ok(restaurants);
    }

}


