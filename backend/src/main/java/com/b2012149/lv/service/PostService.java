package com.b2012149.lv.service;

import java.time.Instant;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2012149.lv.entity.Comment;
import com.b2012149.lv.entity.Post;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.CommentRepository;
import com.b2012149.lv.repository.PostRepository;
import com.b2012149.lv.request.CommentRequest;
import com.b2012149.lv.request.LikeRequest;
import com.b2012149.lv.request.ReplyCommentRequest;
import com.b2012149.lv.request.ShareRequest;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.security.JwtTokenProvider;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class PostService {

	private final Logger log = LoggerFactory.getLogger(UserService.class);

	private final PostRepository postRepository;
	private final CommentRepository commentRepository;
	private final UserService userService;
	private final JwtTokenProvider jwtTokenProvider;

	public PostService(PostRepository postRepository, UserService userService, JwtTokenProvider jwtService,
			CommentRepository commentRepository) {
		this.postRepository = postRepository;
		this.userService = userService;
		this.commentRepository = commentRepository;
		this.jwtTokenProvider = jwtService;
	}

	public Post create(Post post) {
		User user = userService.getUserByUsername(post.getUser().getUserName());
		post.setUser(user);
		post.setComments(new ArrayList<>());
		post.setLikedUsers(new ArrayList<>());
		post.setSharedUsers(new ArrayList<>());
		post.setCreated(LocalTime.now());
		return postRepository.save(post);

	}

	public Post update(Post post, Long postId, HttpServletRequest request) {
		Post existingPost = postRepository.findById(postId).get();

		// Verify user is own of post
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String accessToken = authHeader.substring(7);
		Long userId = jwtTokenProvider.getUserIdFromJWT(accessToken);
		if (!userId.equals(existingPost.getUser().getId())) {
			throw new ApiException(HttpStatus.FORBIDDEN, "Không đủ quyền! Bạn không thể cập nhật bài viết của người khác");
		}

		existingPost.setContent(post.getContent());
		existingPost.setPostImageUrl(post.getPostImageUrl());

		log.debug(String.format("Updated post with id %s success ", existingPost.getId()));

		return existingPost;
	}

	public CustomPageableResponse<Post> getAll() {
		Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC, "createdDate");

		return new CustomPageableResponse<Post>(postRepository.findAll(pageable));

	}

	public CustomPageableResponse<Post> getAllPostByUserId(Long userId) {
		Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC, "createdDate");

		return new CustomPageableResponse<Post>(postRepository.findByUserId(userId, pageable));
	}

	public CustomPageableResponse<Post> searchPostByContent(String content) {
		// Using native query, so must config exactly column in database
		Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC, "created_date");

		return new CustomPageableResponse<Post>(postRepository.searchPostByContent(content, pageable));
	}

	public CustomPageableResponse<Post> loadMorePosts(Instant createdDate) {
		Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC, "createdDate");

		return new CustomPageableResponse<Post>(postRepository.findByCreatedDateLessThan(createdDate, pageable));
	}

	public CustomPageableResponse<Post> loadMorePostsByUserId(Long userId, Instant createdDate) {
		Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC, "createdDate");

		return new CustomPageableResponse<Post>(
				postRepository.findByUserIdAndCreatedDateLessThan(userId, createdDate, pageable));
	}

	public CustomPageableResponse<Post> loadMorePostByContent(String content, Instant createdDate) {
		// Using native query, so must config exactly column in database
		Pageable pageable = PageRequest.of(0, 5, Sort.Direction.DESC, "created_date");

		return new CustomPageableResponse<Post>(
				postRepository.loadMorePostByContentAndCreatedDateLessthan(content, createdDate, pageable));
	}

	public Post getPostByID(Long postID) {
		/*
		 * Query query = new Query().addCriteria(Criteria.where("id").is(new
		 * ObjectId(postID))); log.info(String.valueOf(mongoTemplate.find(query,
		 * Post.class)));
		 */
		return postRepository.findPostById(postID)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Bài viết không tồn tại"));
	}

	public void deletePostById(Long postID, HttpServletRequest request) {
		Post post = postRepository.findPostById(postID)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Bài viết không tồn tại"));

		// Verify user is own of post
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String accessToken = authHeader.substring(7);
		Long userId = jwtTokenProvider.getUserIdFromJWT(accessToken);

		if (!userId.equals(post.getUser().getId())) {
			throw new ApiException(HttpStatus.FORBIDDEN, "Không đủ quyền! Bạn không thể xóa bài viết của người khác");
		}

		if (post.getIsPostShared()) {
			// Update post which is shared
			try {
				Post postShared = getPostByID(post.getIdPostShared());

				User requestUser = post.getUser();
				List<User> updatedSharedUser = postShared.getSharedUsers().stream()
						.filter(x -> !x.getUserName().equals(requestUser.getUserName())).collect(Collectors.toList());

				postShared.setSharedUsers(updatedSharedUser);
				postRepository.save(postShared);

				// Delete post shared which is a new post but actually is post shared
				postRepository.delete(post);
			} catch (Exception e) {
				// TODO: handle exception if post shared doesn't exist
				postRepository.deleteById(post.getId());
			}

		} else {
			postRepository.deleteById(post.getId());
		}

	}

	public Post addComment(CommentRequest commentRequest) {
		Post post = getPostByID(commentRequest.getPost().getId());
		Comment comment = commentRequest.getComment();

		// it's checking users at the same time
		User commentUser = userService.getUserByUsername(comment.getUser().getUserName());
		comment.setUser(commentUser);
		User postUser = userService.getUserByUsername(post.getUser().getUserName());

		post.setUser(postUser);
		comment.setPost(post);

		commentRepository.save(comment);

		Post postAfterAddedComment = getPostByID(commentRequest.getPost().getId());
		return postAfterAddedComment;
	}

	public Post replyComment(ReplyCommentRequest replyCommentRequest) {
		Post post = getPostByID(replyCommentRequest.getPost().getId());
		// Get parent
		Comment comment = commentRepository.findById(replyCommentRequest.getParent().getId())
				.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Bình luận không tồn tại"));

		// it's checking users at the same time
		User replyCommentUser = userService
				.getUserByUsername(replyCommentRequest.getReplyComment().getUser().getUserName());

		// reply comment
		Comment replyComment = new Comment();
		replyComment.setUser(replyCommentUser);
		replyComment.setParent(comment);
		replyComment.setContent(replyCommentRequest.getReplyComment().getContent());
		replyComment.setCommentImageUrl(replyCommentRequest.getReplyComment().getCommentImageUrl());
		replyComment.setPost(post);

		commentRepository.save(replyComment);
		Post postAfterAddedComment = getPostByID(replyCommentRequest.getPost().getId());
		return postAfterAddedComment;
	}

	public Post updateComment(CommentRequest commentRequest, String id, HttpServletRequest request) {
		Comment existingComment = commentRepository.findById(id).get();

		// Verify user is own of post
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String accessToken = authHeader.substring(7);
		Long userId = jwtTokenProvider.getUserIdFromJWT(accessToken);

		if (!userId.equals(existingComment.getUser().getId())) {
			throw new ApiException(HttpStatus.FORBIDDEN, "Không đủ quyền! Bạn không thể cập nhật bình luận của người khác");
		}

		existingComment.setContent(commentRequest.getComment().getContent());
		existingComment.setCommentImageUrl(commentRequest.getComment().getCommentImageUrl());
		commentRepository.save(existingComment);

		Post post = postRepository.findById(commentRequest.getPost().getId()).get();
		return post;
	}

	public Post removeComment(CommentRequest commentRequest, HttpServletRequest request) {
		Post post = getPostByID(commentRequest.getPost().getId());
		Comment comment = commentRequest.getComment();
		// it's checking users at the same time
		User commentUser = userService.getUserByUsername(comment.getUser().getUserName());
		comment.setUser(commentUser);

		// Verify user is own of post
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String accessToken = authHeader.substring(7);
		Long userId = jwtTokenProvider.getUserIdFromJWT(accessToken);

		if (!userId.equals(commentUser.getId())) {
			throw new ApiException(HttpStatus.FORBIDDEN, "Không đủ quyền! Bạn không thể xóa bình luận của người khác");
		}

		// Remove comment
		commentRepository.deleteById(comment.getId());

		Post postAfterDeletedComment = getPostByID(commentRequest.getPost().getId());

		return postAfterDeletedComment;
	}

	public Post addLike(LikeRequest likeRequest) {
		Post post = getPostByID(likeRequest.getPost().getId());
		// it's checking users at the same time
		User likedUser = userService.getUserByUsername(likeRequest.getUser().getUserName());
		if (post.getLikedUsers() != null
				&& userService.isUserContains(post.getLikedUsers(), likeRequest.getUser().getUserName())) {
			log.info("call remove like: " + likeRequest.getUser().getUserName());
			return removeLike(likeRequest);
		}
		post.getLikedUsers().add(likedUser);
		return postRepository.save(post);
	}

	public Post removeLike(LikeRequest likeRequest) {
		log.info("Removelike: " + likeRequest.getUser().getUserName());
		Post post = getPostByID(likeRequest.getPost().getId());
		User requestUser = likeRequest.getUser();
		// it's checking users at the same time
		User unLikedUser = userService.getUserByUsername(requestUser.getUserName());
		List<User> updatedLikes = post.getLikedUsers().stream()
				.filter(x -> !x.getUserName().equals(unLikedUser.getUserName())).collect(Collectors.toList());
		post.setLikedUsers(updatedLikes);
		return postRepository.save(post);
	}

	public List<Comment> getCommentsByPostID(Long postID) {
		Post post = getPostByID(postID);
		return post.getComments();
	}

	public Post addShare(ShareRequest shareRequest) {
		Post post = getPostByID(shareRequest.getPost().getId());

		// Update post shared
		log.info("Update post shared: " + post.getUser().getUserName());
		// Set list sharedUser of post which is shared
		User userSharePost = userService.getUserByUsername(shareRequest.getUser().getUserName());
		post.getSharedUsers().add(userSharePost);
		postRepository.save(post);

		log.info("Share post of user: " + post.getUser().getUserName());
		// Create new post but it's post shared
		Post newPost = new Post();
		newPost.setContent(post.getContent());
		newPost.setPostImageUrl(post.getPostImageUrl());
		newPost.setUser(userSharePost);
		newPost.setComment(new ArrayList<>());
		newPost.setLikedUsers(new ArrayList<>());
		newPost.setCreated(LocalTime.now());
		newPost.setIsPostShared();
		newPost.setIdPostShared(post.getId());
		newPost.setSharedUsers(new ArrayList<>());

		// Save new post
		return postRepository.save(newPost);
	}

	public Long getTotalPost() {
		return postRepository.count();
	}
}
