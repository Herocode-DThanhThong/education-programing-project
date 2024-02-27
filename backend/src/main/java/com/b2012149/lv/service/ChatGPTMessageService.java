package com.b2012149.lv.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2012149.lv.entity.ChatGPTConversation;
import com.b2012149.lv.entity.ChatGPTMessage;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.ChatGPTConversationRepository;
import com.b2012149.lv.repository.ChatGPTMessageRepository;

@Service
@Transactional
public class ChatGPTMessageService {
	private final ChatGPTConversationRepository chatGPTConversationRepository;
	private final ChatGPTMessageRepository chatGPTMessageRepository;
	private final UserService userService;
	
	public ChatGPTMessageService(ChatGPTConversationRepository chatGPTConversationRepository, ChatGPTMessageRepository chatGPTMessageRepository, UserService userService) {
		this.chatGPTConversationRepository = chatGPTConversationRepository;
		this.chatGPTMessageRepository = chatGPTMessageRepository;
		this.userService = userService;
	}
	
	public ChatGPTMessage create(ChatGPTMessage chatGPTMessage) {
		ChatGPTMessage nChatGPTMessage = new ChatGPTMessage();
		ChatGPTConversation conversation = chatGPTConversationRepository.findById(chatGPTMessage.getChatGPTConversation().getId())
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Cuộc trò chuyện không tồn tại"));
		nChatGPTMessage.setContent(chatGPTMessage.getContent());
		nChatGPTMessage.setChatGPTConversation(conversation);
		nChatGPTMessage.setIsChatGPT(chatGPTMessage.getIsChatGPT());
		
		return chatGPTMessageRepository.save(nChatGPTMessage);
	}
}
