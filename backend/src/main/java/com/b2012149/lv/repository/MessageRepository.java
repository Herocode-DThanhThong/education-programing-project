package com.b2012149.lv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.b2012149.lv.entity.Message;

public interface MessageRepository extends JpaRepository<Message, String> {

}
