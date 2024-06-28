package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.models.Booking;
import com.mini_project_6_sem.MiniProject.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/addBooking")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        try {
            Booking createdBooking = bookingService.createBooking(booking);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }

    @GetMapping("/getBookings")
    public ResponseEntity<List<Booking>> getBookings() {
        return ResponseEntity.ok(bookingService.getBookings());
    }

    @GetMapping("/getBooking/{id}")
    public ResponseEntity<Optional<Booking>> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        if (booking.isPresent()) {
            return ResponseEntity.ok(booking);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.empty());
        }
    }

    @PutMapping("/updateBooking/{id}")
    public ResponseEntity<Booking> updateBooking(
            @PathVariable Long id,
            @RequestParam String bookingDate, // accepting String and parsing to LocalDate
            @RequestParam int numberOfPeople,
            @RequestBody Booking updatedBooking) {
        try {
            LocalDate date = LocalDate.parse(bookingDate);
            Booking updated = bookingService.updateBooking(id, date, numberOfPeople, updatedBooking);
            return ResponseEntity.ok(updated);
        } catch (DateTimeParseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/deleteBooking/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        try {
            bookingService.deleteBooking(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
