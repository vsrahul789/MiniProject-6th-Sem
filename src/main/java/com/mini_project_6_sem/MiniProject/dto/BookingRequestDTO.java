package com.mini_project_6_sem.MiniProject.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class BookingRequestDTO {

    private Long restaurantId;
    private LocalDate bookingDate;
    private int numberOfPeople;
    private Long slotId;

    public BookingRequestDTO() {
    }

    public BookingRequestDTO(Long restaurantId, LocalDate bookingDate, int numberOfPeople, Long slotId) {
        this.restaurantId = restaurantId;
        this.bookingDate = bookingDate;
        this.numberOfPeople = numberOfPeople;
        this.slotId = slotId;
    }

//    public Long getRestaurantId() {
//        return restaurantId;
//    }
//
//    public void setRestaurantId(Long restaurantId) {
//        this.restaurantId = restaurantId;
//    }
//
//    public LocalDate getBookingDate() {
//        return bookingDate;
//    }
//
//    public void setBookingDate(LocalDate bookingDate) {
//        this.bookingDate = bookingDate;
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
//    public Long getSlotId() {
//        return slotId;
//    }
//
//    public void setSlotId(Long slotId) {
//        this.slotId = slotId;
//    }
}
