package com.ssafy.kkalong.api.dto;

import com.ssafy.kkalong.api.entity.Cody;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReplyRequestDto {
    private String content;
    private int codi_id;
}