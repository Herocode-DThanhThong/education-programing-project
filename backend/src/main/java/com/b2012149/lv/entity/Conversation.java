package com.b2012149.lv.entity;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OrderBy;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = "conversation")
@Data
public class Conversation implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;

	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnoreProperties({ "email", "password", "activated",
		"createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate", "authorities" })
	private User userFrom;

	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnoreProperties({ "email", "password", "activated",
		"createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate", "authorities" })
	private User userTo;
	
	@OneToMany(mappedBy = "conversation", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@OrderBy(clause = "createdDate")
	@JsonIgnoreProperties({ "conversation" })
	private List<Message> messages = new ArrayList<Message>();

	@CreationTimestamp
	private Instant createdDate;

	@UpdateTimestamp
	private Instant updatedDate;
}