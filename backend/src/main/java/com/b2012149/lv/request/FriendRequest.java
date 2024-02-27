package com.b2012149.lv.request;

import com.b2012149.lv.entity.User;
import com.b2012149.lv.enumType.FriendActionType;

import lombok.Data;

@Data
public class FriendRequest {
	private User userFrom;
	private User userTo;
	
	private FriendActionType action;
}
