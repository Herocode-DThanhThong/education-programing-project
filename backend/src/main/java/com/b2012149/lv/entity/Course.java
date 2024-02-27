package com.b2012149.lv.entity;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = "course")
@Data
public class Course implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;

	private String title;
	private String hashTag;

	@Column(columnDefinition = "text")
	private String description;

	@Column(name = "course_image_url", columnDefinition = "text")
	private String image;

	@OneToMany(mappedBy = "course", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Chapter> chapters = new ArrayList<Chapter>();

	@ManyToMany
	@JsonIgnoreProperties({ "firstName", "lastName", "imageUrl", "email", "password", "activated",
			"createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate", "authorities" })
	private List<User> registeredUser = new ArrayList<User>();

	@CreationTimestamp
	private Instant createdDate;

	@UpdateTimestamp
	private Instant updatedDate;

}
