package com.b2012149.lv.request;

import com.b2012149.lv.entity.Comment;
import com.b2012149.lv.entity.Post;

import lombok.Data;

@Data
public class ReplyCommentRequest  {

	private Post post;
	private Comment parent;
	private Comment replyComment;

}
