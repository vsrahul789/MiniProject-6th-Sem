package com.mini_project_6_sem.MiniProject.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mini_project_6_sem.MiniProject.models.Address;
import com.mini_project_6_sem.MiniProject.utils.FoodType;

public class RestaurantDTO {
    private Long id;
    private String restaurantName;
    private Address restaurantAddress;

    public RestaurantDTO(Long id, String restaurantName, Address restaurantAddress) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
    }

    public RestaurantDTO() {
    }

    public RestaurantDTO(Long id, String restaurantName) {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public Address getRestaurantAddress() {
        return restaurantAddress;
    }

    public void setRestaurantAddress(Address restaurantAddress) {
        this.restaurantAddress = restaurantAddress;
    }

}
