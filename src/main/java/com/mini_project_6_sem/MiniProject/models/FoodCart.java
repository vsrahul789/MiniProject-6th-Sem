package com.mini_project_6_sem.MiniProject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini_project_6_sem.MiniProject.dto.ApplicationUserDTO;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class FoodCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @JsonIgnore
    @OneToOne
    private ApplicationUser applicationUser;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MenuItem> menuItems = new ArrayList<>();

    private double totalCost = 0.0;
    private static final double TAX_RATE= 0.07;  // 7% tax

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ApplicationUser getApplicationUser() {
        return applicationUser;
    }


    public void setApplicationUser(ApplicationUser customer) {
        this.applicationUser = customer;
    }

    public List<MenuItem> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public void addMenuItem(MenuItem menuItem) {
        this.menuItems.add(menuItem);
        this.totalCost += menuItem.getPrice() * (1 + TAX_RATE);
    }

    public void removeMenuItem(MenuItem menuItem) {
        if (this.menuItems.remove(menuItem)) {
            this.totalCost -= menuItem.getPrice() * (1 + TAX_RATE);
        }
    }

        public void clearCart() {
        this.menuItems.clear();
        this.totalCost = 0;
    }

}
