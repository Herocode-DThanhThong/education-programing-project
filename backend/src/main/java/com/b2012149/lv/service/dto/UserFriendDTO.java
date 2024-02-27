package com.b2012149.lv.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

import com.b2012149.lv.entity.Authority;
import com.b2012149.lv.entity.User;

/**
 * A DTO representing a user, with his authorities.
 */
public class UserFriendDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String userName;
	private String firstName;

	private String lastName;

	private String email;

	private String imageUrl;

	public UserFriendDTO() {
		// Empty constructor needed for Jackson.
	}

	public UserFriendDTO(User user) {
		this.id = user.getId();
		this.userName = user.getUserName();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.email = user.getEmail();
		this.imageUrl = user.getImageUrl();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	@Override
	public String toString() {
		return "FriendUserDTO [id=" + id + ", userName=" + userName + ", firstName=" + firstName + ", lastName="
				+ lastName + ", email=" + email + ", imageUrl=" + imageUrl + "]";
	}

}
