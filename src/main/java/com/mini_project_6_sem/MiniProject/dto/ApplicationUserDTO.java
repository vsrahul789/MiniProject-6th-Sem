package com.mini_project_6_sem.MiniProject.dto;

import lombok.Data;

@Data
public class ApplicationUserDTO {
    private Integer userId;
    private String username;
    private String email;

    public ApplicationUserDTO(Integer userId, String username,String email) {
        this.userId = userId;
        this.username = username;
        this.email=email;
    }

//    public ApplicationUserDTO(String username){
//        this.username=username;
//    }
//
//    public Integer getId() {
//        return userId;
//    }
//
//    public void setId(Integer id) {
//        this.userId = id;
//    }
//
//    public String getName() {
//        return username;
//    }
//
//    public void setName(String name) {
//        this.username = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
}
