package com.mini_project_6_sem.MiniProject.dto;

import com.mini_project_6_sem.MiniProject.dto.ApplicationUserDTO;
import com.mini_project_6_sem.MiniProject.dto.MenuItemDTO;

import java.util.List;

public class FoodCartDTO {
    private Long id;
    private List<MenuItemDTO> menuItems;
    private double totalCost;
    private ApplicationUserDTO customer;

    public FoodCartDTO(Long id, List<MenuItemDTO> menuItems, double totalCost, ApplicationUserDTO customer) {
        this.id = id;
        this.menuItems = menuItems;
        this.totalCost = totalCost;
        this.customer = customer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<MenuItemDTO> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItemDTO> menuItems) {
        this.menuItems = menuItems;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public ApplicationUserDTO getCustomer() {
        return customer;
    }

    public void setCustomer(ApplicationUserDTO customer) {
        this.customer = customer;
    }
}
