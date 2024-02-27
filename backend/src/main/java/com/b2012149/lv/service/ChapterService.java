package com.b2012149.lv.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2012149.lv.entity.Chapter;
import com.b2012149.lv.entity.Course;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.ChapterRepository;
import com.b2012149.lv.request.ChapterRequest;
import com.b2012149.lv.response.ChapterResponse;
import com.b2012149.lv.response.CustomPageableResponse;
import org.springframework.data.domain.Sort;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class ChapterService {
	private final Logger log = LoggerFactory.getLogger(ChapterService.class);

	private final ChapterRepository chapterRepository;
	private final CourseService courseService;
	private final ModelMapper modelMapper;

	public ChapterService(ChapterRepository chapterRepository, CourseService courseService, ModelMapper modelMapper) {
		this.chapterRepository = chapterRepository;
		this.courseService = courseService;
		this.modelMapper = modelMapper;
	}

	public ChapterResponse create(ChapterRequest chapter) {
		Chapter nChapter = new Chapter();
		Course course = courseService.getCourseDetail(chapter.getCourse().getId());

		nChapter.setTitle(chapter.getTitle());
		nChapter.setCourse(course);

		return convertToChapterResponse(chapterRepository.save(nChapter));
	}

	public ChapterResponse update(ChapterRequest chapter, String chapterId) {
		Chapter existingChapter = chapterRepository.findById(chapterId)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Chương học không tồn tại!"));
		Course course = courseService.getCourseDetail(chapter.getCourse().getId());

		existingChapter.setTitle(chapter.getTitle());
		existingChapter.setCourse(course);

		return convertToChapterResponse(chapterRepository.save(existingChapter));
	}

	public CustomPageableResponse<ChapterResponse> getAllChapter(String title, int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
		if (!title.equals("")) {
			pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "created_date"));
			Page<Chapter> dataChapterPage = chapterRepository.searchChapterByTitle(title, pageable);
			List<ChapterResponse> lChapterResponseSearch = convertToChapterResponseList(dataChapterPage.getContent());
			return new CustomPageableResponse<ChapterResponse>(lChapterResponseSearch, pageable,
					dataChapterPage.getTotalElements());
		}
		List<ChapterResponse> lAllChapterResponse = convertToChapterResponseList(
				chapterRepository.findAll(pageable).getContent());
		return new CustomPageableResponse<ChapterResponse>(lAllChapterResponse, pageable,
				chapterRepository.findAll(pageable).getTotalElements());
	}

	public ChapterResponse getChapterDetail(String id) {
		Chapter chapter = chapterRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Chương học không tồn tại với id: " + id));
		return convertToChapterResponse(chapterRepository.save(chapter));
	}

	public void deleteChapterById(String id) {
		Chapter chapter = chapterRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Chương học không tồn tại với id: " + id));
		chapterRepository.deleteById(id);
	}

	public List<ChapterResponse> getAllChapterNotPagination() {
		return convertToChapterResponseList(chapterRepository.findAll());
	}

	public List<ChapterResponse> getAllChapterByCourse(String courseId) {
		List<Chapter> chapters = chapterRepository.findByCourseIdOrderByCreatedDate(courseId);
		return convertToChapterResponseList(chapters);
	}

	private ChapterResponse convertToChapterResponse(Chapter chapter) {
		ChapterResponse chapterResponse = modelMapper.map(chapter, ChapterResponse.class);
		return chapterResponse;
	}

	private List<ChapterResponse> convertToChapterResponseList(List<Chapter> chapters) {
		List<ChapterResponse> chapterResponses = new ArrayList<ChapterResponse>();
		Iterator<Chapter> iter = chapters.iterator();
		while (iter.hasNext()) {
			chapterResponses.add(convertToChapterResponse(iter.next()));
		}
		return chapterResponses;
	}
}
