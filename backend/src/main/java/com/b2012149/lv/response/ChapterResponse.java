package com.b2012149.lv.response;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.b2012149.lv.entity.Lesson;
import com.b2012149.lv.service.dto.CourseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChapterResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private String id;
	private String title;
	private CourseDTO course;
	private List<Lesson> lessons = new ArrayList<Lesson>();
	private Instant createdDate;
	private Instant updatedDate;
}
