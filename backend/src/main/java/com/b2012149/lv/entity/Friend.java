package com.b2012149.lv.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = "friend")
@Data
public class Friend implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator(name = "sequenceGenerator")
	private Long id;

	@ManyToOne
	@JsonIgnoreProperties({ "password", "activated", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate",
			"authorities" })
	private User userFrom;

	@ManyToOne
	@JsonIgnoreProperties({ "password", "activated", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate",
			"authorities" })
	private User userTo;

	@Column(nullable = false)
	private boolean status = false;

	@CreationTimestamp
	private LocalDateTime createdDate;

}