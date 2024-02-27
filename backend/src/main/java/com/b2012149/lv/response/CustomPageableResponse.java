package com.b2012149.lv.response;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomPageableResponse<T> {
	List<T> content;
	CustomPageable pageable;

	public CustomPageableResponse(Page<T> page) {
		this.content = page.getContent();
		this.pageable = new CustomPageable(page.getPageable().getPageNumber(), page.getPageable().getPageSize(),
				page.getPageable().getOffset(), page.getTotalElements());
	}
	
	public CustomPageableResponse(List<T> content, Pageable pageable, long totalElements) {
		this.content = content;
		this.pageable = new CustomPageable(pageable.getPageNumber(), pageable.getPageSize(),
				pageable.getOffset(), totalElements);
	}

}
