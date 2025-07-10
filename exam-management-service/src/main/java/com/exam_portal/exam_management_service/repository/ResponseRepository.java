package com.exam_portal.exam_management_service.repository;

import com.exam_portal.exam_management_service.model.Response;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResponseRepository extends JpaRepository<Response, Long> {
    List<Response> findByExamIdAndUserId(Long examId, Long userId);
}
