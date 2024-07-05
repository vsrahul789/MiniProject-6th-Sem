package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import com.mini_project_6_sem.MiniProject.models.Booking;
import com.mini_project_6_sem.MiniProject.dto.BookingRequestDTO;
import com.mini_project_6_sem.MiniProject.models.BookingSlot;
import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.repository.BookingRepository;
import com.mini_project_6_sem.MiniProject.repository.RestaurantRepository;
import com.mini_project_6_sem.MiniProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingSlotService bookingSlotService;

    @Transactional
    public Booking createBooking(BookingRequestDTO bookingRequest, String username) {
        validateBookingRequest(bookingRequest);

        ApplicationUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BookingSlot slot = bookingSlotService.bookSlot(bookingRequest.getSlotId());

        Booking booking = new Booking();
        booking.setBookingTime(bookingRequest.getBookingDate());
        booking.setNumberOfPeople(bookingRequest.getNumberOfPeople());
        booking.setCustomer(user.getUsername()); // Set customer name as the username
        booking.setBookingSlot(slot);

        // Fetch the restaurant by its ID
        Long restaurantId = bookingRequest.getRestaurantId();
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


    @Transactional
    public Booking updateBooking(Long id, BookingRequestDTO bookingRequest, String username) {
        validateBookingRequest(bookingRequest);

        ApplicationUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BookingSlot newSlot = bookingSlotService.bookSlot(bookingRequest.getSlotId());

        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking with id " + id + " not found"));

        // Unbook the previous slot
        BookingSlot previousSlot = existingBooking.getBookingSlot();
        if (previousSlot != null) {
            bookingSlotService.unbookSlot(previousSlot.getId());
        }

        existingBooking.setBookingTime(bookingRequest.getBookingDate());
        existingBooking.setNumberOfPeople(bookingRequest.getNumberOfPeople());
        existingBooking.setCustomer(user.getUsername());
        existingBooking.setBookingSlot(newSlot);

        // Fetch the restaurant by its ID
        Long restaurantId = bookingRequest.getRestaurantId();
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));

        existingBooking.setRestaurant(restaurant);

        if (!isTableAvailable(bookingRequest)) {
            throw new IllegalArgumentException("Tables are full for the selected restaurant on this date");
        }

        return bookingRepository.save(existingBooking);
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
        if (bookingRequest.getRestaurantId() == null) {
            throw new IllegalArgumentException("Restaurant ID is required");
        }
        if (bookingRequest.getSlotId() == null) {
            throw new IllegalArgumentException("Slot ID is required");
        }
    }

    public boolean isTableAvailable(BookingRequestDTO bookingRequest) {
        if (bookingRequest == null || bookingRequest.getRestaurantId() == null || bookingRequest.getBookingDate() == null) {
            throw new IllegalArgumentException("Booking and restaurant must be provided with valid values.");
        }

        LocalDate bookingDate = bookingRequest.getBookingDate();
        Long restaurantId = bookingRequest.getRestaurantId();
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));

        List<Booking> existingBookings = bookingRepository.findByRestaurantAndBookingTime(restaurant, bookingDate);

        int totalBookings = existingBookings.size();

        return totalBookings < restaurant.getMaxTable();
    }
}
