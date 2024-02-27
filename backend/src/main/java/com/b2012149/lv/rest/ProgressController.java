package com.b2012149.lv.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.Progress;
import com.b2012149.lv.security.JwtTokenProvider;
import com.b2012149.lv.service.ProgressService;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
	private final ProgressService progressService;
	private final JwtTokenProvider jwtTokenProvider;

	public ProgressController(ProgressService progressService, JwtTokenProvider jwtService) {
		this.progressService = progressService;
		this.jwtTokenProvider = jwtService;
	}

	@GetMapping("/{courseId}")
	public ResponseEntity<Progress> getProgressCourse(@PathVariable("courseId") String courseId,
			HttpServletRequest request) {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String accessToken = authHeader.substring(7);
		Long userId = jwtTokenProvider.getUserIdFromJWT(accessToken);

		return ResponseEntity.ok(progressService.getProgressDetailByCourseId(courseId, userId));
	}

	@PostMapping
	public ResponseEntity<Progress> createProgressCourse(@RequestBody Progress progress, HttpServletRequest request) {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String accessToken = authHeader.substring(7);
		Long userId = jwtTokenProvider.getUserIdFromJWT(accessToken);

		return ResponseEntity.ok(progressService.create(progress, userId));
	}

	@PutMapping("/{courseId}")
	public ResponseEntity<Progress> updateProgressCourse(@PathVariable("courseId") String courseId,
			@RequestBody Progress progress, HttpServletRequest request) {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String accessToken = authHeader.substring(7);
		Long userId = jwtTokenProvider.getUserIdFromJWT(accessToken);

		return ResponseEntity.ok(progressService.update(progress, courseId, userId));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removeProgressCourse(@PathVariable("id") String id) {
		progressService.deleteProgressById(id);
		return ResponseEntity.noContent().build();
	}
}
