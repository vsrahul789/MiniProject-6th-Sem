package com.mini_project_6_sem.MiniProject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mini_project_6_sem.MiniProject.dto.RestaurantDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String customer;

    @Column(name = "booking_time")
    private LocalDate bookingTime;


    private int numberOfPeople;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "slot_id")
    private BookingSlot bookingSlot;

    public Booking(Long id, String customer, LocalDate bookingTime, int numberOfPeople, Restaurant restaurant,BookingSlot bookingSlot) {
        this.id = id;
        this.customer = customer;
        this.bookingTime = bookingTime;
        this.numberOfPeople = numberOfPeople;
        this.restaurant = restaurant;
        this.bookingSlot=bookingSlot;
    }

    public Booking() {

    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getCustomer() {
//        return customer;
//    }
//
//    public void setCustomer(String customer) {
//        this.customer = customer;
//    }
//
//    public int getNumberOfPeople() {
//        return numberOfPeople;
//    }
//
//    public void setNumberOfPeople(int numberOfPeople) {
//        this.numberOfPeople = numberOfPeople;
//    }
//
//    public void setRestaurant(Restaurant restaurant) {
//        this.restaurant = restaurant;
//    }
//
//    public LocalDate getBookingTime() {
//        return bookingTime;
//    }
//
//    public void setBookingTime(LocalDate bookingTime) {
//        this.bookingTime = bookingTime;
//    }
//
//    public BookingSlot getBookingSlot() {
//        return bookingSlot;
//    }
//
//    public void setBookingSlot(BookingSlot bookingSlot) {
//        this.bookingSlot = bookingSlot;
//    }


    @Transient
    public RestaurantDTO getRestaurantDTO() {
        return new RestaurantDTO(this.restaurant.getID(), this.restaurant.getRestaurantName(),this.restaurant.getRestaurantAddress());
    }

    @JsonIgnore
    public Restaurant getRestaurant() {
        return restaurant;
    }
}
