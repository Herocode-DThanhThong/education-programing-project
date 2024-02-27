package com.b2012149.lv.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2012149.lv.entity.Conversation;
import com.b2012149.lv.entity.Course;
import com.b2012149.lv.entity.StudyRoute;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.ConversationRepository;
import com.b2012149.lv.repository.CourseRepository;
import com.b2012149.lv.repository.StudyRouteRepository;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.service.dto.ConverstationDTO;

import org.springframework.data.domain.Sort;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class ConversationService {
	private final Logger log = LoggerFactory.getLogger(ConversationService.class);

	private final ConversationRepository conversationRepository;
	private final UserService userService;
	
	public ConversationService(ConversationRepository conversationRepository, UserService userService) {
		this.conversationRepository = conversationRepository;
		this.userService = userService;
	}

	public Conversation create(ConverstationDTO conversation) {
		Conversation nConversation = new Conversation();
		User userFrom = userService.getUserByUsername(conversation.getUserFrom().getUserName());
		User userTo = userService.getUserByUsername(conversation.getUserTo().getUserName());
		
		nConversation.setUserFrom(userFrom);
		nConversation.setUserTo(userTo);
		
		return conversationRepository.save(nConversation);
	}

	public List<Conversation> getAllConversation(Long userId) {
		List<Conversation> conversationOfUserFromId = conversationRepository.findByUserFromId(userId);
		List<Conversation> conversationOfUserToId = conversationRepository.findByUserToId(userId);
		List<Conversation> allConversation = Stream.concat(conversationOfUserFromId.stream(), conversationOfUserToId.stream()).toList();
		return allConversation;
	}

	public Conversation getConversationDetail(String conversationId) {
		Conversation conversation = conversationRepository.findById(conversationId)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Cuộc trò chuyện không tồn tại với ID: " + conversationId));
		return conversation;
	}
	
	public Conversation getConversationUserWithUser(Long userIdOne, Long userIdTwo) {
		if(Objects.isNull(conversationRepository.findByUserFromIdAndUserToId(userIdOne, userIdTwo))) {
			return conversationRepository.findByUserFromIdAndUserToId(userIdTwo, userIdOne); 
		}
		
		return conversationRepository.findByUserFromIdAndUserToId(userIdOne, userIdTwo);
	}

}
