package com.b2012149.lv.rest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.Friend;
import com.b2012149.lv.request.FriendRequest;
import com.b2012149.lv.service.FriendService;
import com.b2012149.lv.service.dto.UserFriendDTO;

@RestController
@RequestMapping("/api/friend")
public class FriendController {
	private final FriendService friendService;
	private final SimpMessagingTemplate simpMessagingTemplate;

	public FriendController(FriendService friendService, SimpMessagingTemplate simpMessagingTemplate) {
		this.friendService = friendService;
		this.simpMessagingTemplate = simpMessagingTemplate;
	}

	@GetMapping("/suggest/{userID}")
	public ResponseEntity<List<UserFriendDTO>> getAllFriendsSuggest(@PathVariable("userID") Long userID) {
		return new ResponseEntity<List<UserFriendDTO>>(friendService.getAllFriendsSuggest(userID), HttpStatus.OK);
	}

	@GetMapping("/{userID}")
	public ResponseEntity<List<Friend>> getAllFriends(@PathVariable("userID") Long userID) {
		return new ResponseEntity<List<Friend>>(friendService.getAllFriendByUserID(userID), HttpStatus.OK);
	}

	@GetMapping("/send/{userID}")
	public ResponseEntity<List<Friend>> getAllFriendRequestSendingByUserID(@PathVariable("userID") Long userID) {
		return new ResponseEntity<List<Friend>>(friendService.getAllFriendRequestSendingByUserID(userID),
				HttpStatus.OK);
	}

	@GetMapping("/receive/{userID}")
	public ResponseEntity<List<Friend>> getAllFriendRequestReceiveByUserID(@PathVariable("userID") Long userID) {
		return new ResponseEntity<List<Friend>>(friendService.getAllFriendRequestReceiveByUserID(userID),
				HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Friend> makeFriend(@RequestBody Friend friend) {
		return new ResponseEntity<Friend>(friendService.makeFriend(friend), HttpStatus.OK);
	}

	@PutMapping("/{friendID}")
	public ResponseEntity<Friend> acceptFriend(@PathVariable("friendID") Long friendID) {
		return new ResponseEntity<Friend>(friendService.acceptFriendRequest(friendID), HttpStatus.OK);
	}

	@DeleteMapping("/{friendID}")
	public ResponseEntity<String> cancelFriendRequest(@PathVariable("friendID") Long friendID) {
		friendService.cancelFriendRequest(friendID);
		return new ResponseEntity<String>("Remove friend successfully", HttpStatus.OK);
	}

	@MessageMapping("/friend-request")
	public FriendRequest recSignalFriendRequest(@Payload FriendRequest friendRequest) {
		simpMessagingTemplate.convertAndSendToUser(friendRequest.getUserTo().getUserName(), "/private", friendRequest);

		return friendRequest;
	}

	@MessageMapping("/cancel-friend-request")
	public FriendRequest recSignalCancelFriendRequest(@Payload FriendRequest friendRequest) {
		simpMessagingTemplate.convertAndSendToUser(friendRequest.getUserTo().getUserName(), "/private", friendRequest);

		return friendRequest;
	}

	@MessageMapping("/friend-accept")
	public FriendRequest recSignalFriendAccept(@Payload FriendRequest friendRequest) {
		simpMessagingTemplate.convertAndSendToUser(friendRequest.getUserFrom().getUserName(), "/private",
				friendRequest);

		return friendRequest;
	}

	@MessageMapping("/decline-friend-request")
	public FriendRequest recSignalDeclineFriendRequest(@Payload FriendRequest friendRequest) {
		simpMessagingTemplate.convertAndSendToUser(friendRequest.getUserTo().getUserName(), "/private", friendRequest);
		simpMessagingTemplate.convertAndSendToUser(friendRequest.getUserFrom().getUserName(), "/private",
				friendRequest);

		return friendRequest;
	}

	@MessageMapping("/remove-friend")
	public FriendRequest recSignalRemoveFriend(@Payload FriendRequest friendRequest) {
		simpMessagingTemplate.convertAndSendToUser(friendRequest.getUserTo().getUserName(), "/private", friendRequest);
		simpMessagingTemplate.convertAndSendToUser(friendRequest.getUserFrom().getUserName(), "/private",
				friendRequest);

		return friendRequest;
	}
}
