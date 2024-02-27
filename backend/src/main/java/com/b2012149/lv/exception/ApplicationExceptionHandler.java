package com.b2012149.lv.exception;

import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.Instant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {
	@ExceptionHandler({ ApiException.class })
	protected ResponseEntity<ApiErrorResponse> handleApiException(ApiException ex) {
		return new ResponseEntity<ApiErrorResponse>(
				new ApiErrorResponse(ex.getStatus(), ex.getMessage(), Instant.now().toString()), ex.getStatus());
	}
}
