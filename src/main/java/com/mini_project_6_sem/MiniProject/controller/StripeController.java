package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.dto.FoodCartDTO;
import com.mini_project_6_sem.MiniProject.dto.StripeChargeDTO;
import com.mini_project_6_sem.MiniProject.dto.StripeTokenDTO;
import com.mini_project_6_sem.MiniProject.models.ApplicationUser;
import com.mini_project_6_sem.MiniProject.models.FoodCart;
import com.mini_project_6_sem.MiniProject.repository.UserRepository;
import com.mini_project_6_sem.MiniProject.services.FoodCartService;
import com.mini_project_6_sem.MiniProject.services.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/stripe")
@CrossOrigin("*")
public class StripeController {


    private final StripeService stripeService;

    @Autowired
    private FoodCartService foodCartService;
    @Autowired
    private UserRepository userRepository;

    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/card/token")
    @ResponseBody
    public StripeTokenDTO createCardToken(@RequestBody StripeTokenDTO model) {
        return this.stripeService.createCardToken(model);
    }

    @PostMapping("/charge")
    @ResponseBody
    public StripeChargeDTO charge(@RequestBody StripeChargeDTO chargeRequest) {
        StripeChargeDTO status = this.stripeService.charge(chargeRequest);
        String username = status.getUsername();
        Optional<ApplicationUser> applicationUser = userRepository.findByUsername(username);
        foodCartService.confirmPayment(foodCartService.getCart(applicationUser.get().getUsername()), applicationUser.get());
        return status;
    }
}
