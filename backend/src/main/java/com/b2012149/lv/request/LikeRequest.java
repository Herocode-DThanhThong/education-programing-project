package com.b2012149.lv.request;

import com.b2012149.lv.entity.Post;
import com.b2012149.lv.entity.User;

public class LikeRequest {
	
	private Post post;
    private User user;
	public Post getPost() {
		return post;
	}
	public void setPost(Post post) {
		this.post = post;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
    
    
}
