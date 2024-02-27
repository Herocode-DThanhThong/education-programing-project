package com.b2012149.lv.request;

import java.io.Serializable;

import com.b2012149.lv.enumType.LessonType;
import com.b2012149.lv.service.dto.ChapterDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LessonRequest implements Serializable {
	private static final long serialVersionUID = 1L;
	private String id;
	private String title;
	private String content;
	private LessonType type;
	private Long totalQuestion;
	private String answerKeys;
	private ChapterDTO chapter;
	private String videoId;
}
