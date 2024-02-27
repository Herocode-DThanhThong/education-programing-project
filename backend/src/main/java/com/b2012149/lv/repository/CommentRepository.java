package com.b2012149.lv.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.b2012149.lv.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {

	Optional<Comment> findPostById(String id);
	
	List<Comment> findByParentId(String id);
	
}