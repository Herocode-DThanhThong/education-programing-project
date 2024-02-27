package com.b2012149.lv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.b2012149.lv.entity.Friend;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
	List<Friend> findAllByUserFromIdAndStatusFalse(Long userID);

	List<Friend> findAllByUserToIdAndStatusFalse(Long userID);

	List<Friend> findAllByUserFromIdAndStatusTrue(Long userID);

	List<Friend> findAllByUserToIdAndStatusTrue(Long userID);

	List<Friend> findAllByUserFromIdAndStatusFalseOrderByCreatedDateDesc(Long userID);

	List<Friend> findAllByUserToIdAndStatusFalseOrderByCreatedDateDesc(Long userID);

	List<Friend> findAllByUserFromIdAndStatusTrueOrderByCreatedDateDesc(Long userID);

	List<Friend> findAllByUserToIdAndStatusTrueOrderByCreatedDateDesc(Long userID);
}
