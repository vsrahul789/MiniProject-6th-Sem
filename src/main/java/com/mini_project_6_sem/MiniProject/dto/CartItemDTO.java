package com.mini_project_6_sem.MiniProject.dto;

import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private MenuItemDTO menuItem;
    private Long cartId;
    private int quantity;

    // constructors, getters, setters

    public CartItemDTO(Long id, MenuItemDTO menuItem, int quantity,long cartId) {
        this.id = id;
        this.menuItem = menuItem;
        this.quantity = quantity;
        this.cartId=cartId;
    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public MenuItemDTO getMenuItem() {
//        return menuItem;
//    }
//
//    public void setMenuItem(MenuItemDTO menuItem) {
//        this.menuItem = menuItem;
//    }
//
//    public int getQuantity() {
//        return quantity;
//    }
//
//    public void setQuantity(int quantity) {
//        this.quantity = quantity;
//    }
//
//    public Long getCartId() {
//        return cartId;
//    }
//
//    public void setCartId(Long cartId) {
//        this.cartId = cartId;
//    }
}