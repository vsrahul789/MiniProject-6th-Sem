package com.mini_project_6_sem.MiniProject.dto;

import com.mini_project_6_sem.MiniProject.models.Restaurant;

public class MenuItemDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private boolean vegetarian;
    private Long restaurantID;

    public MenuItemDTO(Long id, String name, String description, double price, boolean vegetarian,Long restaurantID) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.vegetarian = vegetarian;
        this.restaurantID=restaurantID;
    }

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

    public Long getRestaurant() {
        return restaurantID;
    }

    public void setRestaurant(Long restaurantID) {
        this.restaurantID = restaurantID;
    }
}
