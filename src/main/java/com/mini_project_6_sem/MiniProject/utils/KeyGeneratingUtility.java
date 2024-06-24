package com.mini_project_6_sem.MiniProject.utils;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

public class KeyGeneratingUtility {
    public static KeyPair generateRsaKey(){
        KeyPair keyPair;
        try{
            KeyPairGenerator  keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        }catch(Exception e){
            throw  new IllegalStateException(e);
        }
        return keyPair;
    }
}
