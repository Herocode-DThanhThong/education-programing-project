package com.b2012149.lv.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2012149.lv.entity.ChatGPTConversation;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.ChatGPTConversationRepository;

@Service
@Transactional
public class ChatGPTConversationService {
	private final Logger log = LoggerFactory.getLogger(ConversationService.class);

	private final ChatGPTConversationRepository chatGPTConversationRepository;
	private final UserService userService;

	public ChatGPTConversationService(ChatGPTConversationRepository chatGPTConversationRepository,
			UserService userService) {
		this.chatGPTConversationRepository = chatGPTConversationRepository;
		this.userService = userService;
	}

	public ChatGPTConversation create(ChatGPTConversation conversation) {
		ChatGPTConversation nChatGPTConversation = new ChatGPTConversation();
		User user = userService.getUserByUsername(conversation.getUser().getUserName());

		nChatGPTConversation.setUser(user);

		return chatGPTConversationRepository.save(nChatGPTConversation);
	}

	public ChatGPTConversation getConversationDetail(Long userId) {
		ChatGPTConversation conversation = chatGPTConversationRepository.findByUserId(userId)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Cuộc trò chuyện không tồn tại"));
		return conversation;
	}

}
