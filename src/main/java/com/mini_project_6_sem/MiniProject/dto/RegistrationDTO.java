package com.mini_project_6_sem.MiniProject.dto;


import com.mini_project_6_sem.MiniProject.utils.FoodType;
import lombok.Data;

@Data
public class RegistrationDTO {
    private String username;
    private String password;
    private Integer age;
    private String  email;
    private Enum<FoodType> preferredCuisine;

    public void setPreferredCuisine(FoodType preferredCuisine) {
        this.preferredCuisine = preferredCuisine;
    }

    public RegistrationDTO() {
        super();
    }
    public RegistrationDTO(String username, String password, Integer age, String email,FoodType preferredCuisine) {
        this.username = username;
        this.password = password;
        this.age = age;
        this.email = email;
        this.preferredCuisine = preferredCuisine;
    }

    public String toString(){
        return "Registration info: username: " + this.username + " password: " + this.password;
    }
}
