package com.b2012149.lv.rest;

import com.b2012149.lv.entity.User;
import com.b2012149.lv.request.ChangePasswordRequest;
import com.b2012149.lv.response.CustomPageableResponse;
import com.b2012149.lv.service.CustomUserDetails;
import com.b2012149.lv.service.UserService;
import com.b2012149.lv.service.dto.AdminUserDTO;
import com.b2012149.lv.service.dto.LoginDTO;

import java.net.URISyntaxException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing users.
 * <p>
 * This class accesses the {@link com.axsdevone.newsfeedapp.enties.User} entity,
 * and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship
 * between User and Authority, and send everything to the client side: there
 * would be no View Model and DTO, a lot less code, and an outer-join which
 * would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities,
 * because people will quite often do relationships with the user, and we don't
 * want them to get the authorities all the time for nothing (for performance
 * reasons). This is the #1 goal: we should not impact our users' application
 * because of this use-case.</li>
 * <li>Not having an outer join causes n+1 requests to the database. This is not
 * a real issue as we have by default a second-level cache. This means on the
 * first HTTP call we do the n+1 requests, but then all authorities come from
 * the cache, so in fact it's much better than doing an outer join (which will
 * get lots of data from the database, for each HTTP call).</li>
 * <li>As this manages users, for security reasons, we'd rather have a DTO
 * layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this
 * case.
 */
@RestController
@RequestMapping("/api")
public class UserController {

	/*
	 * private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections
	 * .unmodifiableList(Arrays.asList("id", "login", "firstName", "lastName",
	 * "email", "activated", "langKey", "createdBy", "createdDate",
	 * "lastModifiedBy", "lastModifiedDate"));
	 */

	private final Logger log = LoggerFactory.getLogger(UserController.class);

	private final ModelMapper m_modelMapper;
	private final UserService m_userService;

	public UserController(UserService userService, ModelMapper modelMappe) {
		m_userService = userService;
		m_modelMapper = modelMappe;
	}

	/**
	 * {@code POST  /admin/users} : Creates a new user.
	 * <p>
	 * Creates a new user if the login and email are not already used, and sends an
	 * mail with an activation link. The user needs to be activated on creation.
	 *
	 * @param userDTO the user to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new user, or with status {@code 400 (Bad Request)} if the
	 *         login or email is already in use.
	 * @throws URISyntaxException       if the Location URI syntax is incorrect.
	 * @throws BadRequestAlertException {@code 400 (Bad Request)} if the login or
	 *                                  email is already in use.
	 */
	/*
	 * @PostMapping("/users") public ResponseEntity<User>
	 * createUser(@Valid @RequestBody AdminUserDTO userDTO) throws
	 * URISyntaxException { log.debug("REST request to save User : {}", userDTO);
	 * 
	 * if (userDTO.getId() != null) {
	 * 
	 * throw new BadRequestAlertException("A new user cannot already have an ID",
	 * "userManagement", "idexists");
	 * 
	 * } else { User newUser = userService.createUser(userDTO); return
	 * ResponseEntity.ok() .body(newUser); } return null; }
	 */

	/*
	 * @GetMapping("/helloworld") public ResponseEntity<LoginDTO> helloWorld()
	 * throws URISyntaxException { LoginDTO login = new LoginDTO(); login.setId(1L);
	 * login.setUserName("Hello"); log.info("Logged {}", login); return
	 * ResponseEntity.ok(login); }
	 */

	@RequestMapping("/helloworldtest")
	public LoginDTO helloWorld() {
		LoginDTO login = new LoginDTO();
		login.setId(1L);
		login.setUserName("Hello");
		log.info("Logged {}", login);
		return login;
	}

	@GetMapping("/user/{id}")
	public ResponseEntity<AdminUserDTO> getUser(@PathVariable("id") Long id) {
		CustomUserDetails userDetails = (CustomUserDetails) m_userService.loadUserById(id);
		return new ResponseEntity<AdminUserDTO>(convertToUserDTO(userDetails.getUser()), HttpStatus.OK);
	}

	@GetMapping("/users")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<CustomPageableResponse<User>> getAllUsers(
			@RequestParam(value = "text", defaultValue = "", required = false) String fullName,
			@RequestParam(value = "page", defaultValue = "0", required = false) int pageNo,
			@RequestParam(value = "size", defaultValue = "10", required = false) int pageSize) {
		return ResponseEntity.ok(m_userService.getAllUsers(fullName, pageNo, pageSize));
	}

	@PostMapping("/user/create")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<AdminUserDTO> createUser(@RequestBody AdminUserDTO userDTO) {
		User user = m_userService.createUser(userDTO);
		return new ResponseEntity<AdminUserDTO>(convertToUserDTO(user), HttpStatus.CREATED);
	}

	@PutMapping("/user/update")
	public ResponseEntity<AdminUserDTO> updateUser(@RequestBody AdminUserDTO userDTO, HttpServletRequest request) {
		User user = m_userService.updateUser(userDTO, request);
		return new ResponseEntity<AdminUserDTO>(convertToUserDTO(user), HttpStatus.OK);
	}

	@PutMapping("/user/block/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public void blockUser(@PathVariable("id") Long id) {
		m_userService.blockUser(id);
	}

	@PutMapping("/user/unblock/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public void unBlockUser(@PathVariable("id") Long id) {
		m_userService.unBlockUser(id);
	}

	@PutMapping("/user/changepassword")
	public ResponseEntity<AdminUserDTO> changePasswordUser(@RequestBody ChangePasswordRequest changePassRequest,
			HttpServletRequest request) {
		User user = m_userService.changePassword(changePassRequest, request);
		return new ResponseEntity<AdminUserDTO>(convertToUserDTO(user), HttpStatus.OK);
	}

	@DeleteMapping("/users/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public void deleteUser(@PathVariable("id") Long id) {
		m_userService.deleteUser(id);
	}
	
	@GetMapping("/users/total")
	public ResponseEntity<Long> getTotalUser() {
		return ResponseEntity.ok(m_userService.getTotalUser());
	}

	private AdminUserDTO convertToUserDTO(User user) {
		AdminUserDTO userDTO = m_modelMapper.map(user, AdminUserDTO.class);
		return userDTO;
	}

}
