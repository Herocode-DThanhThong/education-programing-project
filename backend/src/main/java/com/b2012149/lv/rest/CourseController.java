package com.b2012149.lv.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
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
import com.b2012149.lv.entity.Post;
import com.b2012149.lv.request.LikeRequest;
import com.b2012149.lv.request.RegisterCourseRequest;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.security.JwtTokenProvider;
import com.b2012149.lv.service.CourseService;
import com.b2012149.lv.service.dto.StatisticCourseDTO;
import com.b2012149.lv.service.dto.TotalCourseByUserDTO;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
	private final CourseService courseService;
	private final JwtTokenProvider jwtTokenProvider;
	
	public CourseController(CourseService courseService, JwtTokenProvider jwtService) {
		this.courseService = courseService;
		this.jwtTokenProvider = jwtService;
	}

	@GetMapping
	public ResponseEntity<CustomPageableResponse<Course>> getAllCourse(
			@RequestParam(value = "text", defaultValue = "", required = false) String title,
			@RequestParam(value = "page", defaultValue = "0", required = false) int pageNo,
			@RequestParam(value = "size", defaultValue = "6", required = false) int pageSize) {
		return ResponseEntity.ok(courseService.getAllCourse(title, pageNo, pageSize));
	}
	
	@GetMapping("/total")
	public ResponseEntity<Long> getTotalCourse() {
		return ResponseEntity.ok(courseService.getTotalCourse());
	}

	@GetMapping("/all")
	public ResponseEntity<List<Course>> getAllCourseNotPagination(
			@RequestParam(value = "text", defaultValue = "", required = false) String title) {
		return ResponseEntity.ok(courseService.getAllCourseNotPagination(title));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Course> getCourseDetail(@PathVariable("id") String id) {
		return ResponseEntity.ok(courseService.getCourseDetail(id));
	}
	
	@GetMapping("/my-course")
	public ResponseEntity<List<Course>> getCourseDetail(HttpServletRequest request) {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String accessToken = authHeader.substring(7);
		Long userId = jwtTokenProvider.getUserIdFromJWT(accessToken);
		
		return ResponseEntity.ok(courseService.getMyCourse(userId));
	}
	
	@GetMapping("/total-by-user")
	public ResponseEntity<List<TotalCourseByUserDTO>> getTotalCourseByUser() {
		return ResponseEntity.ok(courseService.getTotalByUser());
	}
	
	@GetMapping("/statistic-course")
	public ResponseEntity<List<StatisticCourseDTO>> getStatisticCourse() {
		return ResponseEntity.ok(courseService.getStatisticCourse());
	}
	
	@GetMapping("/hash-tag")
	public ResponseEntity<List<String>> getAllHashTagNotPagination() {
		return ResponseEntity.ok(courseService.getAllHashtagPagination());
	}

	@PostMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Course> createCourse(@RequestBody Course course) {
		return ResponseEntity.ok(courseService.create(course));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Course> updateCourse(@RequestBody Course course, @PathVariable("id") String id) {
		return ResponseEntity.ok(courseService.update(course, id));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> removeCourse(@PathVariable("id") String id) {
		courseService.deleteCourseById(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/register")
	public ResponseEntity<Course> registerCourse(@RequestBody RegisterCourseRequest registerCourseRequest) {
		return ResponseEntity.ok(courseService.registerCourse(registerCourseRequest));
	}

}
