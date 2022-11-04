package com.ssafy.kkalong.api.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDto {
    private int user_id;
    private String nickname;
    private List<Integer> followers;
    private List<Integer> followings;
}