package com.mini_project_6_sem.MiniProject.services;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        // Implementation for sending email
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            javaMailSender.send(message);
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }

    }

    public void sendBookingConfirmation(String toEmail,String subject,String body) throws MessagingException {
        MimeMessage message=javaMailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(message,true);


        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(body,true);

        javaMailSender.send(message);
    }

    public void sendBill(String toEmail, String subject, String body) throws MessagingException {
        MimeMessage message=javaMailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(message, true);


        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(body, true);

        javaMailSender.send(message);
    }

}
