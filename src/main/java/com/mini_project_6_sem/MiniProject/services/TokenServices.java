package com.mini_project_6_sem.MiniProject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class TokenServices {
    @Autowired
    private JwtEncoder  jwtEncoder;
    @Autowired
    private JwtDecoder  jwtDecoder;

    public String generateJwt(Authentication auth){
        Instant now = Instant.now();

        /*
         * this will go into getAuthorities and checks weather the user has the role of admin
         * if yes then it will add the scope of admin
         * if not then it will add the scope of user
         */
        String scope = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .subject(auth.getName())
                .expiresAt(now.plusSeconds(3600))
                .claim("roles",  scope)
                .build();


        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue() ;
    }
}


