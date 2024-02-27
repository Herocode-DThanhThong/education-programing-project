package com.b2012149.lv.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = "progress")
@Data
public class Progress implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;

	@ManyToOne
	@JsonIgnoreProperties({ "password", "firstName", "lastName", "email", "activated", "imageUrl", "authorities" })
	private User user;
	private String courseId;
	private Long currentNumberLesson = 1L;
	private Boolean done = false;
}
