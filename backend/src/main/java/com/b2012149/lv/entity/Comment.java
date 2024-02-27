package com.b2012149.lv.entity;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "comment")
public class Comment implements Serializable {
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;

	private String content;

	private String commentImageUrl;

	@ManyToOne
	@JsonIgnoreProperties({ "password", "activated", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate",
			"authorities" })
	private User user;

	@ManyToOne
	@JsonIgnore
	private Post post;

	@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Comment> children;

	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnoreProperties({ "user", "content" })
	private Comment parent; // Parent comment

	public User getUser() {
		return user;
	}

	public Comment() {

	}

	public Comment(String id, User user, String content) {
		this.id = id;
		this.user = user;
		this.content = content;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCommentImageUrl() {
		return commentImageUrl;
	}

	public void setCommentImageUrl(String commentImageUrl) {
		this.commentImageUrl = commentImageUrl;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	public Comment getParent() {
		return parent;
	}

	public void setParent(Comment comment) {
		this.parent = comment;
	}

	public List<Comment> getChildren() {
		return children;
	}

	public void setChildren(List<Comment> comments) {
		this.children = comments;
	}
}
