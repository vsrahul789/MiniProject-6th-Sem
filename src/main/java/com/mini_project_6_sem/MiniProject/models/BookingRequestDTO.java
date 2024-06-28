package com.mini_project_6_sem.MiniProject.models;

import java.time.LocalDate;

/**
 * Data Transfer Object (DTO) for booking requests.
 */
public class BookingRequestDTO {

    private Long restaurantId;
    private LocalDate bookingDate;

    private int numberOfPeople;

    public BookingRequestDTO() {
        // Default constructor needed for frameworks like Spring to deserialize JSON
    }

    public BookingRequestDTO(Long restaurantId, LocalDate bookingTime, int numberOfPeople) {
        this.restaurantId = restaurantId;
        this.bookingDate = bookingTime;
        this.numberOfPeople = numberOfPeople;
    }

    // Getters and setters

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }


    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(int numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }
}
