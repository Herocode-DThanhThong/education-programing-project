package com.b2012149.lv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.b2012149.lv.entity.Conversation;

public interface ConversationRepository extends JpaRepository<Conversation, String> {
	List<Conversation> findByUserFromId(Long userId);
	List<Conversation> findByUserToId(Long userId);
	Conversation findByUserFromIdAndUserToId(Long userFromId, Long userToId);
}