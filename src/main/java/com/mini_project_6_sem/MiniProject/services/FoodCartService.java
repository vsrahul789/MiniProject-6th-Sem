package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.dto.*;
import com.mini_project_6_sem.MiniProject.models.*;
import com.mini_project_6_sem.MiniProject.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodCartService {

    @Autowired
    private FoodCartRepository foodCartRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    public FoodCart getOrCreateCartForUser(String username) {
        ApplicationUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return foodCartRepository.findByUser(user)
                .orElseGet(() -> {
                    FoodCart cart = new FoodCart();
                    cart.setUser(user);
                    return foodCartRepository.save(cart);
                });
    }

    @Transactional
    public FoodCartDTO addItemToCart(String username, Long menuItemId, int quantity) {
        FoodCart cart = getOrCreateCartForUser(username);

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("MenuItem not found"));

        Optional<CartItem> existingCartItem = cart.getItems().stream()
                .filter(item -> item.getMenuItem().getId().equals(menuItemId))
                .findFirst();

        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItemRepository.save(cartItem); // Save the existing cart item
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setMenuItem(menuItem);
            cartItem.setQuantity(quantity);
            cartItem.setCart(cart);
            cart.getItems().add(cartItem); // Add the new cart item to the cart
            cartItemRepository.save(cartItem); // Save the new cart item
        }

        foodCartRepository.save(cart); // Save the updated cart

        return convertToDTO(cart); // Convert cart to DTO for response
    }

    @Transactional
    public FoodCartDTO increaseQuantity(String username, Long menuItemId, int quantity) {
        FoodCart cart = getOrCreateCartForUser(username);

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("MenuItem not found"));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getMenuItem().getId().equals(menuItemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartItemRepository.save(cartItem);

        foodCartRepository.save(cart);

        return convertToDTO(cart);
    }


    @Transactional
    public FoodCartDTO decreaseQuantity(String username, Long menuItemId, int quantity) {
        FoodCart cart = getOrCreateCartForUser(username);

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("MenuItem not found"));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getMenuItem().getId().equals(menuItemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

    int newQuantity = cartItem.getQuantity() - quantity;
        if (newQuantity <= 0) {
            cart.getItems().remove(cartItem);
            cartItemRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(newQuantity);
            cartItemRepository.save(cartItem);
        }

        return convertToDTO(cart);
    }

    @Transactional
    public void clearCart(Long cartId) {
        if(foodCartRepository.existsById(cartId)) {
            foodCartRepository.deleteById(cartId);
        }else{
            throw new RuntimeException("Cart not found");
        }
    }

    public double calculateTotalCost(FoodCart cart) {
        return cart.getItems().stream()
                .mapToDouble(item -> item.getMenuItem().getPrice() * item.getQuantity())
                .sum();
    }

    private FoodCartDTO convertToDTO(FoodCart cart) {
        ApplicationUserDTO userDTO = new ApplicationUserDTO(
                cart.getUser().getUserId(),
                cart.getUser().getUsername(),
                cart.getUser().getEmail()
        );

        List<CartItemDTO> itemDTOs = cart.getItems().stream()
                .map(item -> {
                    MenuItem menuItem = item.getMenuItem();

                    Restaurant restaurant = menuItem.getRestaurant();
                    RestaurantDTO restaurantDTO = new RestaurantDTO(
                            restaurant.getID(),
                            restaurant.getRestaurantName()
                    );

                    MenuItemDTO menuItemDTO = new MenuItemDTO(
                            menuItem.getId(),
                            menuItem.getName(),
                            menuItem.getDescription(),
                            menuItem.getPrice(),
                            menuItem.isVegetarian(),
                            menuItem.getCategory(),
                            restaurant.getID(),
                            restaurant.getRestaurantName()
                    );

                    return new CartItemDTO(
                            item.getId(),
                            menuItemDTO,
                            item.getQuantity(),
                            item.getCart().getId()
                    );
                })
                .collect(Collectors.toList());

        double totalCost = calculateTotalCost(cart);

        return new FoodCartDTO(
                cart.getId(),
                itemDTOs,
                totalCost,
                userDTO
        );
    }

    @Transactional
    public void processPayment(Long cartId) {
        FoodCart cart = foodCartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        double totalCost = calculateTotalCost(cart)*0.70;

        // Implement payment processing logic here

        clearCart(cartId); // Clear the cart after successful payment
    }

    public FoodCartDTO getCart(String username) {
        ApplicationUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        FoodCart cart = foodCartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        return convertToDTO(cart);
    }
}
