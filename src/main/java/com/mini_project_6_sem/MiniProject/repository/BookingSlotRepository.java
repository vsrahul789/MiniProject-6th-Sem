package com.mini_project_6_sem.MiniProject.repository;



import com.mini_project_6_sem.MiniProject.models.BookingSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
    public interface BookingSlotRepository extends JpaRepository<BookingSlot, Long> {
        List<BookingSlot> findByStartTimeBetween(LocalDateTime startTime, LocalDateTime endTime);
    }

