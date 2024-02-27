package com.b2012149.lv.response;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import com.b2012149.lv.entity.Authority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponse implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String userName;
	private String firstName;
	private String lastName;
	private String email;
	private String imageUrl;
	private Set<Authority> authorities;

}
