package com.b2012149.lv.entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * An authority (a security role) used by Spring Security.
 */
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "authority")
public class Authority implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(length = 50)
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Authority)) {
			return false;
		}
		return Objects.equals(name, ((Authority) o).name);
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(name);
	}

	// prettier-ignore
	@Override
	public String toString() {
		return name;
	}
}
