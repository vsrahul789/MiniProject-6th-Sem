package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.dto.MenuItemDTO;
import com.mini_project_6_sem.MiniProject.models.MenuItem;
import com.mini_project_6_sem.MiniProject.services.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu")
@CrossOrigin("*")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @PostMapping("/add")
    public MenuItem addMenuItem(@RequestBody MenuItemDTO menuItemDTO) {
        return menuItemService.addMenuItem(menuItemDTO); // Update service to handle MenuItemDTO
    }

    @DeleteMapping("/delete/{menuItemId}")
    public void deleteMenuItem(@PathVariable Long menuItemId) {
        menuItemService.deleteMenuItem(menuItemId);
    }

    @PutMapping("/update/{menuItemId}")
    public MenuItem updateMenuItem(@PathVariable Long menuItemId, @RequestBody MenuItemDTO updatedMenuItemDTO) {
        return menuItemService.updateMenuItem(menuItemId, updatedMenuItemDTO); // Update service to handle MenuItemDTO
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<MenuItemDTO> getMenuItemsByRestaurant(@PathVariable Long restaurantId) {
        return menuItemService.getMenuItemsByRestaurant(restaurantId); // Update service to return MenuItemDTO
    }
}
