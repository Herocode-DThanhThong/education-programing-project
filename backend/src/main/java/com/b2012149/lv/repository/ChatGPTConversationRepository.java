package com.b2012149.lv.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.b2012149.lv.entity.ChatGPTConversation;

public interface ChatGPTConversationRepository extends JpaRepository<ChatGPTConversation, String> {
	Optional<ChatGPTConversation> findByUserId(Long userId);
}
