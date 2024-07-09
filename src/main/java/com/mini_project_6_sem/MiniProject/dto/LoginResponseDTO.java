package com.mini_project_6_sem.MiniProject.dto;

import com.mini_project_6_sem.MiniProject.models.ApplicationAdmin;
import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import lombok.Data;

@Data
public class LoginResponseDTO {
    private ApplicationUser user;
    private ApplicationAdmin admin;
    private String jwt;

    public LoginResponseDTO() {
        super();
    }
    public LoginResponseDTO(ApplicationUser user, String jwt) {
        this.user = user;
        this.jwt = jwt;
    }

    public LoginResponseDTO(ApplicationAdmin admin, String jwt) {
        this.admin = admin;
        this.jwt = jwt;
    }

//    public ApplicationAdmin getAdmin() {
//        return this.admin;
//    }
//
//    public void setAdmin(ApplicationAdmin admin) {
//        this.admin = admin;
//    }
//
//    public ApplicationUser getUser() {
//        return this.user;
//    }
//
//    public void setUser(ApplicationUser user) {
//        this.user = user;
//    }
//
//    public String getJwt() {
//        return this.jwt;
//    }
//
//    public void setJwt(String jwt) {
//        this.jwt = jwt;
//    }
}
