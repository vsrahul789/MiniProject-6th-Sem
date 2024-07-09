package com.mini_project_6_sem.MiniProject.models;

import com.mini_project_6_sem.MiniProject.utils.FoodType;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
public class ApplicationUser implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Integer userId;
    @Column(unique = true, nullable = false)
    private String username;
    private String password;
    private Integer age;
    @Column(unique = true, nullable = false)
    private String email;
    private String preferredCuisine;
    private Boolean verified;
    private String otp;

    @ManyToMany(fetch = FetchType.EAGER) // the fetch type is eager so that when the user is loaded, the roles are also loaded
    @JoinTable(
            name="user_role_junction",
            joinColumns = {@JoinColumn(name="user_id")},
            inverseJoinColumns = {@JoinColumn(name="role_id")}
    )

    private Set<Role> authorities;
    public ApplicationUser(){
        super();
        this.authorities = new HashSet<Role>();
    }
    public ApplicationUser(Integer userId,
                           String username,
                           String password,
                           Set<Role> authorities,
                           Integer age,
                           String email,
                           String preferredCuisine){
        super();
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.age = age;
        this.email = email;
        this.preferredCuisine = preferredCuisine;
    }



    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
//    public void setAuthorities(Set<Role> authorities) {
//        this.authorities = authorities;
//    }
//
//    //    Getters and Setters
//    public Integer getUserId() {
//        return this.userId;
//    }
//
//    public void setUserId(Integer userId) {
//        this.userId = userId;
//    }
//
//    public String getUsername() {
//        return this.username;
//    }
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return List.of();
//    }
//
//    public String getPassword() {
//        return this.password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//    public Integer getAge() {
//        return this.age;
//    }
//
//    public void setAge(Integer age) {
//        this.age = age;
//    }
//
//    public String getEmail() {
//        return this.email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPreferred_cuisine() {
//        return this.preferredCuisine;
//    }
//
//    public void setPreferredCuisine(Enum<FoodType> preferredCuisine) {
//        this.preferredCuisine = String.valueOf(preferredCuisine);
//    }
//
//    public String getOtp() {
//        return otp;
//    }
//
//    public void setOtp(String otp) {
//        this.otp = otp;
//    }
//
//    public Boolean getVerified() {
//        return verified;
//    }
//
//    public void setVerified(Boolean verified) {
//        this.verified = verified;
//    }

}
