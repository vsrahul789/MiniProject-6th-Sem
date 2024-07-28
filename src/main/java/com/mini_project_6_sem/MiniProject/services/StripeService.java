package com.mini_project_6_sem.MiniProject.services;

import com.mini_project_6_sem.MiniProject.dto.StripeChargeDTO;
import com.mini_project_6_sem.MiniProject.dto.StripeTokenDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Token;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {
    @Value("${api.stripe.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init(){
        Stripe.apiKey = stripeApiKey;
    }

    private static final Logger log = LoggerFactory.getLogger(StripeService.class);

    public StripeTokenDTO createCardToken(StripeTokenDTO model) {
        try {
            Map<String, Object> card = new HashMap<>();
            card.put("number", model.getCardNumber());
            card.put("exp_month", Integer.parseInt(model.getExpiryMonth()));
            card.put("exp_year", Integer.parseInt(model.getExpiryYear()));
            card.put("cvc", model.getCvc());
            Map<String, Object> params = new HashMap<>();
            params.put("card", card);
            Token token = Token.create(params);
            if (token != null && token.getId() != null) {
                model.setIsSuccess(true);
                model.setToken(token.getId());
            }
            return model;
        } catch (StripeException e) {
            log.error("StripeService (createCardToken)", e);
            throw new RuntimeException(e.getMessage());
        }
    }

    public StripeChargeDTO charge(StripeChargeDTO chargeRequest){
        try {
            chargeRequest.setIsSuccess(false);
            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("amount",  (int) (chargeRequest.getAmount()) * 100);
            chargeParams.put("currency", "INR");
            chargeParams.put("description", "Payment for id " + chargeRequest.getAdditionalInfo().getOrDefault("ID_TAG", ""));
            chargeParams.put("source", chargeRequest.getStripeToken());
            Map<String, Object> metaData = new HashMap<>();
            metaData.put("id", chargeRequest.getChargeId());
            metaData.putAll(chargeRequest.getAdditionalInfo());
            chargeParams.put("metadata", metaData);
            Charge charge = Charge.create(chargeParams);
            chargeRequest.setMessage(charge.getOutcome().getSellerMessage());

            if (charge.getPaid()) {
                chargeRequest.setChargeId(charge.getId());
                chargeRequest.setIsSuccess(true);
            }
            return chargeRequest;
        } catch (StripeException e) {
            log.error("StripeService (charge)", e);
            throw new RuntimeException(e.getMessage());
        }
    }

}
