package com.mini_project_6_sem.MiniProject.dto;

import com.mini_project_6_sem.MiniProject.models.MenuItem;

public class MenuItemDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private boolean vegetarian;
    private Long restaurantId;

    public MenuItemDTO(Long id, String name, String description, double price, boolean vegetarian, Long restaurantId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.vegetarian = vegetarian;
        this.restaurantId = restaurantId;
    }

    public MenuItemDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        this.vegetarian = vegetarian;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public static MenuItemDTO mapFromEntity(MenuItem menuItem) {
        return new MenuItemDTO(
                menuItem.getId(),
                menuItem.getName(),
                menuItem.getDescription(),
                menuItem.getPrice(),
                menuItem.isVegetarian(),
                menuItem.getRestaurant().getID()
        );
    }
}
