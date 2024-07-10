package com.mini_project_6_sem.MiniProject.models;

import com.mini_project_6_sem.MiniProject.utils.FoodType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private Long ID;

    @Column(name = "restaurant_name")
    private String restaurantName;

    @Column(name = "max_table")
    private Long maxTable;

    @Embedded
    private Address restaurantAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "food_type")
    private FoodType foodType;

    private double latitude;
    private double longitude;


    public Restaurant(Long ID, String restaurantName, Address restaurantAddress, FoodType foodType, Long maxTable, Double latitude, Double longitude) {
        this.ID = ID;
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
        this.foodType = foodType;
        this.maxTable = maxTable;
        this.latitude = latitude;
        this.longitude = longitude;
    }


    public Restaurant() {
    }

//        public Long getID() {
//            return ID;
//        }
//
//        public void setID(Long ID) {
//            this.ID = ID;
//        }
//
//        public String getRestaurantName() {
//            return restaurantName;
//        }
//
//        public void setRestaurantName(String restaurantName) {
//            this.restaurantName = restaurantName;
//        }
//
//        public Address getRestaurantAddress() {
//            return restaurantAddress;
//        }
//
//        public void setRestaurantAddress(Address restaurantAddress) {
//            this.restaurantAddress = restaurantAddress;
//        }
//
//        public FoodType getFoodType() {
//            return foodType;
//        }
//
//        public void setFoodType(FoodType foodType) {
//            this.foodType = foodType;
//        }
//
//        public Long getMaxTable() {
//            return maxTable;
//        }
//
//        public void setMaxTable(Long maxTable) {
//            this.maxTable = maxTable;
//        }
//
//        public double getLatitude() {
//            return latitude;
//        }
//
//        public void setLatitude(double latitude) {
//            this.latitude = latitude;
//        }
//
//        public double getLongitude() {
//            return longitude;
//        }
//
//        public void setLongitude(double longitude) {
//            this.longitude = longitude;
//        }


}