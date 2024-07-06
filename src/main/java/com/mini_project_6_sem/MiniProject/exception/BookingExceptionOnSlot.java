package com.mini_project_6_sem.MiniProject.exception;
public class BookingExceptionOnSlot extends RuntimeException{
public static class BookingSlotException extends RuntimeException {
    public BookingSlotException(String message) {
        super(message);
    }
}
    public static class BookingSlotNotFoundException extends BookingSlotException {
        public BookingSlotNotFoundException(String message) {
            super(message);
        }
    }

    public static class BookingSlotFullException extends BookingSlotException {
        public BookingSlotFullException(String message) {
            super(message);
        }
    }
}