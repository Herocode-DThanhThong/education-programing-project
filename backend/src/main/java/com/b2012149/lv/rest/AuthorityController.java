package com.b2012149.lv.rest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b2012149.lv.entity.Authority;
import com.b2012149.lv.service.AuthorityService;

@RestController
@RequestMapping("/api")
public class AuthorityController {
	private final AuthorityService authorrityService;

	public AuthorityController(AuthorityService authorrityService) {
		this.authorrityService = authorrityService;
	}
	
	@GetMapping("/authority")
	public ResponseEntity<List<Authority>> getAuthorities(){
		return new ResponseEntity<List<Authority>>(authorrityService.getAll(),HttpStatus.OK);
	}
}
