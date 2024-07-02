package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.models.FoodCart;
import com.mini_project_6_sem.MiniProject.models.MenuItem;
import com.mini_project_6_sem.MiniProject.services.FoodCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/cart")
public class FoodCartController {

    @Autowired
    private FoodCartService cartService;

    @GetMapping("/{userId}")
    public FoodCart getCart(@PathVariable Integer userId) {
        return cartService.getCartByCustomerId(userId);
    }

    @PostMapping("/{userId}/add")
    public FoodCart addMenuItemToCart(@PathVariable Integer userId, @RequestBody MenuItem menuItem) {
        return cartService.addMenuItemToCart(userId, menuItem);
    }

    @PostMapping("/{userId}/remove")
    public FoodCart removeMenuItemFromCart(@PathVariable Integer userId, @RequestBody MenuItem menuItem) {
        return cartService.removeMenuItemFromCart(userId, menuItem);
    }

    @PostMapping("/{userId}/clear")
    public FoodCart clearCart(@PathVariable Integer userId) {
        return cartService.clearCart(userId);
    }
}
