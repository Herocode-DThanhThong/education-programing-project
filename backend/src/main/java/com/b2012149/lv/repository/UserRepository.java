package com.b2012149.lv.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.b2012149.lv.entity.User;

/**
 * Spring Data JPA repository for the {@link User} entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByUserName(String userName);

	User findByEmail(String email);

	@Query(value = "SELECT * FROM user_account uc WHERE uc.first_name ilike :firstName%", nativeQuery = true)
	List<User> searchUserByFirstName(String firstName);

	@Query(value = "SELECT * FROM user_account WHERE unaccent(lower(concat(first_name,last_name))) ILIKE unaccent(lower('%' || :fullName || '%'))", nativeQuery = true)
	Page<User> searchUserByFullName(String fullName, Pageable pageable);
}
