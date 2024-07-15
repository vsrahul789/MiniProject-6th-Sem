package com.mini_project_6_sem.MiniProject.controller;


import com.mini_project_6_sem.MiniProject.models.BookingSlot;
import com.mini_project_6_sem.MiniProject.services.BookingSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookingSlots")
@CrossOrigin("*")
public class BookingSlotController {

    @Autowired
    private BookingSlotService bookingSlotService;

    @PostMapping("/add")
    public ResponseEntity<BookingSlot> createBookingSlot(@RequestBody BookingSlot bookingSlot) {
        BookingSlot createdSlot = bookingSlotService.createBookingSlot(bookingSlot);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSlot);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookingSlot>> getAllBookingSlots() {
        List<BookingSlot> slots = bookingSlotService.getAllBookingSlots();
        return ResponseEntity.ok(slots);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<BookingSlot>> getBookingSlotById(@PathVariable Long id) {
        Optional<BookingSlot> slot = bookingSlotService.getBookingSlotById(id);
        return ResponseEntity.ok(slot);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BookingSlot> updateBookingSlot(@PathVariable Long id, @RequestBody BookingSlot bookingSlot) {
        BookingSlot updatedSlot = bookingSlotService.updateBookingSlot(id, bookingSlot);
        return ResponseEntity.ok(updatedSlot);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBookingSlot(@PathVariable Long id) {
        bookingSlotService.deleteBookingSlot(id);
        return ResponseEntity.noContent().build();
    }
}

