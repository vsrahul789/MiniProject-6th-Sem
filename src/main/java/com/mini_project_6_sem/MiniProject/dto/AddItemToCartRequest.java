package com.mini_project_6_sem.MiniProject.dto;


import lombok.Data;

@Data
public class AddItemToCartRequest {
    private String username;
    private Long menuItemId;
    private int quantity;

    public AddItemToCartRequest() {
    }

    public AddItemToCartRequest(String username, Long menuItemId, int quantity) {
        this.username = username;
        this.menuItemId = menuItemId;
        this.quantity = quantity;
    }

//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public Long getMenuItemId() {
//        return menuItemId;
//    }
//
//    public void setMenuItemId(Long menuItemId) {
//        this.menuItemId = menuItemId;
//    }
//
//    public int getQuantity() {
//        return quantity;
//    }
//
//    public void setQuantity(int quantity) {
//        this.quantity = quantity;
//    }
}
