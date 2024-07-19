package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.dto.MenuItemDTO;
import com.mini_project_6_sem.MiniProject.models.MenuItem;
import com.mini_project_6_sem.MiniProject.services.CloudinaryService;
import com.mini_project_6_sem.MiniProject.services.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu")
@CrossOrigin("*")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;
    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/add")
    public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItemDTO menuItemDTO) {
        MenuItem newMenuItem = menuItemService.addMenuItem(menuItemDTO);
        return new ResponseEntity<>(newMenuItem, HttpStatus.CREATED);
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
