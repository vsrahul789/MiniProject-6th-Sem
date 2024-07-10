package com.mini_project_6_sem.MiniProject.controller;

import com.mini_project_6_sem.MiniProject.dto.StripeChargeDTO;
import com.mini_project_6_sem.MiniProject.dto.StripeTokenDTO;
import com.mini_project_6_sem.MiniProject.services.StripeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stripe")
@CrossOrigin("*")
public class StripeController {

    private final StripeService stripeService;

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
        return this.stripeService.charge(chargeRequest);
    }
}
