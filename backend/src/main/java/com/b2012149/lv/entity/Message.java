package com.b2012149.lv.entity;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = "message")
@Data
public class Message implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;
	
	@Column(columnDefinition = "text")
	private String content;
	
	@ManyToOne
	@JsonIgnoreProperties({ "userFrom", "userTo", "messages", "createdDate", "updatedDate" })
	private Conversation conversation;
	
	@ManyToOne
	@JsonIgnoreProperties({ "email", "password", "activated",
		"createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate", "authorities" })
	private User user;

	@CreationTimestamp
	private Instant createdDate;

	@UpdateTimestamp
	private Instant updatedDate;

}
