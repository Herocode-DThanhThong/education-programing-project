package com.b2012149.lv.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.b2012149.lv.entity.Authority;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * A DTO representing a user, with only the public attributes.
 */
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
@EqualsAndHashCode
@ToString
public class RegisterDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String userName;
	private String firstName;
	private String lastName;
	private String password;
	private String email;
	private String imageUrl;
	private String createdBy;
	private String lastModifiedBy;
	private Set<Authority> authorities = new HashSet<>();

}
