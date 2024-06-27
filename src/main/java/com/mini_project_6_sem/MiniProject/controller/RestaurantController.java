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
    public ResponseEntity<Restaurant>addRestaurant(@RequestBody Restaurant restaurant){
        Restaurant createRestaurant=restaurantServices.createRestaurant(restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(createRestaurant);
    }

    @PreAuthorize("hasRole('USER', 'ADMIN')")
    @GetMapping("/getRestaurant")
    public  ResponseEntity<List<Restaurant>>findAllRestaurant(@RequestBody Restaurant restaurant){
        return ResponseEntity.ok(restaurantServices.findAll());
    }

    @PreAuthorize("hasRole('USER', 'ADMIN')")
    @GetMapping("/getRestaurant/{id}")
    public ResponseEntity<Optional<Restaurant>> findById(@PathVariable Long id){
        return ResponseEntity.ok(restaurantServices.findById(id));
    }
   //Need Update Restaurant

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
}
