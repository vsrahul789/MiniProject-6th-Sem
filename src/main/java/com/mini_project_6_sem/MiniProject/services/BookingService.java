package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.models.Booking;
import com.mini_project_6_sem.MiniProject.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public Booking updateBooking(Long id, LocalDate bookingTime, int numberOfPeople, Booking updatedBooking) {
        return bookingRepository.findById(id).map(existingBooking -> {
                    existingBooking.setBookingTime(bookingTime);
                    existingBooking.setNumberOfPeople(numberOfPeople);
                    existingBooking.setCustomer(updatedBooking.getCustomer());
                    existingBooking.setStatus(updatedBooking.getStatus());
                    existingBooking.setRestaurant(updatedBooking.getRestaurant()); // update restaurant as well
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
        if (booking.getNumberOfPeople() <= 0) {
            throw new IllegalArgumentException("Number of people must be greater than zero");
        }

        // Check if the booking date is not in the past
        if (booking.getBookingTime().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Booking date and time cannot be in the past");
        }
    }

    public boolean isTableAvailable(Booking booking) {
        // Get all bookings for the same restaurant on the same booking day
        LocalDate bookingDate = booking.getBookingTime();
        LocalDate nextDay = bookingDate.plusDays(1); // Get bookings from the start of the day up to the end of the next day.

        List<Booking> existingBookings = bookingRepository.findByRestaurantAndBookingDate(
                booking.getRestaurant(), LocalDate.from(bookingDate.atStartOfDay()));

        // Calculate the total number of bookings already made for this restaurant on the same day
        int totalBookings = existingBookings.size();

        // Check if adding this booking would exceed the maxTable limit for the restaurant
        return totalBookings < booking.getRestaurant().getMaxTable();
    }
}
