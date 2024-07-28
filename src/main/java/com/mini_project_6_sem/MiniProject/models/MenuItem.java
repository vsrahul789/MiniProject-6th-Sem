package com.mini_project_6_sem.MiniProject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini_project_6_sem.MiniProject.dto.ApplicationUserDTO;
import com.mini_project_6_sem.MiniProject.dto.RestaurantDTO;
import com.mini_project_6_sem.MiniProject.utils.Category;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "menu_item")
@Data
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_item_id")
    private Long id;

    private String name;
    private String description;
    private double price;
    private boolean vegetarian;
    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;
    private String imageUrl;


    @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH })
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    public MenuItem(Long id,
                    String name,
                    String description,
                    double price,
                    boolean vegetarian,
                    Category category,
                    Restaurant restaurant,
                    String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.vegetarian = vegetarian;
        this.category=category;
        this.restaurant = restaurant;
        this.imageUrl = imageUrl;
    }

    public MenuItem() {}

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public double getPrice() {
//        return price;
//    }
//
//    public void setPrice(double price) {
//        this.price = price;
//    }
//
//    public boolean isVegetarian() {
//        return vegetarian;
//    }
//
//    public void setVegetarian(boolean vegetarian) {
//        this.vegetarian = vegetarian;
//    }
//
//    public Category getCategory() {
//        return category;
//    }
//
//    public void setCategory(Category category) {
//        this.category = category;
//    }
//
//    public Restaurant getRestaurant() {
//        return restaurant;
//    }
//
//    public void setRestaurant(Restaurant restaurant) {
//        this.restaurant = restaurant;
//    }

    @JsonProperty("restaurant")
    public RestaurantDTO getRestaurantDTO() {
        return new RestaurantDTO(this.restaurant.getID(), this.restaurant.getRestaurantName(),this.restaurant.getRestaurantAddress());
    }
}
