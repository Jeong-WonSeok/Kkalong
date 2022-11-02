package com.ssafy.kkalong.api.dto;

import com.ssafy.kkalong.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BestDressResponseDto extends BaseEntity {
    private int post_id;
    private String post_img;
    private String content;
    private int like;
}
