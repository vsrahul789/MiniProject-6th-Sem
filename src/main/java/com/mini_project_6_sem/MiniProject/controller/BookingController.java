package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.models.Booking;
import com.mini_project_6_sem.MiniProject.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/addBooking")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking createdBooking = bookingService.createBooking(booking);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
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
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestParam LocalDateTime bookingTime, @RequestParam int numberOfPeople, @RequestBody Booking updatedBooking) {
        try {
            Booking updated = bookingService.updateBooking(id, bookingTime, numberOfPeople, updatedBooking);
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
