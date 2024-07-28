package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.exception.RestaurantException;
import com.mini_project_6_sem.MiniProject.models.MenuItem;
import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.repository.RestaurantRepository;
import com.mini_project_6_sem.MiniProject.utils.FoodType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RestaurantServices {

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
        if (!restaurantRepository.existsById(restaurantId)) {
            throw new RestaurantException.RestaurantNotFoundException("Restaurant with id " + restaurantId + " not found");
        }
        restaurantRepository.deleteById(restaurantId);
    }

    @Transactional(readOnly = true)
    public Optional<Restaurant> findById(Long restaurantId) {
        return restaurantRepository.findById(restaurantId);
    }

    @Transactional
    public List<Restaurant> createRestaurant(List<Restaurant> restaurants) {
        // Optionally, validate each restaurant in the list
        restaurants.forEach(this::validateRestaurant);

        return restaurants.stream()
                .map(restaurantRepository::save)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Restaurant> searchGlobal(String searchTerm) {
        return restaurantRepository.findByRestaurantNameContainingIgnoreCase(searchTerm);
    }

    public List<Restaurant> getNearbyRestaurants(double latitude, double longitude, double radius) {
        return restaurantRepository.findNearbyRestaurants(latitude, longitude, radius);
    }

    @Transactional
    public Restaurant updateRestaurant(Long restaurantId, Restaurant restaurantDetails) {
        validateRestaurant(restaurantDetails);

        Restaurant existingRestaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RestaurantException.RestaurantNotFoundException("Restaurant not found"));

        existingRestaurant.setRestaurantName(restaurantDetails.getRestaurantName());
        existingRestaurant.setRestaurantAddress(restaurantDetails.getRestaurantAddress());
        existingRestaurant.setFoodType(restaurantDetails.getFoodType());
        existingRestaurant.setMaxTable(restaurantDetails.getMaxTable());
        existingRestaurant.setLatitude(restaurantDetails.getLatitude());
        existingRestaurant.setLongitude(restaurantDetails.getLongitude());

        return restaurantRepository.save(existingRestaurant);
    }

    private void validateRestaurant(Restaurant restaurant) {
        if (restaurant.getRestaurantName() == null || restaurant.getRestaurantName().isEmpty()) {
            throw new RestaurantException.RestaurantValidationException("Restaurant Name is required");
        }

        if (restaurant.getRestaurantAddress() == null) {
            throw new RestaurantException.RestaurantValidationException("Restaurant Address is required");
        }

        if (restaurant.getFoodType() == null) {
            throw new RestaurantException.RestaurantValidationException("Restaurant Food Type is required");
        }

        if (restaurant.getMaxTable() <= 0) {
            throw new RestaurantException.RestaurantValidationException("Maximum Number of Tables must be greater than zero");
        }

        if (restaurant.getLatitude() == 0) {
            throw new RestaurantException.RestaurantValidationException("Latitude cannot be zero");
        }

        if (restaurant.getLongitude() == 0) {
            throw new RestaurantException.RestaurantValidationException("Longitude cannot be zero");
        }
    }

    public List<MenuItem> getMenuItemsByFoodType(FoodType foodType) {
        return restaurantRepository.findByFoodType(foodType);
    }
}
