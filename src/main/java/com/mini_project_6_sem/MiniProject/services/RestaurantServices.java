package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServices {

    @Autowired
    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantServices(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Transactional(readOnly = true)
    public List<Restaurant> findAll() {
        return restaurantRepository.findAll();
    }

    @Transactional
    public Restaurant saveRestaurant(Restaurant restaurant) {
        validateRestaurant(restaurant);
        return restaurantRepository.save(restaurant);
    }

    @Transactional
    public void deleteRestaurant(Long restaurantId) {
        restaurantRepository.deleteById(restaurantId);
    }

    @Transactional(readOnly = true)
    public Optional<Restaurant> findById(Long restaurantId) {
        return restaurantRepository.findById(restaurantId);
    }


    @Transactional
    public Restaurant createRestaurant(Restaurant restaurant) {
        validateRestaurant(restaurant);
        return restaurantRepository.save(restaurant);
    }

    @Transactional(readOnly = true)
    public List<Restaurant> searchGlobal(String searchTerm) {
        return restaurantRepository.findByRestaurantNameContainingIgnoreCase(searchTerm);
    }

    public List<Restaurant> getNearbyRestaurants(double latitude, double longitude, double radius) {
        return restaurantRepository.findNearbyRestaurants(latitude, longitude, radius);
    }

    private void validateRestaurant(Restaurant restaurant) {
        if (restaurant.getRestaurantName() == null || restaurant.getRestaurantName().isEmpty()) {
            throw new IllegalArgumentException("Restaurant Name is required");
        }

        if (restaurant.getRestaurantAddress() == null) {
            throw new IllegalArgumentException("Restaurant Address is required");
        }

        if (restaurant.getFoodType() == null) {
            throw new IllegalArgumentException("Restaurant Food Type is required");
        }

        if (restaurant.getMaxTable() <= 0) {
            throw new IllegalArgumentException("Maximum Number of Tables must be greater than zero");
        }
        if(restaurant.getLatitude() == 0){
            throw new IllegalArgumentException("Latitude cannot be zero");
        }
            if( restaurant.getLongitude() == 0){
            throw new IllegalArgumentException("Longitude cannot be zero");
        }
    }
}
