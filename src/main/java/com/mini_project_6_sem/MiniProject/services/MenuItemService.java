package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.dto.MenuItemDTO;
import com.mini_project_6_sem.MiniProject.models.MenuItem;
import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.repository.MenuItemRepository;
import com.mini_project_6_sem.MiniProject.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public MenuItem addMenuItem(MenuItemDTO menuItemDTO) {
        Restaurant restaurant = restaurantRepository.findById(menuItemDTO.getRestaurantId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid restaurant ID: " + menuItemDTO.getRestaurantId()));
        MenuItem menuItem = new MenuItem();
        menuItem.setName(menuItemDTO.getName());
        menuItem.setDescription(menuItemDTO.getDescription());
        menuItem.setPrice(menuItemDTO.getPrice());
        menuItem.setVegetarian(menuItemDTO.isVegetarian());
        menuItem.setCategory(menuItemDTO.getCategory());
        menuItem.setRestaurant(restaurant);
        menuItem.setImageUrl(menuItemDTO.getImageUrl());
        return menuItemRepository.save(menuItem);
    }

    public MenuItem updateMenuItem(Long id, MenuItemDTO menuItemDTO) {
        // Fetch existing MenuItem entity
        MenuItem existingMenuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Menu item not found"));

        existingMenuItem.setName(menuItemDTO.getName());
        existingMenuItem.setDescription(menuItemDTO.getDescription());
        existingMenuItem.setPrice(menuItemDTO.getPrice());
        existingMenuItem.setVegetarian(menuItemDTO.isVegetarian());
        existingMenuItem.setCategory(menuItemDTO.getCategory());

        // Fetch associated restaurant from repository
        Restaurant restaurant = restaurantRepository.findById(menuItemDTO.getRestaurantId())
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));

        existingMenuItem.setRestaurant(restaurant); // Update associated restaurant

        // Save updated MenuItem entity
        return menuItemRepository.save(existingMenuItem);
    }

    public void deleteMenuItem(Long id) {
        if (menuItemRepository.existsById(id)) {
            menuItemRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Menu item with id " + id + " not found");
        }
    }

    public List<MenuItemDTO> getMenuItemsByRestaurant(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));

        List<MenuItem> menuItems = menuItemRepository.findByRestaurantID(restaurantId);

        return menuItems.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private MenuItemDTO mapToDTO(MenuItem menuItem) {
        MenuItemDTO menuItemDTO = new MenuItemDTO();
        menuItemDTO.setId(menuItem.getId());
        menuItemDTO.setName(menuItem.getName());
        menuItemDTO.setDescription(menuItem.getDescription());
        menuItemDTO.setPrice(menuItem.getPrice());
        menuItemDTO.setVegetarian(menuItem.isVegetarian());
        menuItemDTO.setCategory(menuItem.getCategory());

        // Ensure restaurant details are set correctly
        Restaurant restaurant = menuItem.getRestaurant();
        if (restaurant != null) {
            menuItemDTO.setRestaurantId(restaurant.getID());
            menuItemDTO.setRestaurantName(restaurant.getRestaurantName());
        } else {
            menuItemDTO.setRestaurantId(null);
            menuItemDTO.setRestaurantName(null);
        }
        menuItemDTO.setImageUrl(menuItem.getImageUrl());

        return menuItemDTO;
    }
}
