package com.b2012149.lv.rest;

import java.time.Instant;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.Notification;
import com.b2012149.lv.entity.Post;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.enumType.PostActionType;
import com.b2012149.lv.request.NotificationReadAllRequest;
import com.b2012149.lv.request.NotifyRequest;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.response.NotificationResponse;
import com.b2012149.lv.service.NotificationStorageService;
import com.b2012149.lv.service.PostService;

@RestController
@RequestMapping("/api")
public class NotifycationController {
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final NotificationStorageService notifycationStorageService;
	private final PostService postService;

	public NotifycationController(SimpMessagingTemplate simpMessagingTemplate,
			NotificationStorageService notifycationStorageService, PostService postService) {
		this.simpMessagingTemplate = simpMessagingTemplate;
		this.notifycationStorageService = notifycationStorageService;

		this.postService = postService;
	}

	@GetMapping("/notify/{notifyID}")
	public ResponseEntity<Notification> getNotifyById(@PathVariable("notifyID") String notifyId) {
		return ResponseEntity.ok(notifycationStorageService.getNotificationsByID(notifyId));
	}

	@GetMapping("/notify/not-read/user/{userID}")
	public ResponseEntity<List<Notification>> getNotificationsByUserIDNotRead(@PathVariable("userID") Long userId) {
		return ResponseEntity.ok(notifycationStorageService.getNotificationsByUserIDNotRead(userId));
	}

	@GetMapping("/notify/not-read/user/count/{userID}")
	public ResponseEntity<Long> countNotificationsByUserIDNotRead(@PathVariable("userID") Long userId) {
		return ResponseEntity.ok(notifycationStorageService.countNotificationsByUserIDNotRead(userId));
	}

	@GetMapping("/notify/user/{userID}")
	public ResponseEntity<CustomPageableResponse<Notification>> getNotificationsByUserID(
			@PathVariable("userID") Long userId) {
		return ResponseEntity.ok(notifycationStorageService.getNotificationsByUserID(userId));
	}

	@GetMapping("/notify/load-more/user/{userID}")
	public ResponseEntity<CustomPageableResponse<Notification>> loadMoreNotificationsByUserID(
			@PathVariable("userID") Long userId,
			@RequestParam(value = "time") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant time) {
		return ResponseEntity.ok(notifycationStorageService.loadMoreNotificationByUserId(userId, time));
	}

	@PostMapping("/notify")
	public ResponseEntity<Notification> createNotifycation(@RequestBody Notification notify) {
		return ResponseEntity.ok(notifycationStorageService.createNotificationStorage(notify));
	}

	@PutMapping("/notify/read-all")
	public ResponseEntity<String> readAllNotify(@RequestBody NotificationReadAllRequest notificationReadAllRequest) {
		notifycationStorageService.readAllNotification(notificationReadAllRequest.getNotifications());
		return ResponseEntity.ok("Read all successfully");
	}

	@DeleteMapping("/notify/{userID}")
	public ResponseEntity<String> deleteAllNotify(@PathVariable("userID") Long userId) {
		notifycationStorageService.deleteAllNotificationByUserId(userId);
		return ResponseEntity.ok("Delete all notification successfully");
	}

	@MessageMapping("/signal")
	@SendTo("/signal/public")
	public NotificationResponse recSignalPubloc(@Payload NotifyRequest notify) {
		Post post = postService.getPostByID(notify.getPost().getId());

		NotificationResponse notificationRes = new NotificationResponse();
		notificationRes.setUserFrom(notify.getUserFrom());
		notificationRes.setUserTo(notify.getUserTo());
		notificationRes.setAction(notify.getAction());
		notificationRes.setPostId(post.getId());

		return notificationRes;
	}

	@MessageMapping("/private-notify")
	public NotificationResponse recSignal(@Payload NotifyRequest notify) {
		NotificationResponse notificationRes = new NotificationResponse();

		Post post = postService.getPostByID(notify.getPost().getId());
		User owner = post.getUser();

		// Store notify when is storeInDb true and user isn't owner of post (with
		// action: like, comment, share)
		// Or Store notification which sent to friend when create new post
		if ((notify.isStoreInDB() && !owner.getUserName().equals(notify.getUserFrom().getUserName()))
				|| notify.getAction().equals(PostActionType.NEW_POST_ACTION)) {
			// Create notification
			Notification newNotify = new Notification();
			newNotify.setUserFrom(notify.getUserFrom());
			newNotify.setUserTo(notify.getUserTo());
			newNotify.setContent(notify.getContent());
			newNotify.setPost(notify.getPost());
			newNotify.setDelivered(notify.isDelivered());
			newNotify.setRead(notify.isRead());
			newNotify.setNotificationType(notify.getNotificationType());

			// Save notification
			Notification savedNotification = notifycationStorageService.createNotificationStorage(newNotify);

			notificationRes.setUserFrom(savedNotification.getUserFrom());
			notificationRes.setUserTo(savedNotification.getUserTo());
			notificationRes.setAction(notify.getAction());
			notificationRes.setPostId(post.getId());
		} else {
			notificationRes.setUserFrom(notify.getUserFrom());
			notificationRes.setUserTo(notify.getUserTo());
			notificationRes.setAction(notify.getAction());
			notificationRes.setPostId(post.getId());
		}

		simpMessagingTemplate.convertAndSendToUser(notify.getUserTo().getUserName(), "/private", notificationRes);
		return notificationRes;
	}

}
