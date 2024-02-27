package com.b2012149.lv.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.Course;
import com.b2012149.lv.entity.StudyRoute;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.service.CourseService;
import com.b2012149.lv.service.StudyRouteService;

@RestController
@RequestMapping("/api/study/route")
public class StudyRouteController {
	private final StudyRouteService studyRouteService;

	public StudyRouteController(StudyRouteService studyRouteService) {
		this.studyRouteService = studyRouteService;
	}

	@GetMapping
	public ResponseEntity<CustomPageableResponse<StudyRoute>> getAllStudyRoute(
			@RequestParam(value = "text", defaultValue = "", required = false) String title,
			@RequestParam(value = "page", defaultValue = "0", required = false) int pageNo,
			@RequestParam(value = "size", defaultValue = "6", required = false) int pageSize) {
		return ResponseEntity.ok(studyRouteService.getAllStudyRoute(title, pageNo, pageSize));
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<StudyRoute>> getAllStudyRouteNotPagination() {
		return ResponseEntity.ok(studyRouteService.getAllStudyRouteNotPagination());
	}

	@GetMapping("/{id}")
	public ResponseEntity<StudyRoute> getStudyRouteDetail(@PathVariable("id") String id) {
		return ResponseEntity.ok(studyRouteService.getStudyRouteDetail(id));
	}

	@PostMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<StudyRoute> createStudyRoute(@RequestBody StudyRoute studyRoute) {
		return ResponseEntity.ok(studyRouteService.create(studyRoute));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<StudyRoute> updateStudyRoute(@RequestBody StudyRoute studyRoute, @PathVariable("id") String id) {
		return ResponseEntity.ok(studyRouteService.update(studyRoute, id));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> removeStudyRoute(@PathVariable("id") String id) {
		studyRouteService.deleteStudyRouteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/total")
	public ResponseEntity<Long> getTotalStudyRoute() {
		return ResponseEntity.ok(studyRouteService.getTotalStudyRoute());
	}

}
