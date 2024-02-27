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
import com.b2012149.lv.entity.StudyRoute;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.CourseRepository;
import com.b2012149.lv.repository.StudyRouteRepository;
import com.b2012149.lv.response.CustomPageableResponse;
import org.springframework.data.domain.Sort;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class StudyRouteService {
	private final Logger log = LoggerFactory.getLogger(StudyRouteService.class);

	private final StudyRouteRepository studyRouteRepository;

	public StudyRouteService(StudyRouteRepository studyRouteRepository) {
		this.studyRouteRepository = studyRouteRepository;
	}

	public StudyRoute create(StudyRoute studyRoute) {
		StudyRoute nStudyRoute = new StudyRoute();
		nStudyRoute.setTitle(studyRoute.getTitle());
		nStudyRoute.setDescription(studyRoute.getDescription());

		return studyRouteRepository.save(nStudyRoute);

	}

	public StudyRoute update(StudyRoute studyRoute, String studyRouteId) {
		StudyRoute existingStudyRoute = studyRouteRepository.findById(studyRouteId)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Lộ trình học không tồn tại"));

		existingStudyRoute.setTitle(studyRoute.getTitle());
		existingStudyRoute.setDescription(studyRoute.getDescription());

		return existingStudyRoute;
	}

	public CustomPageableResponse<StudyRoute> getAllStudyRoute(String title, int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
		if (!title.equals("")) {
			pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "created_date"));
			return new CustomPageableResponse<StudyRoute>(
					studyRouteRepository.searchStudyRouteByTitle(title, pageable));
		}
		return new CustomPageableResponse<StudyRoute>(studyRouteRepository.findAll(pageable));
	}

	public List<StudyRoute> getAllStudyRouteNotPagination() {
		return studyRouteRepository.findAll();
	}

	public StudyRoute getStudyRouteDetail(String id) {
		StudyRoute studyRoute = studyRouteRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Khóa học không tồn tại với ID: " + id));
		return studyRoute;
	}

	public void deleteStudyRouteById(String id) {
		StudyRoute studyRoute = studyRouteRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Lộ trình học không tồn tại với ID: " + id));
		studyRouteRepository.deleteById(id);
	}

	public Long getTotalStudyRoute() {
		return studyRouteRepository.count();
	}
}
