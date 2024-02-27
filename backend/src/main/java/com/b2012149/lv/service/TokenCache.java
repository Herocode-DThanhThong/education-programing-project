package com.b2012149.lv.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class TokenCache {
	private static final Map<String, Long> m_token = new ConcurrentHashMap<String, Long>();
	
	public static Map<String, Long> getToken() {
		return m_token;
	}

	public static void addToken(String token, Long userId) {
		m_token.put(token, userId);
	}
	
	public static void clearToken() {
		m_token.clear();
	}

}
