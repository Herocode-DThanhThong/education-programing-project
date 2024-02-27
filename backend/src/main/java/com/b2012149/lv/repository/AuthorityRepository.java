package com.b2012149.lv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.b2012149.lv.entity.Authority;


/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
