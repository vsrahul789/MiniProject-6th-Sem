package com.mini_project_6_sem.MiniProject.exception;

public class BookingRestException extends RuntimeException {

    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public static class RestaurantNotFoundException extends RuntimeException {
        public RestaurantNotFoundException(String message) {
            super(message);
        }
    }

    public static class BookingException extends RuntimeException {
        public BookingException(String message) {
            super(message);
        }
    }
}
