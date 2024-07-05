package com.mini_project_6_sem.MiniProject.controller;



import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
public class UserController {

    //Users can only get restaurants by name,id or location
    @GetMapping("/")
    public String user() {
        return "User Access Level";
    }
}


