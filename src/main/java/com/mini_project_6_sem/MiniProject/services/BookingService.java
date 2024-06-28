package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.models.Booking;
import com.mini_project_6_sem.MiniProject.models.BookingRequestDTO;
import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.repository.BookingRepository;
import com.mini_project_6_sem.MiniProject.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public Booking createBooking(BookingRequestDTO bookingRequest) {
        validateBookingRequest(bookingRequest);

        Booking booking = new Booking();
        booking.setBookingTime(bookingRequest.getBookingDate());
        booking.setNumberOfPeople(bookingRequest.getNumberOfPeople());

        // Fetch the restaurant by its ID
        Long restaurantId = bookingRequest.getRestaurantId();
        if (restaurantId == null) {
            throw new IllegalArgumentException("Restaurant ID is required");
        }
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));

        booking.setRestaurant(restaurant);

        if (!isTableAvailable(bookingRequest)) {
            throw new IllegalArgumentException("Tables are full for the selected restaurant on this date");
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
            existingBooking.setRestaurant(updatedBooking.getRestaurant());
            return bookingRepository.save(existingBooking);
        }).orElseThrow(() -> new IllegalArgumentException("Booking with id " + id + " not found"));
    }

    public void deleteBooking(Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Booking with id " + id + " not found");
        }
    }

    private void validateBookingRequest(BookingRequestDTO bookingRequest) {
        if (bookingRequest.getBookingDate() == null) {
            throw new IllegalArgumentException("Booking date is required");
        }
        if (bookingRequest.getNumberOfPeople() <= 0) {
            throw new IllegalArgumentException("Number of people must be greater than zero");
        }
    }

    public boolean isTableAvailable(BookingRequestDTO bookingRequest) {
        // Validate input parameters
        if (bookingRequest == null || bookingRequest.getRestaurantId() == null || bookingRequest.getBookingDate() == null) {
            throw new IllegalArgumentException("Booking and restaurant must be provided with valid values.");
        }

        // Fetch existing bookings for the same restaurant on the same booking day
        LocalDate bookingDate = bookingRequest.getBookingDate();
        Long restaurantId = bookingRequest.getRestaurantId();
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));

        List<Booking> existingBookings = bookingRepository.findByRestaurantAndBookingDate(restaurant, bookingDate);

        // Calculate total bookings already made for this restaurant on the same day
        int totalBookings = existingBookings.size();

        // Check if adding this booking would exceed the maxTable limit for the restaurant
        return totalBookings < restaurant.getMaxTable();
    }
}
