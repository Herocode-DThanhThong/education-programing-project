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
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Table(name = "post")
@Data
public class Post implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator(name = "sequenceGenerator")
	private Long id;

	@Column(columnDefinition = "text")
	private String content;

	private LocalTime created;

	private Boolean isPostShared = false;

	private Long idPostShared;
	
	private String postImageUrl = "";

	@ManyToMany
	@JsonIgnoreProperties({ "password", "activated", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate",
			"authorities" })
	private List<User> likedUsers;

	@OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<Comment>();

	@ManyToMany
	@JsonIgnoreProperties({ "password", "activated", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate",
			"authorities" })
	private List<User> sharedUsers;

	@ManyToOne
	@JsonIgnoreProperties({ "password", "activated", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate",
			"authorities" })
	private User user;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Notification> notifications = new ArrayList<Notification>();

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	@JsonIgnoreProperties({ "post"})
	private List<Image> galleryImage = new ArrayList<Image>();
	
	@CreationTimestamp
	private Instant createdDate;

	@UpdateTimestamp
	private Instant updatedDate;

	public Post() {
	}

	public Post(String content, Long userId, LocalTime created, String postImageUrl, List<User> likedUsers,
			List<Comment> comments, User user) {
		super();
		this.content = content;
		this.created = created;
		this.postImageUrl = postImageUrl;
		this.likedUsers = likedUsers;
		this.comments = comments;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalTime getCreated() {
		return created;
	}

	public void setCreated(LocalTime created) {
		this.created = created;
	}

	public String getPostImageUrl() {
		return postImageUrl;
	}

	public void setPostImageUrl(String postImageUrl) {
		this.postImageUrl = postImageUrl;
	}

	public List<User> getLikedUsers() {
		return likedUsers;
	}

	public void setLikedUsers(List<User> likedUsers) {
		this.likedUsers = likedUsers;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComment(List<Comment> comments) {
		this.comments = comments;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public boolean getIsPostShared() {
		return isPostShared;
	}

	public void setIsPostShared() {
		this.isPostShared = true;
	}

}
