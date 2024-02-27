package com.b2012149.lv.entity;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OrderBy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = "chatgpt_conversation")
@Data
public class ChatGPTConversation implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;
	
	@OneToMany(mappedBy = "chatGPTConversation", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@OrderBy(clause = "createdDate")
	@JsonIgnoreProperties({ "chatGPTConversation" })
	private List<ChatGPTMessage> messages = new ArrayList<ChatGPTMessage>();

	@OneToOne
	@JsonIgnoreProperties({ "email", "password", "activated",
		"createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate", "authorities" })
	private User user;
}
