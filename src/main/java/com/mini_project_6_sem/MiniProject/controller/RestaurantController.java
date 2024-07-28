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
@RequestMapping("/restaurants")
@CrossOrigin("*")
public class RestaurantController {  //All Services Works Properly and Tested

    @Autowired
    private RestaurantServices restaurantServices;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addRestaurants")
    public ResponseEntity<List<Restaurant>> addRestaurants(@RequestBody List<Restaurant> restaurants) {
        List<Restaurant> createdRestaurants = restaurantServices.createRestaurant(restaurants);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRestaurants);
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

    @PreAuthorize("hasRole('USER', 'ADMIN')")
    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestParam("searchTerm") String searchTerm) {
        List<Restaurant> restaurants = restaurantServices.searchGlobal(searchTerm);
        return ResponseEntity.ok(restaurants);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteRestaurant/{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable Long id) {
        try {
            restaurantServices.deleteRestaurant(id);
            return ResponseEntity.ok("Restaurant with ID " + id + " has been deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Restaurant with ID " + id + " not found.");
        }
    }
    @PreAuthorize("hasRole('USER', 'ADMIN')")
    @GetMapping("/nearby")
    public ResponseEntity<List<Restaurant>> getNearbyRestaurants(@RequestParam double latitude, @RequestParam double longitude, @RequestParam double radius) {
        List<Restaurant> restaurants = restaurantServices.getNearbyRestaurants(latitude, longitude, radius);
        return ResponseEntity.ok(restaurants);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{restaurantId}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @PathVariable Long restaurantId,
            @RequestBody Restaurant restaurantDetails) {
        Restaurant updatedRestaurant = restaurantServices.updateRestaurant(restaurantId, restaurantDetails);
        return ResponseEntity.ok(updatedRestaurant);
    }
}