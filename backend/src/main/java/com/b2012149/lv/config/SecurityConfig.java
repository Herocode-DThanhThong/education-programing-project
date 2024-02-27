package com.b2012149.lv.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.b2012149.lv.security.JwtRequestFilter;
import com.b2012149.lv.security.JwtTokenProvider;
import com.b2012149.lv.service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final UserService m_userService;
	private final JwtTokenProvider m_tokenUserDetailService;
	private final AuthenticationEntryPoint authEntryPoint;

	public SecurityConfig(JwtTokenProvider tokenUserDetailService, UserService userService,
			AuthenticationEntryPoint authEntryPoint) {
		m_tokenUserDetailService = tokenUserDetailService;
		m_userService = userService;
		this.authEntryPoint = authEntryPoint;
	}

	@Bean
	public JwtRequestFilter jwtAuthenticationFilter() {
		return new JwtRequestFilter(m_tokenUserDetailService, m_userService);
	}

	@Bean
	public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder = http
				.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.userDetailsService(m_userService).passwordEncoder(m_userService.passwordEncoder());
		return authenticationManagerBuilder.build();
	}

	@Bean
	protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().authorizeRequests()
				.antMatchers("/api/login").permitAll()
				.antMatchers("/api/register").permitAll()
				.antMatchers("/api/logout").permitAll().antMatchers("/ws/**").permitAll()
				.antMatchers("/api/user/create", "/api/users", "/api/user/delete/*", "/api/user/block/*",
						"/api/user/unblock/*")
				.hasAuthority("ROLE_ADMIN").anyRequest().authenticated()
				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and().logout().logoutUrl("/rest/api/logout")
				.and().exceptionHandling().authenticationEntryPoint(authEntryPoint);
		;

		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

}
