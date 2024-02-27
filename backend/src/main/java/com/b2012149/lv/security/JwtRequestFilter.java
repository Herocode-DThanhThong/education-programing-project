package com.b2012149.lv.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.b2012149.lv.service.TokenCache;
import com.b2012149.lv.service.UserService;

public class JwtRequestFilter extends OncePerRequestFilter {

	private final Logger log = LoggerFactory.getLogger(JwtRequestFilter.class);

	private final JwtTokenProvider m_tokenProvider;

	private final UserService m_userService;

	public JwtRequestFilter(JwtTokenProvider tokenUserDetailService, UserService userService) {
		m_tokenProvider = tokenUserDetailService;
		m_userService = userService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		try {
			String jwt = getJwtFromRequest(request);
			if (StringUtils.hasText(jwt) && m_tokenProvider.validateJwtToken(jwt)) {
				Long userId = m_tokenProvider.getUserIdFromJWT(jwt);
				if (TokenCache.getToken().get(jwt) == null) {
					log.debug("Please login!!!");
				} else {
					UserDetails userDetails = m_userService.loadUserById(userId);
					
					if (!userDetails.isAccountNonLocked()) {
						log.error("User has been locked !!");
					} else {
						UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
								userDetails, null, userDetails.getAuthorities());
						authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

						SecurityContextHolder.getContext().setAuthentication(authentication);
					}
				}
			}
		} catch (Exception ex) {
			log.error("Failed on set user authentication", ex);
		}

		filterChain.doFilter(request, response);
	}

	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");

		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}

}
