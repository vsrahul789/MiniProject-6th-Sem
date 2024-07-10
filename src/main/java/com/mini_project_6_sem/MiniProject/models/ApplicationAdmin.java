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
@Table(name = "admin")
public class ApplicationAdmin implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "admin_id")
    private Integer userId;
    @Column(unique = true, nullable = false)
    private String username;
    private String password;
    @Column(unique = true, nullable = false)
    private String email;
    private Integer age;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="admin_role_junction",
            joinColumns = {@JoinColumn(name="admin_id")},
            inverseJoinColumns = {@JoinColumn(name="role_id")}
    )

    private Set<Role> authorities;

    public ApplicationAdmin() {
        super();
        this.authorities = new HashSet<Role>();
    }

    public ApplicationAdmin(Integer userId,
                            String username,
                            String password,
                            Set<Role> authorities,
                            Integer age,
                            String email) {
        super();
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.authorities = authorities;
    }


//    public Integer getUserId() {
//        return this.userId;
//    }
//
//    public void setUserId(Integer userId) {
//        this.userId = userId;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
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
//    public Integer getAge() {
//        return this.age;
//    }
//
//    public void setAge(Integer age) {
//        this.age = age;
//    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
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
}
