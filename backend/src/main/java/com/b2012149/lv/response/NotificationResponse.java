package com.b2012149.lv.response;

import com.b2012149.lv.entity.User;
import com.b2012149.lv.enumType.FriendActionType;
import com.b2012149.lv.enumType.PostActionType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class NotificationResponse {

	private User userFrom;
	private User userTo;
	
	private PostActionType action;
	private Long postId;

}
