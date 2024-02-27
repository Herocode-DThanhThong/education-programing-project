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
import com.b2012149.lv.entity.Lesson;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.ChapterRepository;
import com.b2012149.lv.repository.CourseRepository;
import com.b2012149.lv.repository.LessonRepository;
import com.b2012149.lv.request.LessonRequest;
import com.b2012149.lv.response.ChapterResponse;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.response.LessonResponse;
import com.b2012149.lv.service.dto.ChapterDTO;

import org.springframework.data.domain.Sort;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class LessonService {
	private final Logger log = LoggerFactory.getLogger(LessonService.class);

	private final LessonRepository lessonRepository;
	private final ModelMapper modelMapper;
	private final ChapterRepository chapterRepository;

	public LessonService(LessonRepository lessonRepository, ChapterRepository chapterRepository,
			ModelMapper modelMapper) {
		this.lessonRepository = lessonRepository;
		this.chapterRepository = chapterRepository;
		this.modelMapper = modelMapper;
	}

	public LessonResponse create(LessonRequest lesson) {
		Lesson nLesson = new Lesson();
		Chapter chapter = chapterRepository.findById(lesson.getChapter().getId())
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Chương học không tồn tại!"));

		nLesson.setTitle(lesson.getTitle());
		nLesson.setVideoId(lesson.getVideoId());
		nLesson.setContent(lesson.getContent());
		nLesson.setType(lesson.getType());
		nLesson.setChapter(chapter);
		nLesson.setTotalQuestion(lesson.getTotalQuestion());
		nLesson.setAnswerKeys(lesson.getAnswerKeys());
		
		return convertToLessonResponse(lessonRepository.save(nLesson));
	}

	public LessonResponse update(LessonRequest lesson, String lessonId) {
		Lesson existingLesson = lessonRepository.findById(lessonId)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Bài học không tồn tại!"));
		Chapter chapter = chapterRepository.findById(lesson.getChapter().getId())
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Chương học không tồn tại!"));

		existingLesson.setTitle(lesson.getTitle());
		existingLesson.setVideoId(lesson.getVideoId());
		existingLesson.setContent(lesson.getContent());
		existingLesson.setType(lesson.getType());
		existingLesson.setChapter(chapter);
		existingLesson.setTotalQuestion(lesson.getTotalQuestion());
		existingLesson.setAnswerKeys(lesson.getAnswerKeys());

		return convertToLessonResponse(lessonRepository.save(existingLesson));
	}

	public CustomPageableResponse<LessonResponse> getAllLesson(String title, int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
		if (!title.equals("")) {
			pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "created_date"));
			Page<Lesson> dataLessonPage = lessonRepository.searchLessonByTitle(title, pageable);
			List<LessonResponse> lLessonResponseSearch = convertToResponseList(dataLessonPage.getContent());
			return new CustomPageableResponse<LessonResponse>(lLessonResponseSearch, pageable,
					dataLessonPage.getTotalElements());
		}
		List<LessonResponse> lAllLessonResponse = convertToResponseList(
				lessonRepository.findAll(pageable).getContent());
		return new CustomPageableResponse<LessonResponse>(lAllLessonResponse, pageable,
				lessonRepository.findAll(pageable).getTotalElements());
	}

	public LessonResponse getLessonDetail(String id) {
		Lesson lesson = lessonRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Bài học không tồn tại với ID: " + id));
		return convertToLessonResponse(lesson);
	}

	public void deleteLessonById(String id) {
		Lesson lesson = lessonRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Bài học không tồn tại với ID: " + id));
		lessonRepository.deleteById(id);
	}

	public List<LessonResponse> getAllLessonByChapter(String id) {
		List<Lesson> lesson = lessonRepository.findByChapterId(id);
		return convertToResponseList(lesson);
	}

	private LessonResponse convertToLessonResponse(Lesson lesson) {
		LessonResponse lessonResponse = modelMapper.map(lesson, LessonResponse.class);
		return lessonResponse;
	}

	private List<LessonResponse> convertToResponseList(List<Lesson> lessons) {
		List<LessonResponse> lessonResponses = new ArrayList<LessonResponse>();
		Iterator<Lesson> iter = lessons.iterator();
		while (iter.hasNext()) {
			lessonResponses.add(convertToLessonResponse(iter.next()));
		}
		return lessonResponses;
	}
}
