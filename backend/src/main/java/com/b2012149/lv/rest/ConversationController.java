package com.b2012149.lv.rest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.Conversation;
import com.b2012149.lv.service.ConversationService;
import com.b2012149.lv.service.dto.ConverstationDTO;
@RestController
@RequestMapping("/api/conversation")
public class ConversationController {
	private final ConversationService conversationService;

	public ConversationController(ConversationService conversationService) {
		this.conversationService = conversationService;
	}

	@GetMapping("/conversation-by-user/{userID}")
	public ResponseEntity<List<Conversation>> getAllConversation(@PathVariable("userID") Long userID) {
		return new ResponseEntity<List<Conversation>>(conversationService.getAllConversation(userID), HttpStatus.OK);
	}

	@GetMapping("/{conversationId}")
	public ResponseEntity<Conversation> getDetailConversation(@PathVariable("conversationId") String conversationId) {
		return new ResponseEntity<Conversation>(conversationService.getConversationDetail(conversationId), HttpStatus.OK);
	}
	
	@GetMapping("/{userIdOne}/{userIdTwo}")
	public ResponseEntity<Conversation> getDetailConversation(
			@PathVariable("userIdOne") Long userIdOne, 
			@PathVariable("userIdTwo") Long userIdTwo
			) {
		return new ResponseEntity<Conversation>(conversationService.getConversationUserWithUser(userIdOne, userIdTwo), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Conversation> createConversation(@RequestBody ConverstationDTO conversation) {
		return new ResponseEntity<Conversation>(conversationService.create(conversation), HttpStatus.OK);
	}
}
