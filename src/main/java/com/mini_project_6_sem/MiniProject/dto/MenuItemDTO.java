package com.mini_project_6_sem.MiniProject.dto;

import com.mini_project_6_sem.MiniProject.utils.Category;
import lombok.Data;

@Data
public class MenuItemDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private boolean vegetarian;
    private Category category;
    private Long restaurantId;
    private String restaurantName;
    private String imageUrl;

    public MenuItemDTO(Long id, String name, String description, double price, boolean vegetarian, Category category, Long restaurantId, String restaurantName,String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.vegetarian = vegetarian;
        this.category = category;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.imageUrl = imageUrl;
    }

    public MenuItemDTO() {
    }

    // Getters and Setters
}
