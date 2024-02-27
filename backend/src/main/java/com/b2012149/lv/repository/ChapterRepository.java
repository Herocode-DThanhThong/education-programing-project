package com.b2012149.lv.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.b2012149.lv.entity.Chapter;
import com.b2012149.lv.entity.Course;
import com.b2012149.lv.entity.Post;
import com.b2012149.lv.entity.User;

/**
 * Spring Data JPA repository for the {@link User} entity.
 */
@Repository
public interface ChapterRepository extends JpaRepository<Chapter, String> {
	@Query(value = "SELECT * FROM chapter WHERE unaccent(lower(title)) ILIKE unaccent(lower('%' || :title || '%'))", nativeQuery = true)
	Page<Chapter> searchChapterByTitle(String title, Pageable pageable);
	List<Chapter> findByCourseIdOrderByCreatedDate(String courseId);
}
