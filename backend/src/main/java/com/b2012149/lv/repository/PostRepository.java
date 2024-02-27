package com.b2012149.lv.repository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.b2012149.lv.entity.Post;
import com.b2012149.lv.entity.User;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
	List<Post> findAllByOrderByCreatedDateDesc();

	Optional<Post> findPostById(Long id);

	Page<Post> findByUserId(Long id, Pageable page);

	Page<Post> findByCreatedDateLessThan(Instant date, Pageable page);

	Page<Post> findByUserIdAndCreatedDateLessThan(Long id, Instant date, Pageable page);

	@Query(value = "SELECT * FROM post p WHERE unaccent(lower(p.content)) ILIKE unaccent(lower('%' || :content || '%'))", nativeQuery = true)
	Page<Post> searchPostByContent(String content, Pageable page);

	@Query(value = "SELECT * FROM post p WHERE unaccent(lower(p.content)) ILIKE unaccent(lower('%' || :content || '%')) and created_date < :date", nativeQuery = true)
	Page<Post> loadMorePostByContentAndCreatedDateLessthan(String content, Instant date, Pageable page);

}
