package com.b2012149.lv.request;

import java.util.List;

import com.b2012149.lv.entity.Notification;

import lombok.Data;

@Data
public class NotificationReadAllRequest {
	private List<Notification> notifications;
}
