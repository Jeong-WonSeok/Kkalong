package com.ssafy.kkalong.api.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupDto {
    private String email;
    private String password;
    private String nickname;
    private int age;
    private String gender;
    private int height;
    private int weight;
    private String provider;
}