package com.b2012149.lv.request;

import com.b2012149.lv.entity.Post;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.enumType.NotificationType;
import com.b2012149.lv.enumType.PostActionType;

import lombok.Data;

@Data
public class NotifyRequest {
	private String content;

	private Post post;
	
	private boolean delivered;
	private boolean read;
	private boolean storeInDB;
	

	private User userFrom;
	private User userTo;
	
	private NotificationType notificationType;
	private PostActionType action;

	
}
