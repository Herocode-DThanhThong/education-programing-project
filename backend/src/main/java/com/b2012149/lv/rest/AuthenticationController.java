package com.b2012149.lv.rest;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.Authority;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.response.LoginResponse;
import com.b2012149.lv.response.RegisterResponse;
import com.b2012149.lv.security.JwtTokenProvider;
import com.b2012149.lv.service.CustomUserDetails;
import com.b2012149.lv.service.TokenCache;
import com.b2012149.lv.service.UserService;
import com.b2012149.lv.service.dto.AdminUserDTO;
import com.b2012149.lv.service.dto.LoginDTO;
import com.b2012149.lv.service.dto.LogoutDTO;
import com.b2012149.lv.service.dto.RegisterDTO;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

	private final AuthenticationManager m_authenticationManager;
	private final JwtTokenProvider m_jwtTokenProvider;
	private final UserService m_userService;
	private final Logger log = LoggerFactory.getLogger(UserController.class);

	public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenProvider jwtService,
			UserService userService) {
		m_authenticationManager = authenticationManager;
		m_jwtTokenProvider = jwtService;
		m_userService = userService;

	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginDTO request) {

		try {
			Authentication authentication = m_authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} catch (BadCredentialsException ex) {
			log.error("Authenticate failure", ex);
			throw new ApiException(HttpStatus.BAD_REQUEST,
					"Tài khoản hoặc mật khẩu không đúng!");
		} catch (LockedException ex) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Tài khoản của bạn đã bị khóa");
		}

		UserDetails userDetail = m_userService.loadUserByUsername(request.getUserName());
		CustomUserDetails customUserDetails = (CustomUserDetails) userDetail;
		String jwt = m_jwtTokenProvider.generateTokenLogin(customUserDetails);
		Long id = customUserDetails.getUser().getId();
		Set<Authority> lAuthroity = customUserDetails.getUser().getAuthorities();
		TokenCache.addToken(jwt, id);

		return new ResponseEntity<LoginResponse>(new LoginResponse(id, jwt, userDetail.getUsername(),
				m_jwtTokenProvider.getExpireToken(jwt), lAuthroity), HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<RegisterResponse> register(@RequestBody RegisterDTO request) {

		User nUser = new User();

		nUser.setUserName(request.getUserName());
		nUser.setFirstName(request.getFirstName());
		nUser.setLastName(request.getLastName());
		nUser.setPassword(request.getPassword());
		nUser.setEmail(request.getEmail());
		nUser.setImageUrl(request.getImageUrl());
		nUser.setAuthorities(request.getAuthorities());

		User savedUser = m_userService.createUser(new AdminUserDTO(nUser));

		return new ResponseEntity<RegisterResponse>(new RegisterResponse(savedUser.getId(), savedUser.getUserName(),
				savedUser.getFirstName(), savedUser.getLastName(), savedUser.getEmail(), savedUser.getImageUrl(),
				savedUser.getAuthorities()), HttpStatus.OK);
	}

	@PutMapping("/logout")
	public ResponseEntity<String> logout(@RequestBody LogoutDTO request) {
		String token = request.getToken();
		TokenCache.getToken().remove(token);

		return new ResponseEntity<String>("Logout successfully!!", HttpStatus.OK);
	}

}
