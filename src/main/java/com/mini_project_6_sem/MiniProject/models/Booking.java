package com.mini_project_6_sem.MiniProject.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customer;
    private LocalDate bookingDate;
    private int numberOfPeople;
    private String status;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    public Booking(Long id, String customer, LocalDate bookingDate, int numberOfPeople, String status, Restaurant restaurant) {
        this.id = id;
        this.customer = customer;
        this.bookingDate = bookingDate;
        this.numberOfPeople = numberOfPeople;
        this.status = status;
        this.restaurant = restaurant;
    }

    public Booking() {

    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public LocalDate getBookingTime() {
        return bookingDate;
    }

    public void setBookingTime(LocalDate bookingTime) {
        this.bookingDate = bookingTime;
    }

    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
}
