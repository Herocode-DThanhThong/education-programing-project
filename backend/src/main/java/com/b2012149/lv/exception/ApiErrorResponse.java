package com.b2012149.lv.exception;

import java.time.Instant;

import org.springframework.http.HttpStatus;

public class ApiErrorResponse {
	private final HttpStatus status;
    private final String message;
    private final String timestamp;

	public ApiErrorResponse(HttpStatus status, String message, String timestamp) {
		this.status = status;
		this.message = message;
		this.timestamp = timestamp;
	}

	public HttpStatus getStatus() {
		return this.status;
	}

	public String getMessage() {
		return this.message;
	}

	public String getTimestamp() {
		return this.timestamp;
	}
}
