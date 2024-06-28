package com.mini_project_6_sem.MiniProject.models;

import java.time.LocalDate;

public class BookingRequestDTO {

    private Long restaurantId;
    private LocalDate bookingDate;
    private int numberOfPeople;

    // Getters, setters, constructors

    public BookingRequestDTO() {
    }

    public BookingRequestDTO(Long restaurantId, LocalDate bookingDate, int numberOfPeople) {
        this.restaurantId = restaurantId;
        this.bookingDate = bookingDate;
        this.numberOfPeople = numberOfPeople;
    }

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
