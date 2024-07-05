package com.mini_project_6_sem.MiniProject.repository;

import com.mini_project_6_sem.MiniProject.models.Booking;
import com.mini_project_6_sem.MiniProject.models.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByRestaurantAndBookingTime(Restaurant restaurant, LocalDate bookingTime);
}
