package com.b2012149.lv.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.ChatGPTMessage;
import com.b2012149.lv.service.ChatGPTMessageService;

@RestController
@RequestMapping("/api/chatgpt-message")
public class MessageChatGPTController {
	private final ChatGPTMessageService chatGPTMessageService;
	
	public MessageChatGPTController(ChatGPTMessageService chatGPTMessageService) {
		this.chatGPTMessageService = chatGPTMessageService;
	}
	
	@PostMapping
	public ResponseEntity<ChatGPTMessage> createMessage(@RequestBody ChatGPTMessage message) {
		return ResponseEntity.ok(chatGPTMessageService.create(message));
	}

}
