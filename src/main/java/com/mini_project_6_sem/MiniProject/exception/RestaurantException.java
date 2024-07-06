package com.mini_project_6_sem.MiniProject.exception;

public class RestaurantException extends RuntimeException{

    public static class RestaurantValidationException extends RuntimeException {
        public RestaurantValidationException(String message) {
            super(message);
        }
    }

    public static class RestaurantNotFoundException extends RuntimeException {
        public RestaurantNotFoundException(String message) {
            super(message);
        }
    }

}
