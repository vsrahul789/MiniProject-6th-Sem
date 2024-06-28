package com.mini_project_6_sem.MiniProject.dto;


import com.mini_project_6_sem.MiniProject.utils.FoodType;

public class RegistrationDTO {
    private String username;
    private String password;
    private Integer age;
    private String  email;
    private Enum<FoodType> preferredCuisine;

    public Integer getAge() {
        return this.age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Enum<FoodType> getPreferredCuisine() {
        return this.preferredCuisine;
    }

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

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String toString(){
        return "Registration info: username: " + this.username + " password: " + this.password;
    }
}
