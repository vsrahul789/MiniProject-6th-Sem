package com.mini_project_6_sem.MiniProject.dto;

import lombok.Data;


@Data
public class StripeTokenDTO {
    private String cardNumber;
    private String expiryMonth;
    private String expiryYear;
    private String cvc;
    private String token;
    private String username;
    private Boolean isSuccess;
}
