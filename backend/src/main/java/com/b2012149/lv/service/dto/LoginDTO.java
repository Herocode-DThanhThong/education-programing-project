package com.b2012149.lv.service.dto;

import java.io.Serializable;

import com.b2012149.lv.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * A DTO representing a user, with only the public attributes.
 */
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
public class LoginDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String userName;
	private String password;

	public LoginDTO(User user) {
		this.id = user.getId();
		// Customize it here if you need, or not, firstName/lastName/etc
		this.userName = user.getUserName();
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

	public String getPassword() {
		return password;
	}

	// prettier-ignore
	@Override
	public String toString() {
		return "UserDTO{" + "id='" + id + '\'' + ", login='" + userName + '\'' + "}";
	}
}
