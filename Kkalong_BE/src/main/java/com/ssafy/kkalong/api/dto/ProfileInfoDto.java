package com.ssafy.kkalong.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileInfoDto {
    private int user_id;
    private String nickname;
    private String profile_img;
    private boolean isLoving;
    private int lover_id;
}