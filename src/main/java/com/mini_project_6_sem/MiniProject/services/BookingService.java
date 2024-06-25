package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.models.Booking;
import com.mini_project_6_sem.MiniProject.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        // Validate booking details
        validateBooking(booking);

        // Check table availability
        if (!isTableAvailable(booking)) {
            throw new IllegalArgumentException("Table is not available for the selected date and time");
        }

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Booking updateBooking(Long id, LocalDateTime bookingTime, int numberOfPeople, Booking updatedBooking) {
        return bookingRepository.findById(id).map(existingBooking -> {
                    existingBooking.setBookingTime(bookingTime);
                    existingBooking.setNumberOfPeople(numberOfPeople);
                    existingBooking.setCustomer(updatedBooking.getCustomer());
                    existingBooking.setTableNumber(updatedBooking.getTableNumber());
                    existingBooking.setStatus(updatedBooking.getStatus());
                    return bookingRepository.save(existingBooking);
                })
                .orElseThrow(() -> new IllegalArgumentException("Booking with id " + id + " not found"));
    }

    public void deleteBooking(Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Booking with id " + id + " not found");
        }
    }

    private void validateBooking(Booking booking) {
        // Check if all required fields are present
        if (booking.getCustomer() == null || booking.getCustomer().isEmpty()) {
            throw new IllegalArgumentException("Customer name is required");
        }
        if (booking.getBookingTime() == null) {
            throw new IllegalArgumentException("Booking date and time are required");
        }
        if (booking.getTableNumber() == null) {
            throw new IllegalArgumentException("Table number is required");
        }
        if (booking.getNumberOfPeople() <= 0) {
            throw new IllegalArgumentException("Number of people must be greater than zero");
        }

        // Check if the booking date is not in the past
        if (booking.getBookingTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Booking date and time cannot be in the past");
        }
    }

    private boolean isTableAvailable(Booking booking) {
        List<Booking> existingBookings = bookingRepository.findByTableNumberAndBookingTime(
                booking.getTableNumber(), booking.getBookingTime());

        return existingBookings.isEmpty();
    }
}
