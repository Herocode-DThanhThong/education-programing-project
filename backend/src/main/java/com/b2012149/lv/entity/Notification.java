package com.b2012149.lv.entity;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import com.b2012149.lv.enumType.NotificationType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@Table(name = "notification")
public class Notification implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String id;

	private String content;

	@ManyToOne
	@JsonIgnoreProperties({ "password", "activated", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate",
			"authorities" })
	private User userTo;

	@ManyToOne
	@JsonIgnoreProperties({ "password", "activated", "createdBy", "createdDate", "lastModifiedBy", "lastModifiedDate",
			"authorities" })
	private User userFrom;

	@ManyToOne
	private Post post;

	private NotificationType notificationType;

	private boolean delivered;

	private boolean read;

	@CreationTimestamp
	private Instant time;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public User getUserTo() {
		return userTo;
	}

	public void setUserTo(User userTo) {
		this.userTo = userTo;
	}

	public User getUserFrom() {
		return userFrom;
	}

	public void setUserFrom(User userFrom) {
		this.userFrom = userFrom;
	}

	public NotificationType getNotificationType() {
		return notificationType;
	}

	public void setNotificationType(NotificationType notificationType) {
		this.notificationType = notificationType;
	}

	public boolean isDelivered() {
		return delivered;
	}

	public void setDelivered(boolean delivered) {
		this.delivered = delivered;
	}

	public boolean isRead() {
		return read;
	}

	public void setRead(boolean read) {
		this.read = read;
	}

	public Notification(String id, String content, User userTo, User userFrom, NotificationType notificationType,
			boolean delivered, boolean read) {
		super();
		this.id = id;
		this.content = content;
		this.userTo = userTo;
		this.userFrom = userFrom;
		this.notificationType = notificationType;
		this.delivered = delivered;
		this.read = read;
	}

	public Notification() {
		super();
	}

}
