package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.models.Booking;
import com.mini_project_6_sem.MiniProject.dto.BookingRequestDTO;
import com.mini_project_6_sem.MiniProject.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/addBooking")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequestDTO bookingRequest) {
        try {
            // Get the current authenticated user's username
            String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

            // Check if tables are available for booking
            if (!bookingService.isTableAvailable(bookingRequest)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Tables are full for the selected date. Please choose another date or time.");
            }

            // Proceed to create the booking if tables are available
            Booking createdBooking = bookingService.createBooking(bookingRequest, currentUsername);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/getBooking")
    public ResponseEntity<List<Booking>> getBookings() {
        return ResponseEntity.ok(bookingService.getBookings());
    }

    @GetMapping("/getBooking/{id}")
    public ResponseEntity<Optional<Booking>> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @PutMapping("/updateBooking/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestParam LocalDate bookingDate, @RequestParam int numberOfPeople, @RequestBody Booking updatedBooking) {
        try {
            Booking updated = bookingService.updateBooking(id, bookingDate, numberOfPeople, updatedBooking);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteBooking/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        try {
            bookingService.deleteBooking(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
