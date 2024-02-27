package com.b2012149.lv.request;

import java.io.Serializable;

import com.b2012149.lv.service.dto.CourseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChapterRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private String title;
	private CourseDTO course;
}
