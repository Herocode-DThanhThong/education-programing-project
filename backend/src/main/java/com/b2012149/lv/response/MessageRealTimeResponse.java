package com.b2012149.lv.response;

import com.b2012149.lv.entity.Conversation;
import com.b2012149.lv.entity.Message;
import com.b2012149.lv.enumType.MessageType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageRealTimeResponse {
	Conversation conversation;
	MessageType messType;
}
