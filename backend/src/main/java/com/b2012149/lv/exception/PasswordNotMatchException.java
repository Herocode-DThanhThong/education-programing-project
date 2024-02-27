package com.b2012149.lv.exception;

public class PasswordNotMatchException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public PasswordNotMatchException(String message) {
		super(message);
	}
}
