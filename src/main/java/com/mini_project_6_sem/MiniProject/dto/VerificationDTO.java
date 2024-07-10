package com.mini_project_6_sem.MiniProject.dto;

import lombok.Data;

@Data
public class VerificationDTO {
    private String email;
    private String otp;

    public VerificationDTO(String email, String otp) {
        this.email = email;
        this.otp = otp;
    }

//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getOtp() {
//        return otp;
//    }
//
//    public void setOtp(String otp) {
//        this.otp = otp;
//    }
}
