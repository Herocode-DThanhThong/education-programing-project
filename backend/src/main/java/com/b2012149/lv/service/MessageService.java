package com.b2012149.lv.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2012149.lv.entity.Conversation;
import com.b2012149.lv.entity.Course;
import com.b2012149.lv.entity.Message;
import com.b2012149.lv.entity.Notification;
import com.b2012149.lv.entity.Post;
import com.b2012149.lv.entity.StudyRoute;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.enumType.PostActionType;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.ConversationRepository;
import com.b2012149.lv.repository.CourseRepository;
import com.b2012149.lv.repository.MessageRepository;
import com.b2012149.lv.repository.StudyRouteRepository;
import com.b2012149.lv.request.MessageRealTimeRequest;
import com.b2012149.lv.request.NotifyRequest;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.response.NotificationResponse;

import org.springframework.data.domain.Sort;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class MessageService {
	private final Logger log = LoggerFactory.getLogger(MessageService.class);

	private final MessageRepository messageRepository;
	private final ConversationRepository conversationRepository;
	private final UserService userService;
	
	public MessageService(MessageRepository messageRepository, ConversationRepository conversationRepository, UserService userService) {
		this.messageRepository = messageRepository;
		this.conversationRepository = conversationRepository;
		this.userService = userService;
	}

	public Message create(Message message) {
		Message nMessage = new Message();
		Conversation conversation = conversationRepository.findById(message.getConversation().getId())
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Cuộc trò chuyện không tồn tại với ID: " + message.getConversation().getId()));
		User user = userService.getUserById(message.getUser().getId());
		nMessage.setContent(message.getContent());
		nMessage.setConversation(conversation);
		nMessage.setUser(user);

		return messageRepository.save(nMessage);
	}
	
}
