package com.b2012149.lv.request;

import java.util.List;

import com.b2012149.lv.entity.Post;
import com.b2012149.lv.enumType.LessonType;
import com.b2012149.lv.service.dto.ChapterDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageRequest {
	List<String> urls;
	Post post;
}
