package com.b2012149.lv.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.ChatGPTConversation;
import com.b2012149.lv.service.ChatGPTConversationService;

@RestController
@RequestMapping("/api/chatgpt-conversation")
public class ChatGPTConversationController {
	private final ChatGPTConversationService chatGPTConversationService;
	
	public ChatGPTConversationController(ChatGPTConversationService chatGPTConversationService) {
		this.chatGPTConversationService = chatGPTConversationService;
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<ChatGPTConversation> getDetailConversation(@PathVariable("userId") Long userId) {
		return new ResponseEntity<ChatGPTConversation>(chatGPTConversationService.getConversationDetail(userId), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<ChatGPTConversation> createConversation(@RequestBody ChatGPTConversation conversation) {
		return new ResponseEntity<ChatGPTConversation>(chatGPTConversationService.create(conversation), HttpStatus.OK);
	}
}
