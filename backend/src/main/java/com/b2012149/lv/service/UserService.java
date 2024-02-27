package com.b2012149.lv.service;

import com.b2012149.lv.entity.Authority;
import com.b2012149.lv.entity.ChatGPTConversation;
import com.b2012149.lv.entity.User;
import com.b2012149.lv.exception.ApiException;
import com.b2012149.lv.repository.AuthorityRepository;
import com.b2012149.lv.repository.ChatGPTConversationRepository;
import com.b2012149.lv.repository.UserRepository;
import com.b2012149.lv.request.ChangePasswordRequest;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.security.JwtTokenProvider;
import com.b2012149.lv.service.dto.AdminUserDTO;

import java.util.*;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class UserService implements UserDetailsService {
	private final Logger log = LoggerFactory.getLogger(UserService.class);
	private final UserRepository m_userRepository;
	private final AuthorityRepository m_authorityRepository;
	private final ChatGPTConversationRepository m_chatGPTConversationRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final ModelMapper m_modelMapper;

	public UserService(UserRepository userRepository, AuthorityRepository authorityRepository,
			JwtTokenProvider jwtService, ChatGPTConversationRepository chatGPTConversationRepository, ModelMapper modelMappe) {
		m_userRepository = userRepository;
		m_authorityRepository = authorityRepository;
		m_modelMapper = modelMappe;
		m_chatGPTConversationRepository = chatGPTConversationRepository;
		this.jwtTokenProvider = jwtService;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = m_userRepository.findByUserName(username);
		if (user == null) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Tên đăng nhập không tồn tại!");
		}
		return new CustomUserDetails(user);
	}

	@Transactional
	public UserDetails loadUserById(Long id) {
		User user = m_userRepository.findById(id)
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "User not found with id: " + id));
		return new CustomUserDetails(user);
	}

	public CustomPageableResponse<User> getAllUsers(String fullName, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		if(!fullName.equals(""))
			return new CustomPageableResponse<User>(m_userRepository.searchUserByFullName(fullName, pageable));
		return new CustomPageableResponse<User>(m_userRepository.findAll(pageable));
	}

	public User createUser(AdminUserDTO userDTO) {
		String username = userDTO.getUserName().toLowerCase();
		String email = userDTO.getEmail();
		if (m_userRepository.findByUserName(username) != null) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Tên đăng nhập đã tồn tại");
		}

		User user = new User();
		user.setUserName(username);
		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		if (email != null && !email.isEmpty()) {
			if (m_userRepository.findByEmail(email) != null) {
				throw new ApiException(HttpStatus.BAD_REQUEST, "Email đã tồn tại");
			}
			user.setEmail(userDTO.getEmail());
		}
		user.setImageUrl(userDTO.getImageUrl());
		user.setPassword(passwordEncoder().encode(userDTO.getPassword()));
		user.setActivated(true);
		if (userDTO.getAuthorities() != null) {
			System.out.println(userDTO.getAuthorities());
			Set<Authority> authorities = userDTO.getAuthorities().stream().map(m_authorityRepository::findById)
					.filter(Optional::isPresent).map(Optional::get).collect(Collectors.toSet());

			user.setAuthorities(authorities);
		}
		m_userRepository.save(user);
		
		// Create chat gpt conversation
		ChatGPTConversation chatGPTConversation = new ChatGPTConversation();
		chatGPTConversation.setUser(user);
		m_chatGPTConversationRepository.save(chatGPTConversation);

		log.debug(String.format("Created user %s success ", username));
		return user;
	}

	public User updateUser(AdminUserDTO userDTO, HttpServletRequest request) {
		User user = m_userRepository.findById(userDTO.getId())
				.orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Người dùng không tồn tại!"));;
		User userCheckingEmail = m_userRepository.findByEmail(userDTO.getEmail());
		if(!Objects.isNull(userCheckingEmail)) {
			if(userCheckingEmail.getId() != user.getId()) {
				throw new ApiException(HttpStatus.BAD_REQUEST, "Email đã tồn tại!");
			}
		}
		// Verify user is own
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String accessToken = authHeader.substring(7);
		Long userId = jwtTokenProvider.getUserIdFromJWT(accessToken);

		if (!userId.equals(user.getId())) {
			throw new ApiException(HttpStatus.FORBIDDEN, "Không đủ quyền! Bạn không thể cập nhật người khác");
		}

		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());

		if (userDTO.getEmail() != null) {
			user.setEmail(userDTO.getEmail());
		}

		user.setImageUrl(userDTO.getImageUrl());

		m_userRepository.save(user);

		log.debug(String.format("Updated user with id %s success ", userDTO.getId()));
		return user;
	}

	public void blockUser(Long id) {
		User user = m_userRepository.findById(id).orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Người dùng không tồn tại"));
		user.setActivated(false);

		m_userRepository.save(user);
		log.debug(String.format("Block user %s success ", user.getUserName()));
	}

	public void unBlockUser(Long id) {
		User user = m_userRepository.findById(id).orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Người dùng không tồn tại"));;
		user.setActivated(true);

		m_userRepository.save(user);
		log.debug(String.format("UnBlock user %s success ", user.getUserName()));
	}

	public User changePassword(ChangePasswordRequest changePasswordRequest, HttpServletRequest request) {
		User user = m_userRepository.findById(changePasswordRequest.getUserId()).get();

		// Verify user is own
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		String accessToken = authHeader.substring(7);
		Long userId = jwtTokenProvider.getUserIdFromJWT(accessToken);

		if (!userId.equals(user.getId())) {
			throw new ApiException(HttpStatus.FORBIDDEN, "Không đủ quyền! Bạn không thể đổi mật khẩu của người khác");
		}

		// Compare two password
		if (!passwordEncoder().matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Mật khẩu cũ không chính xác");
		}

		user.setPassword(passwordEncoder().encode(changePasswordRequest.getNewPassword()));
		m_userRepository.save(user);

		log.debug(String.format("Change password for user %s success ", user.getUserName()));
		return user;
	}

	public void deleteUser(Long id) {
		try {
			m_userRepository.deleteById(id);
		} catch (Exception e) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Người dùng không tồn tại với ID: " + id);
		}
		log.debug(String.format("Delete user id %s success ", id));
	}

	public User getUserByUsername(String username) {
		User user = m_userRepository.findByUserName(username);
		if (user == null) {
			throw new ApiException(HttpStatus.BAD_REQUEST, username + " không tồn tại");
		}
		return user;
	}
	
	public User getUserById(Long userId) {
		User user = m_userRepository.findById(userId).orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "Người dùng không tồn tại"));
		return user;
	}

	protected boolean isUserContains(final List<User> list, final String username) {
		return list.stream().anyMatch(o -> o.getUserName().equals(username));
	}
	
	public Long getTotalUser() {
		return m_userRepository.count();
	}
}
