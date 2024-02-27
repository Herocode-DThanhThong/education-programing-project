package com.b2012149.lv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.b2012149.lv.entity.Progress;

public interface ProgressRepository extends JpaRepository<Progress, String> {
	Progress findByCourseIdAndUserId(String courseId, Long userId);
}
