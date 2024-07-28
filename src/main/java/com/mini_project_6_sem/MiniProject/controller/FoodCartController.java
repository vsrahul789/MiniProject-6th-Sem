package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.dto.AddItemToCartRequest;
import com.mini_project_6_sem.MiniProject.dto.FoodCartDTO;
import com.mini_project_6_sem.MiniProject.dto.StripeChargeDTO;
import com.mini_project_6_sem.MiniProject.services.FoodCartService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class FoodCartController {

    @Autowired
    private FoodCartService foodCartService;

    @PostMapping("/add")
    public FoodCartDTO addItemToCart(@RequestBody AddItemToCartRequest request) {
        return foodCartService.addItemToCart(request.getUsername(), request.getMenuItemId(), request.getQuantity());
    }

    @PostMapping("/increase")
    public FoodCartDTO increaseQuantity(@RequestBody AddItemToCartRequest request) {
        return foodCartService.increaseQuantity(request.getUsername(), request.getMenuItemId(), request.getQuantity());
    }

    @PostMapping("/decrease")
    public FoodCartDTO decreaseQuantity(@RequestBody AddItemToCartRequest request) {
        return foodCartService.decreaseQuantity(request.getUsername(), request.getMenuItemId(), request.getQuantity());
    }

    @DeleteMapping("/clear/{cartId}")
    public void clearCart(@PathVariable Long cartId) {
        foodCartService.clearCart(cartId);
    }

    @GetMapping("/getCart/{username}")
    public FoodCartDTO getCart(@PathVariable String username) {
        return foodCartService.getCart(username);
    }


}