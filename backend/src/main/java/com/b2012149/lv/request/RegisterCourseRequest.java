package com.b2012149.lv.request;

import com.b2012149.lv.entity.Course;
import com.b2012149.lv.entity.User;

public class RegisterCourseRequest {
	private Course course;
    private User user;
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
    
}
