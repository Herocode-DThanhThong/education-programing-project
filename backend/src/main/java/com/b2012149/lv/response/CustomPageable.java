package com.b2012149.lv.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CustomPageable {
	int pageNumber;
	int pageSize;
	long offset;
	long totalElements;

	public CustomPageable(int pageNumber, int pageSize, long offset, long totalElements) {
		this.offset = offset;
		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
		this.totalElements = totalElements;
	}
}
