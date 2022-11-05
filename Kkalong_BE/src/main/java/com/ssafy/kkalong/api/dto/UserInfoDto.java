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
public class UserInfoDto {
    private String email;
    private String nickname;
    private int age;
    private String gender;
    private int height;
    private int weight;
    private String provider;
    private List<Integer> followers;
    private List<Integer> followings;

}
