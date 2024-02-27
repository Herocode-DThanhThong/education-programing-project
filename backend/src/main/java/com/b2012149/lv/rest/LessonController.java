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

import com.b2012149.lv.entity.Chapter;
import com.b2012149.lv.entity.Lesson;
import com.b2012149.lv.request.LessonRequest;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.response.LessonResponse;
import com.b2012149.lv.service.ChapterService;
import com.b2012149.lv.service.LessonService;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {
	private final LessonService lessonService;

	public LessonController(LessonService lessonService) {
		this.lessonService = lessonService;
	}

	@GetMapping
	public ResponseEntity<CustomPageableResponse<LessonResponse>> getAllLesson(
			@RequestParam(value = "text", defaultValue = "", required = false) String title,
			@RequestParam(value = "page", defaultValue = "0", required = false) int pageNo,
			@RequestParam(value = "size", defaultValue = "10", required = false) int pageSize) {
		return ResponseEntity.ok(lessonService.getAllLesson(title, pageNo, pageSize));
	}
	
	@GetMapping("/lesson-by-chapter")
	public ResponseEntity<List<LessonResponse>> getAllLessonByChapter(
			@RequestParam(value = "chapterId", defaultValue = "", required = false) String chapterId
	) {
		return ResponseEntity.ok(lessonService.getAllLessonByChapter(chapterId));
	}

	@GetMapping("/{id}")
	public ResponseEntity<LessonResponse> getLessonDetail(@PathVariable("id") String id) {
		return ResponseEntity.ok(lessonService.getLessonDetail(id));
	}

	@PostMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<LessonResponse> createLesson(@RequestBody LessonRequest lesson) {
		return ResponseEntity.ok(lessonService.create(lesson));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<LessonResponse> updateLesson(@RequestBody LessonRequest lesson, @PathVariable("id") String id) {
		return ResponseEntity.ok(lessonService.update(lesson, id));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> removeLesson(@PathVariable("id") String id) {
		lessonService.deleteLessonById(id);
		return ResponseEntity.noContent().build();
	}

}
