package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.dto.ApplicationUserDTO;
import com.mini_project_6_sem.MiniProject.dto.FoodCartDTO;
import com.mini_project_6_sem.MiniProject.dto.MenuItemDTO;
import com.mini_project_6_sem.MiniProject.models.*;
import com.mini_project_6_sem.MiniProject.repository.*;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FoodCartService {

    private final FoodCartRepository foodCartRepository;
    private final UserRepository userRepository;

    public FoodCartService(FoodCartRepository foodCartRepository, UserRepository userRepository) {
        this.foodCartRepository = foodCartRepository;
        this.userRepository = userRepository;
    }

    public FoodCart getCartByCustomerId(Integer userId) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return foodCartRepository.findByApplicationUser(user)
                .orElseGet(() -> createNewCartForUser(user));
    }

    private FoodCart createNewCartForUser(ApplicationUser user) {
        FoodCart newCart = new FoodCart();
        newCart.setApplicationUser(user);
        return foodCartRepository.save(newCart);
    }

    public FoodCart addMenuItemToCart(Integer userId, MenuItem menuItem) {
        FoodCart cart = getCartByCustomerId(userId);
        cart.addMenuItem(menuItem);
        return foodCartRepository.save(cart);
    }

    public FoodCart removeMenuItemFromCart(Integer userId, MenuItem menuItem) {
        FoodCart cart = getCartByCustomerId(userId);
        cart.removeMenuItem(menuItem);
        return foodCartRepository.save(cart);
    }

    public FoodCart clearCart(Integer userId) {
        FoodCart cart = getCartByCustomerId(userId);
        cart.clearCart();
        return foodCartRepository.save(cart);
    }

}
