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
import com.b2012149.lv.request.ChapterRequest;
import com.b2012149.lv.response.ChapterResponse;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.service.ChapterService;

@RestController
@RequestMapping("/api/chapters")
public class ChapterController {
	private final ChapterService chapterService;

	public ChapterController(ChapterService chapterService) {
		this.chapterService = chapterService;
	}

	@GetMapping
	public ResponseEntity<CustomPageableResponse<ChapterResponse>> getAllChapter(
			@RequestParam(value = "text", defaultValue = "", required = false) String title,
			@RequestParam(value = "page", defaultValue = "0", required = false) int pageNo,
			@RequestParam(value = "size", defaultValue = "10", required = false) int pageSize) {
		return ResponseEntity.ok(chapterService.getAllChapter(title, pageNo, pageSize));
	}

	@GetMapping("/chapter-by-course")
	public ResponseEntity<List<ChapterResponse>> getAllChapterByCourse(
			@RequestParam(value = "courseId", defaultValue = "", required = false) String courseId) {
		return ResponseEntity.ok(chapterService.getAllChapterByCourse(courseId));
	}

	@GetMapping("/all")
	public ResponseEntity<List<ChapterResponse>> getAllChapterNotPagination() {
		return ResponseEntity.ok(chapterService.getAllChapterNotPagination());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ChapterResponse> getChapterDetail(@PathVariable("id") String id) {
		return ResponseEntity.ok(chapterService.getChapterDetail(id));
	}

	@PostMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<ChapterResponse> createChapter(@RequestBody ChapterRequest chapter) {
		return ResponseEntity.ok(chapterService.create(chapter));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<ChapterResponse> updateChapter(@RequestBody ChapterRequest chapter, @PathVariable("id") String id) {
		return ResponseEntity.ok(chapterService.update(chapter, id));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> removeChapter(@PathVariable("id") String id) {
		chapterService.deleteChapterById(id);
		return ResponseEntity.noContent().build();
	}

}
