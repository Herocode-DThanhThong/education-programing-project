package com.b2012149.lv.request;

import com.b2012149.lv.entity.Comment;
import com.b2012149.lv.entity.Post;

public class CommentRequest {
	
	private Post post;
    private Comment comment;
	public Post getPost() {
		return post;
	}
	public void setPost(Post post) {
		this.post = post;
	}
	public Comment getComment() {
		return comment;
	}
	public void setComment(Comment comment) {
		this.comment = comment;
	}
    
    
}
