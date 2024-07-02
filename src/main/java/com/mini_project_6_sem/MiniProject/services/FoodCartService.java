package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.models.FoodCart;
import com.mini_project_6_sem.MiniProject.models.FoodCartItem;
import com.mini_project_6_sem.MiniProject.repository.FoodCartRepository;
import com.mini_project_6_sem.MiniProject.repository.FoodCartItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class FoodCartService {

    private final FoodCartRepository foodCartRepository;
    private final FoodCartItemRepository foodCartItemRepository;

    @Autowired
    public FoodCartService(FoodCartRepository foodCartRepository, FoodCartItemRepository foodCartItemRepository) {
        this.foodCartRepository = foodCartRepository;
        this.foodCartItemRepository = foodCartItemRepository;
    }

    @Transactional
    public FoodCart createFoodCart(FoodCart foodCart) {
        return foodCartRepository.save(foodCart);
    }

    @Transactional
    public FoodCartItem addToCart(Long foodCartId, FoodCartItem foodCartItem) {
        Optional<FoodCart> optionalFoodCart = foodCartRepository.findById(foodCartId);
        if (optionalFoodCart.isPresent()) {
            FoodCart foodCart = optionalFoodCart.get();
            foodCartItem.setFoodCart(foodCart);
            return foodCartItemRepository.save(foodCartItem);
        }
        throw new RuntimeException("FoodCart not found for id: " + foodCartId);
    }

    @Transactional
    public FoodCart updateCartItemQuantity(Long foodCartId, Long foodCartItemId, int quantityChange) {
        Optional<FoodCart> optionalFoodCart = foodCartRepository.findById(foodCartId);
        if (optionalFoodCart.isPresent()) {
            FoodCart foodCart = optionalFoodCart.get();
            List<FoodCartItem> items = foodCart.getItems();
            for (FoodCartItem item : items) {
                if (item.getId().equals(foodCartItemId)) {
                    int newQuantity = item.getQuantity() + quantityChange;
                    item.setQuantity(newQuantity);
                    foodCartItemRepository.save(item);
                    break;
                }
            }
            return foodCartRepository.save(foodCart);
        }
        throw new RuntimeException("FoodCart not found for id: " + foodCartId);
    }

    @Transactional
    public void deleteCartItem(Long foodCartId, Long foodCartItemId) {
        Optional<FoodCart> optionalFoodCart = foodCartRepository.findById(foodCartId);
        if (optionalFoodCart.isPresent()) {
            FoodCart foodCart = optionalFoodCart.get();
            List<FoodCartItem> items = foodCart.getItems();
            items.removeIf(item -> item.getId().equals(foodCartItemId));
            foodCart.setItems(items);
            foodCartRepository.save(foodCart);
        } else {
            throw new RuntimeException("FoodCart not found for id: " + foodCartId);
        }
    }
}
