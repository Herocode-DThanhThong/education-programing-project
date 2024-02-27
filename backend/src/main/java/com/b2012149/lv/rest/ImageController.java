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
import com.b2012149.lv.request.ImageRequest;
import com.b2012149.lv.response.ChapterResponse;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.service.ChapterService;
import com.b2012149.lv.service.ImageService;

@RestController
@RequestMapping("/api/images")
public class ImageController {
	private final ImageService imageService;

	public ImageController(ImageService imageService) {
		this.imageService = imageService;
	}

	@PostMapping
	public ResponseEntity<?> createImage(@RequestBody ImageRequest imageRequest) {
		imageService.create(imageRequest);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping
	public ResponseEntity<?> deleteImages(@RequestBody List<String> imageIds) {
		imageService.deleteByIds(imageIds);
		return ResponseEntity.noContent().build();
	}
}
