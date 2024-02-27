package com.b2012149.lv.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Service;

import com.b2012149.lv.entity.Conversation;
import com.b2012149.lv.entity.Friend;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.ConversationRepository;
import com.b2012149.lv.repository.FriendRepository;
import com.b2012149.lv.repository.UserRepository;
import com.b2012149.lv.security.JwtTokenProvider;
import com.b2012149.lv.service.dto.ConverstationDTO;
import com.b2012149.lv.service.dto.ConverstationUserDTO;
import com.b2012149.lv.service.dto.UserFriendDTO;

@Service
public class FriendService {
	private final Logger log = LoggerFactory.getLogger(UserService.class);

	private final FriendRepository friendRepository;
	private final UserRepository m_userRepository;
	private final UserService userService;
	private final ModelMapper modelMapper;
	private final ConversationService conversationService;
	private final ConversationRepository conversationRepository;

	public FriendService(FriendRepository friendRepository, UserService userService, UserRepository userRepository,
			ModelMapper modelMapper, ConversationService conversationService,
			ConversationRepository conversationRepository) {
		this.friendRepository = friendRepository;
		this.userService = userService;
		this.modelMapper = modelMapper;
		this.m_userRepository = userRepository;
		this.conversationService = conversationService;
		this.conversationRepository = conversationRepository;
	}

	public List<UserFriendDTO> getAllFriendsSuggest(Long userID) {
		List<Long> listIdsExclude = new ArrayList<Long>();

		// Exclude myself is a friend
		listIdsExclude.add(userID);

		// Exclude id user sending request and request received
		List<Friend> friendSendingRequest = friendRepository.findAllByUserFromIdAndStatusFalse(userID);
		List<Friend> friendReceivedRequest = friendRepository.findAllByUserToIdAndStatusFalse(userID);

		friendSendingRequest.forEach((f) -> {
			listIdsExclude.add(f.getUserTo().getId());
		});
		friendReceivedRequest.forEach((f) -> {
			listIdsExclude.add(f.getUserFrom().getId());
		});

		// Exclude id user is a friend
		List<Friend> friendSendingRequestAccepted = friendRepository.findAllByUserFromIdAndStatusTrue(userID);
		List<Friend> friendReceivedRequestAccepted = friendRepository.findAllByUserToIdAndStatusTrue(userID);

		friendSendingRequestAccepted.forEach((f) -> {
			listIdsExclude.add(f.getUserTo().getId());
		});
		friendReceivedRequestAccepted.forEach((f) -> {
			listIdsExclude.add(f.getUserFrom().getId());
		});

		List<UserFriendDTO> userDTOs = new ArrayList<UserFriendDTO>();
		List<User> users = m_userRepository.findAll();
		Iterator<User> iter = users.iterator();
		while (iter.hasNext()) {
			User user = iter.next();
			if (!listIdsExclude.contains(user.getId()))
				userDTOs.add(convertToFriendDTO(user));
		}

		return userDTOs;
	}

	public List<Friend> getAllFriendByUserID(long userID) {
		List<Friend> friendSendingRequestAccepted = friendRepository.findAllByUserFromIdAndStatusTrue(userID);
		List<Friend> friendReceivedRequestAccepted = friendRepository.findAllByUserToIdAndStatusTrue(userID);

		friendSendingRequestAccepted.addAll(friendReceivedRequestAccepted);

		return friendSendingRequestAccepted;
	}

	public List<Friend> getAllFriendRequestSendingByUserID(long userID) {
		return friendRepository.findAllByUserFromIdAndStatusFalseOrderByCreatedDateDesc(userID);
	}

	public List<Friend> getAllFriendRequestReceiveByUserID(long userID) {
		return friendRepository.findAllByUserToIdAndStatusFalseOrderByCreatedDateDesc(userID);
	}

	public Friend makeFriend(Friend friend) {
		log.info(String.format("Make friend request: " + friend.getUserFrom().getUserName() + "with"
				+ friend.getUserTo().getUserName()));

		User userFrom = userService.getUserByUsername(friend.getUserFrom().getUserName());
		User userTo = userService.getUserByUsername(friend.getUserTo().getUserName());

		Friend nFriendRequest = new Friend();

		nFriendRequest.setUserFrom(userFrom);
		nFriendRequest.setUserTo(userTo);

		return friendRepository.save(nFriendRequest);
	}

	public void cancelFriendRequest(Long friendID) {
		Friend friend = friendRepository.findById(friendID)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Bạn bè không tồn tại"));
		log.info(String.format("Delete friend: " + friendID));

		friendRepository.deleteById(friendID);
	}

	public Friend acceptFriendRequest(Long friendID) {
		Friend friend = friendRepository.findById(friendID)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Lời mời kết bạn không tồn tại"));
		
		Conversation conversation = conversationService.getConversationUserWithUser(friend.getUserFrom().getId(),
				friend.getUserTo().getId());
		if (Objects.isNull(conversation)) {
			ConverstationUserDTO conversationUserFromDTO = new ConverstationUserDTO(friend.getUserFrom().getUserName());
			ConverstationUserDTO conversationUserToDTO = new ConverstationUserDTO(friend.getUserTo().getUserName());
			ConverstationDTO conversationDTO = new ConverstationDTO();
			conversationDTO.setUserFrom(conversationUserFromDTO);
			conversationDTO.setUserTo(conversationUserToDTO);
			conversationService.create(conversationDTO);
		}

		friend.setStatus(true);

		log.info(String.format("Accepted friend: " + friendID));
		return friendRepository.save(friend);
	}

	private UserFriendDTO convertToFriendDTO(User user) {
		UserFriendDTO userDTO = modelMapper.map(user, UserFriendDTO.class);
		return userDTO;
	}

}
