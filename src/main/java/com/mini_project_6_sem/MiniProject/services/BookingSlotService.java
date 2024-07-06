package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.exception.BookingExceptionOnSlot;
import com.mini_project_6_sem.MiniProject.models.BookingSlot;
import com.mini_project_6_sem.MiniProject.repository.BookingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingSlotService {

    @Autowired
    private BookingSlotRepository bookingSlotRepository;

    public BookingSlot createBookingSlot(BookingSlot bookingSlot) {
        return bookingSlotRepository.save(bookingSlot);
    }

    public List<BookingSlot> getAllBookingSlots() {
        return bookingSlotRepository.findAll();
    }

    public Optional<BookingSlot> getBookingSlotById(Long id) {
        return bookingSlotRepository.findById(id);
    }

    public BookingSlot updateBookingSlot(Long id, BookingSlot bookingSlot) {
        BookingSlot existingSlot = bookingSlotRepository.findById(id)
                .orElseThrow(() -> new BookingExceptionOnSlot.BookingSlotNotFoundException("Booking slot not found"));

        existingSlot.setStartTime(bookingSlot.getStartTime());
        existingSlot.setEndTime(bookingSlot.getEndTime());
        existingSlot.setMaxTables(bookingSlot.getMaxTables());

        return bookingSlotRepository.save(existingSlot);
    }

    public void deleteBookingSlot(Long id) {
        bookingSlotRepository.deleteById(id);
    }

    public BookingSlot bookSlot(Long id) {
        BookingSlot slot = bookingSlotRepository.findById(id)
                .orElseThrow(() -> new BookingExceptionOnSlot.BookingSlotNotFoundException("Booking slot not found"));

        if (slot.getMaxTables() > 0) { // Ensure there are available tables
            slot.setMaxTables(slot.getMaxTables() - 1); // Decrement available tables
            return bookingSlotRepository.save(slot);
        } else {
            throw new BookingExceptionOnSlot.BookingSlotFullException("Booking slot is fully booked");
        }
    }

    public void unbookSlot(Long id) {
        BookingSlot slot = bookingSlotRepository.findById(id)
                .orElseThrow(() -> new BookingExceptionOnSlot.BookingSlotNotFoundException("Booking slot not found"));

        slot.setMaxTables(slot.getMaxTables() + 1); // Increment available tables
        bookingSlotRepository.save(slot);
    }
}
