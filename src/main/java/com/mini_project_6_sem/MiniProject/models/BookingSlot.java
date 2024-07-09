package com.mini_project_6_sem.MiniProject.models;



import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
public class BookingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="slot_id")
    private Long id;

    private LocalTime startTime;
    private LocalTime endTime;
    private int maxTables;


    public BookingSlot() {}

    public BookingSlot(LocalTime startTime, LocalTime endTime, int maxTables) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.maxTables=maxTables;
    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public LocalTime getStartTime() {
//        return startTime;
//    }
//
//    public void setStartTime(LocalTime startTime) {
//        this.startTime = startTime;
//    }
//
//    public LocalTime getEndTime() {
//        return endTime;
//    }
//
//    public void setEndTime(LocalTime endTime) {
//        this.endTime = endTime;
//    }
//
//    public int getMaxTables() {
//        return maxTables;
//    }
//
//    public void setMaxTables(int maxTables) {
//        this.maxTables = maxTables;
//    }

}
