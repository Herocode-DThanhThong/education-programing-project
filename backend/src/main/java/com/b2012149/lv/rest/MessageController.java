package com.b2012149.lv.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.Message;
import com.b2012149.lv.repository.ConversationRepository;
import com.b2012149.lv.request.MessageRealTimeRequest;
import com.b2012149.lv.service.MessageService;

@RestController
@RequestMapping("/api/message")
public class MessageController {
	private final MessageService messageService;
	private final SimpMessagingTemplate simpMessagingTemplate;

	public MessageController(MessageService messageService, SimpMessagingTemplate simpMessagingTemplate,
			ConversationRepository conversationRepository) {
		this.messageService = messageService;
		this.simpMessagingTemplate = simpMessagingTemplate;
	}

	@PostMapping
	public ResponseEntity<Message> createMessage(@RequestBody Message message) {
		return ResponseEntity.ok(messageService.create(message));
	}

	@MessageMapping("/chat-private")
	public void recSignal(@Payload MessageRealTimeRequest messageRealTimeRequest) {
		simpMessagingTemplate.convertAndSendToUser(messageRealTimeRequest.getUserSendToUserName(), "/private",
				messageRealTimeRequest);
	}
}
