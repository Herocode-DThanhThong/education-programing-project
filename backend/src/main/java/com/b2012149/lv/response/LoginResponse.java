package com.b2012149.lv.response;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.b2012149.lv.entity.Authority;

import lombok.Data;

@Data
public class LoginResponse implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String accessToken;
	private String type = "Bearer";
	private String userName;
	private Date expire;
	private Set<Authority> authorities = new HashSet<>();

	public LoginResponse(Long id, String accessToken, String username, Date expire, Set<Authority> authorities) {
		this.id = id;
		this.accessToken = accessToken;
		this.userName = username;
		this.expire = expire;
		this.authorities = authorities;
	}

}
