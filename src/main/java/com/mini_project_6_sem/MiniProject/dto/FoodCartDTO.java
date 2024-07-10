package com.mini_project_6_sem.MiniProject.dto;

import com.mini_project_6_sem.MiniProject.dto.ApplicationUserDTO;
import com.mini_project_6_sem.MiniProject.dto.MenuItemDTO;
import com.mini_project_6_sem.MiniProject.models.CartItem;
import lombok.Data;

import java.util.List;

@Data
public class FoodCartDTO {
    private Long id;
    private List<CartItemDTO> menuItems;
    private double totalCost;
    private ApplicationUserDTO customer;

    public FoodCartDTO(Long id, List<CartItemDTO> menuItems, double totalCost, ApplicationUserDTO customer) {
        this.id = id;
        this.menuItems = menuItems;
        this.totalCost = totalCost;
        this.customer = customer;
    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public List<CartItemDTO> getMenuItems() {
//        return menuItems;
//    }
//
//    public void setMenuItems(List<CartItemDTO> menuItems) {
//        this.menuItems = menuItems;
//    }
//
//    public double getTotalCost() {
//        return totalCost;
//    }
//
//    public void setTotalCost(double totalCost) {
//        this.totalCost = totalCost;
//    }
//
//    public ApplicationUserDTO getCustomer() {
//        return customer;
//    }
//
//    public void setCustomer(ApplicationUserDTO customer) {
//        this.customer = customer;
//    }
}
