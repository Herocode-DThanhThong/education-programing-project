package com.b2012149.lv.service;

import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2012149.lv.entity.Notification;
import com.b2012149.lv.entity.Post;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.NotificationStorageRepository;
import com.b2012149.lv.response.CustomPageableResponse;

@Service
@Transactional
public class NotificationStorageService {
	private final NotificationStorageRepository notifyRepository;
	private final UserService userService;
	private final PostService postService;

	public NotificationStorageService(NotificationStorageRepository notifyRepository, UserService userService,
			PostService postService) {
		this.notifyRepository = notifyRepository;
		this.userService = userService;
		this.postService = postService;
	}

	public CustomPageableResponse<Notification> getNotificationsByUserID(Long userID) {
		Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC, "time");

		return new CustomPageableResponse<Notification>(
				notifyRepository.findByUserToIdOrderByTimeDesc(userID, pageable));
	}

	public CustomPageableResponse<Notification> loadMoreNotificationByUserId(Long userID, Instant time) {
		Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC, "time");

		return new CustomPageableResponse<Notification>(
				notifyRepository.findByUserToIdAndTimeLessThan(userID, time, pageable));

	}

	public Notification getNotificationsByID(String id) {
		return notifyRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Thông báo không tồn tại"));
	}

	public List<Notification> getNotificationsByUserIDNotRead(Long userID) {
		return notifyRepository.findByUserToIdAndReadFalse(userID);
	}

	public Long countNotificationsByUserIDNotRead(Long userID) {
		return notifyRepository.countByUserToIdAdnReadFalse(userID);
	}

	public Notification createNotificationStorage(Notification notificationStorage) {
		User userFrom = userService.getUserByUsername(notificationStorage.getUserFrom().getUserName());
		User userTo = userService.getUserByUsername(notificationStorage.getUserTo().getUserName());
		Post post = postService.getPostByID(notificationStorage.getPost().getId());

		notificationStorage.setUserFrom(userFrom);
		notificationStorage.setUserTo(userTo);
		notificationStorage.setPost(post);

		return notifyRepository.save(notificationStorage);
	}

	public void readAllNotification(List<Notification> notifications) {
		for (int i = 0; i < notifications.size(); i++) {
			String idNotify = notifications.get(i).getId();
			Notification notificationUpdate = notifyRepository.findById(idNotify).orElse(null);
			if (notificationUpdate != null) {
				notificationUpdate.setRead(true);
				notifyRepository.save(notificationUpdate);
			}
		}
	}

	public void deleteAllNotificationByUserId(Long userId) {
		notifyRepository.deleteAllByUserToId(userId);
	}

	public void clear() {
		notifyRepository.deleteAll();
	}
}
