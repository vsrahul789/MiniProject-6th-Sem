package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.models.FoodCart;
import com.mini_project_6_sem.MiniProject.models.FoodCartItem;
import com.mini_project_6_sem.MiniProject.services.FoodCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/foodcarts")
public class FoodCartController {

    private final FoodCartService foodCartService;

    @Autowired
    public FoodCartController(FoodCartService foodCartService) {
        this.foodCartService = foodCartService;
    }

    // Create a new food cart
    @PostMapping("/")
    public ResponseEntity<FoodCart> createFoodCart(@RequestBody FoodCart foodCart) {
        FoodCart createdCart = foodCartService.createFoodCart(foodCart);
        return ResponseEntity.ok(createdCart);
    }

    // Add an item to a food cart
    @PostMapping("/{foodCartId}/items")
    public ResponseEntity<FoodCartItem> addToCart(@PathVariable Long foodCartId, @RequestBody FoodCartItem foodCartItem) {
        FoodCartItem addedItem = foodCartService.addToCart(foodCartId, foodCartItem);
        return ResponseEntity.ok(addedItem);
    }

    // Update quantity of a cart item
    @PutMapping("/{foodCartId}/items/{foodCartItemId}")
    public ResponseEntity<FoodCart> updateCartItemQuantity(@PathVariable Long foodCartId, @PathVariable Long foodCartItemId, @RequestParam int quantityChange) {
        FoodCart updatedCart = foodCartService.updateCartItemQuantity(foodCartId, foodCartItemId, quantityChange);
        return ResponseEntity.ok(updatedCart);
    }

    // Delete a cart item
    @DeleteMapping("/{foodCartId}/items/{foodCartItemId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long foodCartId, @PathVariable Long foodCartItemId) {
        foodCartService.deleteCartItem(foodCartId, foodCartItemId);
        return ResponseEntity.ok().build();
    }
}

