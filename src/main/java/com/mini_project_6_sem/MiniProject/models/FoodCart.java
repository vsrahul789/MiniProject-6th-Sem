package com.mini_project_6_sem.MiniProject.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class FoodCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Restaurant restaurant;

    @OneToMany(mappedBy = "foodCart")
    private List<FoodCartItem> items;

    public FoodCart() {
        // Default constructor required by JPA
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<FoodCartItem> getItems() {
        return items;
    }

    public void setItems(List<FoodCartItem> items) {
        this.items = items;
    }

    public Long getCustomerId() {
        return customer != null ? customer.getId() : null;
    }

    public Long getRestaurantId() {
        return restaurant != null ? restaurant.getID() : null;
    }
}
