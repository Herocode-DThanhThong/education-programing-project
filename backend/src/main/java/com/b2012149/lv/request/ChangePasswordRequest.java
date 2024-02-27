package com.b2012149.lv.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
	private Long userId;
	private String oldPassword;
	private String newPassword;
	private String lastModifiedBy;
}
