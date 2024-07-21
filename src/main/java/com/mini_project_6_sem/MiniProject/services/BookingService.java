package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import com.mini_project_6_sem.MiniProject.models.Booking;
import com.mini_project_6_sem.MiniProject.dto.BookingRequestDTO;
import com.mini_project_6_sem.MiniProject.models.BookingSlot;
import com.mini_project_6_sem.MiniProject.models.Restaurant;
import com.mini_project_6_sem.MiniProject.repository.BookingRepository;
import com.mini_project_6_sem.MiniProject.repository.RestaurantRepository;
import com.mini_project_6_sem.MiniProject.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

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

    @Autowired
    private EmailService emailService;

    @Transactional
    public Booking createBooking(BookingRequestDTO bookingRequest, String username) {
        validateBookingRequest(bookingRequest);

        ApplicationUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BookingSlot slot = bookingSlotService.bookSlot(bookingRequest.getSlotId());


        Booking booking = new Booking();

        booking.setBookingTime(bookingRequest.getBookingDate());
        booking.setNumberOfPeople(bookingRequest.getNumberOfPeople());
        booking.setCustomer(user.getUsername());
        booking.setBookingSlot(slot);

        // Fetch the restaurant by its ID
        Long restaurantId = bookingRequest.getRestaurantId();
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));

        booking.setRestaurant(restaurant);

        if (!isTableAvailable(bookingRequest)) {
            throw new IllegalArgumentException("Tables are full for the selected restaurant on this date");
        }

        Booking savedBooking = bookingRepository.save(booking);

        confirmBooking(savedBooking, user);

        return savedBooking;

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

        Booking savedBooking = bookingRepository.save(existingBooking);

        confirmBookingUpdate(savedBooking, user);

        return savedBooking;
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

        int totalPeople = existingBookings.stream().mapToInt(Booking::getNumberOfPeople).sum();
        int totalTablesRequired = (totalPeople + bookingRequest.getNumberOfPeople() + 1) / 6; // Calculate total tables required

        return totalTablesRequired <= restaurant.getMaxTable();
    }




    public void confirmBooking(Booking booking,ApplicationUser applicationUser){

        String toEmail = applicationUser.getEmail();
        String subject ="Restaurant Booking Confirmation";
        String body = generateEmailBody(booking,applicationUser);

        try {
            emailService.sendBookingConfirmation(toEmail, subject, body);
        } catch (MessagingException e) {
            // Handle exception
            e.printStackTrace();
        }
    }

    public void confirmBookingUpdate(Booking booking,ApplicationUser applicationUser){

        String toEmail = applicationUser.getEmail();
        String subject ="Restaurant Booking Re-Confirmation";
        String body = generateEmailBodyForUpdate(booking,applicationUser);

        try {
            emailService.sendBookingConfirmation(toEmail, subject, body);
        } catch (MessagingException e) {
            // Handle exception
            e.printStackTrace();
        }
    }

    private String generateEmailBody(Booking booking, ApplicationUser applicationUser) {
        return "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>"
                + "<h1 style='color:#A020F0;'>Booking Confirmation</h1>"
                + "<p>Dear " + applicationUser.getUsername() + ",</p>"
                + "<p>Your booking at <strong>" + booking.getRestaurant().getRestaurantName() + "</strong> has been confirmed.</p>"
                + "<h2 style='color:#A020F0;'>Booking Details:</h2>"
                + "<ul style='list-style-type: none; padding: 0;'>"
                +"<li><strong>Reference id:</strong> "+booking.getRestaurant().getRestaurantName()+"-"+booking.getId()+"</li>"
                + "<li><strong>Date:</strong> " + booking.getBookingTime().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)) + "</li>"
                + "<li><strong>Time:</strong> " + booking.getBookingSlot().getStartTime().format(DateTimeFormatter.ISO_LOCAL_TIME)+ "</li>"
                + "<li><strong>Number of People:</strong> " + booking.getNumberOfPeople() + "</li>"
                + "</ul>"
                + "<p>Thank you for booking with us! We look forward to serving you.</p>"
                + "<p style='margin-top: 20px; color: #888;'>If you have any questions, please contact us at <a href='mailto:info@example.com'>info@example.com</a>.</p>"
                + "<p>Best regards,<br><strong>" + "DineEase" + "</strong></p>"
                + "</div>";
    }

    private String generateEmailBodyForUpdate(Booking booking, ApplicationUser applicationUser) {
        return "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>"
                + "<h1 style='color:#A020F0;'>Booking Confirmation</h1>"
                + "<p>Dear " + applicationUser.getUsername() + ",</p>"
                + "<p>Your new booking at <strong>" + booking.getRestaurant().getRestaurantName() + "</strong> has been confirmed.</p>"
                + "<h2 style='color:#A020F0;'>Booking Details:</h2>"
                + "<ul style='list-style-type: none; padding: 0;'>"
                +"<li><strong>Reference id:</strong> "+booking.getRestaurant().getRestaurantName()+"-"+booking.getId()+"</li>"
                + "<li><strong>Date:</strong> " + booking.getBookingTime().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM)) + "</li>"
                + "<li><strong>Time:</strong> " + booking.getBookingSlot().getStartTime().format(DateTimeFormatter.ISO_LOCAL_TIME)+ "</li>"
                + "<li><strong>Number of People:</strong> " + booking.getNumberOfPeople() + "</li>"
                + "</ul>"
                + "<p>Thank you for booking with us! We hope you had a good Booking experience with us.</p>"
                + "<p style='margin-top: 20px; color: #888;'>If you have any questions, please contact us at <a href='mailto:info@example.com'>info@example.com</a>.</p>"
                + "<p>Best regards,<br><strong>" + "DineEase" + "</strong></p>"
                + "</div>";
    }



}
