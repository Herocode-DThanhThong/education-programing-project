package com.b2012149.lv.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2012149.lv.entity.Chapter;
import com.b2012149.lv.entity.Course;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.CourseRepository;
import com.b2012149.lv.request.RegisterCourseRequest;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.service.dto.AdminUserDTO;
import com.b2012149.lv.service.dto.CourseDTO;
import com.b2012149.lv.service.dto.StatisticCourseDTO;
import com.b2012149.lv.service.dto.TotalCourseByUserDTO;

import org.springframework.data.domain.Sort;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class CourseService {
	private final Logger log = LoggerFactory.getLogger(CourseService.class);

	private final CourseRepository courseRepository;
	private final ModelMapper modelMapper;
	private final UserService userService;

	public CourseService(CourseRepository courseRepository, UserService userService, ModelMapper modelMapper) {
		this.courseRepository = courseRepository;
		this.userService = userService;
		this.modelMapper = modelMapper;
	}

	public Course create(Course course) {
		Course nCourse = new Course();
		nCourse.setTitle(course.getTitle());
		nCourse.setDescription(course.getDescription());
		nCourse.setImage(course.getImage());
		nCourse.setHashTag(course.getHashTag());
		return courseRepository.save(nCourse);

	}

	public Course update(Course course, String courseId) {
		Course existingCourse = courseRepository.findById(courseId)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Khóa học không tồn tại!"));

		existingCourse.setTitle(course.getTitle());
		existingCourse.setDescription(course.getDescription());
		existingCourse.setImage(course.getImage());
		existingCourse.setHashTag(course.getHashTag());

		return existingCourse;
	}

	public CustomPageableResponse<Course> getAllCourse(String title, int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdDate"));
		if (!title.equals("")) {
			pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "created_date"));
			return new CustomPageableResponse<Course>(courseRepository.searchCourseByTitle(title, pageable));
		}
		return new CustomPageableResponse<Course>(courseRepository.findAll(pageable));
	}

	public List<Course> getAllCourseNotPagination(String title) {
		if (!title.equals("")) {
			return courseRepository.searchCourseByTitle(title);
		}
		return courseRepository.findAllByOrderByCreatedDateDesc();
	}
	
	public List<String> getAllHashtagPagination() {
		List<String> hashTags = new ArrayList<String>();
		List<Course> courses = courseRepository.findAll();
		Iterator<Course> iter = courses.iterator();
		while (iter.hasNext()) {
			hashTags.add(iter.next().getHashTag());
		}
		return hashTags;
	}

	public Course getCourseDetail(String id) {
		Course course = courseRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Khóa học không tồn tại với ID: " + id));
		return course;
	}

	public void deleteCourseById(String id) {
		Course course = courseRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Khóa học không tồn tại với ID: " + id));
		courseRepository.deleteById(id);
	}

	public Course registerCourse(RegisterCourseRequest registerCourseRequest) {
		Course course = getCourseDetail(registerCourseRequest.getCourse().getId());
		User registeredUser = userService.getUserByUsername(registerCourseRequest.getUser().getUserName());
		course.getRegisteredUser().add(registeredUser);
		return courseRepository.save(course);
	}
	
	public List<Course> getMyCourse(Long userId){
		User user = userService.getUserById(userId); 
		List<Course> courses = courseRepository.findByRegisteredUser(user);
		return courses;
	}
	
	public Long getTotalCourse() {
		return courseRepository.count();
	}
	
	public List<TotalCourseByUserDTO> getTotalByUser() {
		List<TotalCourseByUserDTO> totalCourseByUserDTOs = new ArrayList<TotalCourseByUserDTO>();
		List<Course> courses = courseRepository.findAll();
		Iterator<Course> iter = courses.iterator();
		while (iter.hasNext()) {
			Course course = iter.next();
			TotalCourseByUserDTO totalCourseByUserDTO = new TotalCourseByUserDTO();
			totalCourseByUserDTO.setIdCourse(course.getId());
			totalCourseByUserDTO.setCourseName(course.getTitle());
			totalCourseByUserDTO.setTotalUser(Long.valueOf(course.getRegisteredUser().size()));
			totalCourseByUserDTO.setImgeUrl(course.getImage());			
			totalCourseByUserDTOs.add(totalCourseByUserDTO);
		}
		return totalCourseByUserDTOs;
	}
	
	public List<StatisticCourseDTO> getStatisticCourse() {
		List<StatisticCourseDTO> statisticCourseDTOs = new ArrayList<StatisticCourseDTO>();
		List<Course> courses = courseRepository.findAll();
		Iterator<Course> iter = courses.iterator();
		while (iter.hasNext()) {
			Course course = iter.next();
			StatisticCourseDTO statisticCourseDTO = new StatisticCourseDTO();
			statisticCourseDTO.setIdCourse(course.getId());
			statisticCourseDTO.setCourseName(course.getTitle());
			statisticCourseDTO.setTotalChapter(Long.valueOf(course.getChapters().size()));
			statisticCourseDTO.setTotalLesson(getTotalLessonOfCourse(course));
			statisticCourseDTO.setCreatedDate(course.getCreatedDate());
			statisticCourseDTO.setUpdatedDate(course.getUpdatedDate());
			statisticCourseDTOs.add(statisticCourseDTO);
		}
		return statisticCourseDTOs;
	}
	
	public Long getTotalLessonOfCourse(Course course) {
		Long count = 0L;
		for (int i = 0; i < course.getChapters().size(); i++) {
			Chapter chapter = new Chapter();
			count += Long.valueOf(chapter.getLessons().size());
		}
		return count;
	}
}
