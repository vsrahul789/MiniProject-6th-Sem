package com.mini_project_6_sem.MiniProject.services;


import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServices {

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantServices(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> findAll() {
        return restaurantRepository.findAll();
    }

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public void deleteRestaurant(Long restaurantId) {
        restaurantRepository.deleteById(restaurantId);
    }

    public Optional<Restaurant> findById(Long restaurantId){
        return restaurantRepository.findById(restaurantId);
    }
    public Restaurant createRestaurant(Restaurant restaurant){
        validateRestaurant(restaurant);

        return restaurantRepository.save(restaurant);
    }

    private void validateRestaurant(Restaurant restaurant){
        if(restaurant.getRestaurantName()==null){
            throw new IllegalArgumentException("Restaurant Name is required");
        }

        if(restaurant.getRestaurantAddress()==null){
            throw new IllegalArgumentException("Require restaurant Address");
        }

        if(restaurant.getFoodType()==null){
            throw new IllegalArgumentException("Require restaurant food type");
        }
    }

}
