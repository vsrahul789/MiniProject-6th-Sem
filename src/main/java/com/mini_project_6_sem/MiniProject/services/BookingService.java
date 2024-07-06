package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.exception.BookingRestException;
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
                .orElseThrow(() -> new BookingRestException.UserNotFoundException("User not found"));

        BookingSlot slot = bookingSlotService.bookSlot(bookingRequest.getSlotId());

        Booking booking = new Booking();
        booking.setBookingTime(bookingRequest.getBookingDate());
        booking.setNumberOfPeople(bookingRequest.getNumberOfPeople());
        booking.setCustomer(user.getUsername());
        booking.setBookingSlot(slot);

        Long restaurantId = bookingRequest.getRestaurantId();
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new BookingRestException.RestaurantNotFoundException("Restaurant not found"));

        booking.setRestaurant(restaurant);

        if (!isTableAvailable(bookingRequest)) {
            throw new BookingRestException.BookingException("Tables are full for the selected restaurant on this date");
        }

        return bookingRepository.save(booking);
    }

    // Other methods remain the same

    private void validateBookingRequest(BookingRequestDTO bookingRequest) {
        if (bookingRequest.getBookingDate() == null) {
            throw new BookingRestException.BookingException("Booking date is required");
        }
        if (bookingRequest.getNumberOfPeople() <= 0) {
            throw new BookingRestException.BookingException("Number of people must be greater than zero");
        }
        if (bookingRequest.getRestaurantId() == null) {
            throw new BookingRestException.BookingException("Restaurant ID is required");
        }
        if (bookingRequest.getSlotId() == null) {
            throw new BookingRestException.BookingException("Slot ID is required");
        }
    }

    public boolean isTableAvailable(BookingRequestDTO bookingRequest) {
        if (bookingRequest == null || bookingRequest.getRestaurantId() == null || bookingRequest.getBookingDate() == null) {
            throw new BookingRestException.BookingException("Booking and restaurant must be provided with valid values.");
        }

        LocalDate bookingDate = bookingRequest.getBookingDate();
        Long restaurantId = bookingRequest.getRestaurantId();
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new BookingRestException.RestaurantNotFoundException("Restaurant not found"));

        List<Booking> existingBookings = bookingRepository.findByRestaurantAndBookingTime(restaurant, bookingDate);

        int totalBookings = existingBookings.size();

        return totalBookings < restaurant.getMaxTable();
    }
}
