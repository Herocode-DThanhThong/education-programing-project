package com.b2012149.lv.rest;

import java.time.Instant;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.Comment;
import com.b2012149.lv.entity.Post;
import com.b2012149.lv.request.CommentRequest;
import com.b2012149.lv.request.LikeRequest;
import com.b2012149.lv.request.ReplyCommentRequest;
import com.b2012149.lv.request.ShareRequest;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.service.PostService;

@RestController
@RequestMapping("/api/post")
public class PostController {
	private final PostService postService;

	public PostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping
	public ResponseEntity<CustomPageableResponse<Post>> getAllPosts() {
		return ResponseEntity.ok(postService.getAll());
	}

	@GetMapping("/user/{id}")
	public ResponseEntity<CustomPageableResponse<Post>> getAllPostByUserId(@PathVariable("id") Long id) {
		return ResponseEntity.ok(postService.getAllPostByUserId(id));
	}

	@GetMapping("/search")
	public ResponseEntity<CustomPageableResponse<Post>> searchPostByContent(
			@RequestParam(name = "content") String content) {
		return ResponseEntity.ok(postService.searchPostByContent(content));
	}
	
	@GetMapping("/total")
	public ResponseEntity<Long> getTotalPost() {
		return ResponseEntity.ok(postService.getTotalPost());
	}


	@GetMapping("/load-more")
	public ResponseEntity<CustomPageableResponse<Post>> loadMorePosts(
			@RequestParam(value = "createdDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant time) {
		return ResponseEntity.ok(postService.loadMorePosts(time));
	}

	@GetMapping("/user/{id}/load-more")
	public ResponseEntity<CustomPageableResponse<Post>> loadMorePostsByUserId(@PathVariable("id") Long id,
			@RequestParam(value = "createdDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant time) {
		return ResponseEntity.ok(postService.loadMorePostsByUserId(id, time));
	}

	@GetMapping("/search/load-more")
	public ResponseEntity<CustomPageableResponse<Post>> loadMorePostByContent(
			@RequestParam(name = "content") String content,
			@RequestParam(value = "createdDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant time) {
		return ResponseEntity.ok(postService.loadMorePostByContent(content, time));
	}

	@GetMapping("/{postID}")
	public ResponseEntity<Post> getPostById(@PathVariable Long postID) {
		return ResponseEntity.ok(postService.getPostByID(postID));
	}

	@PostMapping
	public ResponseEntity<Post> createPost(@RequestBody Post post) {
		return ResponseEntity.ok(postService.create(post));
	}

	@PutMapping("/{postID}")
	public ResponseEntity<Post> updatePost(@RequestBody Post post, @PathVariable("postID") Long postID,
			HttpServletRequest request) {
		return ResponseEntity.ok(postService.update(post, postID, request));
	}

	@GetMapping("/comment/{postID}")
	public ResponseEntity<List<Comment>> getCommentsByPostID(@PathVariable Long postID) {
		return ResponseEntity.ok(postService.getCommentsByPostID(postID));
	}

	@PostMapping("/comment")
	public ResponseEntity<Post> addComment(@RequestBody CommentRequest commentRequest) {
		return ResponseEntity.ok(postService.addComment(commentRequest));
	}

	@PostMapping("/comment/reply")
	public ResponseEntity<Post> replyComment(@RequestBody ReplyCommentRequest replyCommentRequest) {
		return ResponseEntity.ok(postService.replyComment(replyCommentRequest));
	}

	@PutMapping("/comment/{commentID}")
	public ResponseEntity<Post> updateComment(@RequestBody CommentRequest comment,
			@PathVariable("commentID") String commentID, HttpServletRequest request) {
		return ResponseEntity.ok(postService.updateComment(comment, commentID, request));
	}

	@DeleteMapping("/comment")
	public ResponseEntity<Post> removeComment(@RequestBody CommentRequest commentRequest, HttpServletRequest request) {
		return ResponseEntity.ok(postService.removeComment(commentRequest, request));
	}

	@PostMapping("/like")
	public ResponseEntity<Post> addLike(@RequestBody LikeRequest likeRequest) {
		return ResponseEntity.ok(postService.addLike(likeRequest));
	}

	@DeleteMapping("/like")
	public ResponseEntity<Post> removeLike(@RequestBody LikeRequest likeRequest) {
		return ResponseEntity.ok(postService.removeLike(likeRequest));
	}

	@DeleteMapping("/{postID}")
	public ResponseEntity<String> deletePostByID(@PathVariable Long postID, HttpServletRequest request) {
		postService.deletePostById(postID, request);
		return ResponseEntity.ok("Delete post successfully");
	}

	@PostMapping("/share")
	public ResponseEntity<Post> addShare(@RequestBody ShareRequest shareRequest) {
		return ResponseEntity.ok(postService.addShare(shareRequest));
	}

}
