package com.b2012149.lv.service.dto;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
public class ExerciseDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	private String ques;
	private String keyA;
	private String keyB;
	private String keyC;
	private String keyD;
	private String correctKey;
	private String lessonId;

}
