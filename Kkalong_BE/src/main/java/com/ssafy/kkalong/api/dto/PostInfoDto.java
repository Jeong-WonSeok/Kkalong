package com.ssafy.kkalong.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostInfoDto {
    private int post_id;
    private String post_img;
    private int like;
    private int user_id;
    private String nickname;
    private String profile_img;
}