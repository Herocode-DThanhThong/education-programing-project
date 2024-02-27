package com.b2012149.lv.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.b2012149.lv.entity.Notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface NotificationStorageRepository extends JpaRepository<Notification, String> {
	Optional<Notification> findById(String id);

	Page<Notification> findByUserToIdOrderByTimeDesc(Long userId, Pageable page);

	Page<Notification> findByUserToIdAndTimeLessThan(Long id, Instant date, Pageable page);

	List<Notification> findByUserToIdAndReadFalse(Long id);

	@Query(value = "SELECT count(*) FROM notification n WHERE n.read = false and n.user_to_id = :userId", nativeQuery = true)
	Long countByUserToIdAdnReadFalse(Long userId);

	void deleteAllByUserToId(Long userId);
}
