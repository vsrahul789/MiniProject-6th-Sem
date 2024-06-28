package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.models.MenuItem;
import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.repository.MenuItemRepository;
import com.mini_project_6_sem.MiniProject.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private RestaurantRepository restaurantRepository; // Assuming you have a RestaurantRepository

    public MenuItem addMenuItem(MenuItem menuItem) {
        // Additional validation or business logic can be added here
        return menuItemRepository.save(menuItem);
    }

    public void deleteMenuItem(Long menuItemId) {
        menuItemRepository.deleteById(menuItemId);
    }

    public MenuItem updateMenuItem(Long menuItemId, MenuItem updatedMenuItem) {
        // Fetch existing MenuItem by ID
        MenuItem existingMenuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid MenuItem ID"));

        // Update properties
        existingMenuItem.setName(updatedMenuItem.getName());
        existingMenuItem.setDescription(updatedMenuItem.getDescription());
        existingMenuItem.setPrice(updatedMenuItem.getPrice());
        existingMenuItem.setVegetarian(updatedMenuItem.isVegetarian());

        // Save updated MenuItem
        return menuItemRepository.save(existingMenuItem);
    }

    public List<MenuItem> getMenuItemsByRestaurant(Long restaurantId) {
        // Fetch restaurant
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Restaurant ID"));

        // Fetch menu items for the restaurant
        List<MenuItem> menuItems = menuItemRepository.findByRestaurantID(restaurantId);

        // Set the restaurant for each menu item
        for (MenuItem menuItem : menuItems) {
            menuItem.setRestaurant(restaurant);
        }

        return menuItems;
    }
}
