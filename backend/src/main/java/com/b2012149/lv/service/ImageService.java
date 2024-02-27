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
import com.b2012149.lv.entity.Image;
import com.b2012149.lv.entity.Post;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.ChapterRepository;
import com.b2012149.lv.repository.ImageRepository;
import com.b2012149.lv.repository.PostRepository;
import com.b2012149.lv.request.ChapterRequest;
import com.b2012149.lv.request.ImageRequest;
import com.b2012149.lv.response.ChapterResponse;
import com.b2012149.lv.response.CustomPageableResponse;
import org.springframework.data.domain.Sort;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class ImageService {
	private final Logger log = LoggerFactory.getLogger(ImageService.class);

	private final ImageRepository imageRepository;
	private final PostRepository postRepository;

	public ImageService(ImageRepository imageRepository, PostRepository postRepository) {
		this.imageRepository = imageRepository;
		this.postRepository = postRepository;
	}

	public void create(ImageRequest imageRequest) {
		Iterator<String> iter = imageRequest.getUrls().iterator();
		Post post = postRepository.findById(imageRequest.getPost().getId()).orElseThrow(
				() -> new ApiException(HttpStatus.BAD_REQUEST, "Bài viết không tồn tại"));
		while (iter.hasNext()) {
			Image nImage = new Image();
			String url = iter.next();
			nImage.setPost(post);
			nImage.setUrl(url);
			imageRepository.save(nImage);
		}
	}

	public void deleteByIds(List<String> ids) {
		Iterator<String> iter = ids.iterator();
		while (iter.hasNext()) {
			String id = iter.next();
			imageRepository.deleteById(id);
		}
	}

}
