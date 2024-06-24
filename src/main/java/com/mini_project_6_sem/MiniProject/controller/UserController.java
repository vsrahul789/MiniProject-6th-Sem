package com.mini_project_6_sem.MiniProject.controller;


import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.services.RestaurantServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private RestaurantServices restaurantService;


    //Users can only get restaurants by name,id or location
    @GetMapping("/")
    public String user() {
        return "User Access Level";
    }

    @GetMapping("/restaurants/{restaurantId}")
    public Optional<Restaurant> findById(Long restaurantId) {
        return restaurantService.findById(restaurantId);
    }

    @GetMapping("/restaurants/all")
    public List<Restaurant> findAll() {
        return restaurantService.findAll();
    }
}


