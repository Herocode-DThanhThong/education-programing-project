package com.b2012149.lv.service.dto;

import java.io.Serializable;
import java.time.Instant;

import com.b2012149.lv.enumType.LessonType;

public class LessonDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private String id;
	private String title;
	private String videoId;
	private LessonType type;
	private Instant createdDate;
	private Instant updatedDate;
}
