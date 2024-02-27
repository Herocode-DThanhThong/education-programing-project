package com.b2012149.lv.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2012149.lv.entity.Authority;
import com.b2012149.lv.repository.AuthorityRepository;

@Service
@Transactional
public class AuthorityService {
	private final Logger log = LoggerFactory.getLogger(AuthorityService.class);
	private final AuthorityRepository authorityRepository;

	public AuthorityService(AuthorityRepository authorityRepository) {
		this.authorityRepository = authorityRepository;
	}
	
		public List<Authority> getAll() {
        return authorityRepository.findAll();
    }

}
