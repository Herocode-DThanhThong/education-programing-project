package com.b2012149.lv.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.b2012149.lv.entity.Course;
import com.b2012149.lv.entity.Progress;
import com.b2012149.lv.entity.StudyRoute;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.CourseRepository;
import com.b2012149.lv.repository.ProgressRepository;
import com.b2012149.lv.repository.StudyRouteRepository;
import com.b2012149.lv.repository.UserRepository;
import com.b2012149.lv.response.CustomPageableResponse;
import org.springframework.data.domain.Sort;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class ProgressService {
	private final Logger log = LoggerFactory.getLogger(ProgressService.class);

	private final ProgressRepository progressRepository;
	private final UserRepository userRepository;

	public ProgressService(ProgressRepository progressRepository, UserRepository userRepository) {
		this.progressRepository = progressRepository;
		this.userRepository = userRepository;
	}

	public Progress create(Progress progress, Long userId) {
		Progress nProgress = new Progress();
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Người dùng không tồn tại khi tạo tiến trình"));

		nProgress.setCourseId(progress.getCourseId());
		nProgress.setUser(user);
		nProgress.setDone(false);

		return progressRepository.save(nProgress);

	}

	public Progress update(Progress progress, String courseId, Long userId) {
		Progress existingProgress = getProgressDetailByCourseId(courseId, userId);
		existingProgress.setCurrentNumberLesson(progress.getCurrentNumberLesson());
		existingProgress.setCourseId(progress.getCourseId());
		existingProgress.setDone(progress.getDone());
	
		return existingProgress;
	}

	public Progress getProgressDetailByCourseId(String courseId, Long userId) {
		Progress progress = progressRepository.findByCourseIdAndUserId(courseId, userId);
		if (progress == null)
			throw new ApiException(HttpStatus.BAD_REQUEST, "Tiến trình học không tồn tại");
		return progress;
	}

	public void deleteProgressById(String id) {
		Progress progress = progressRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Tiến trình học không tồn tại với ID: " + id));
		progressRepository.deleteById(id);
	}
}
