package com.mini_project_6_sem.MiniProject.dto;


import com.mini_project_6_sem.MiniProject.models.Address;
import lombok.Data;

@Data
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


}
