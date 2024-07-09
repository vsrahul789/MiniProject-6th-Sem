package com.mini_project_6_sem.MiniProject.dto;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class StripeChargeDTO {
    private String stripeToken;
    private String username;
    private Integer amount;
    private Boolean isSuccess;
    private String message;
    private String chargeId;
    private Map<String, Object> additionalInfo = new HashMap<>();
}
