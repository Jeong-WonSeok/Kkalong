package com.ssafy.kkalong.api.dto;

import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.common.UserRole;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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