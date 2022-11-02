package com.ssafy.kkalong.api.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuthCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="authcode_id", nullable = false)
    private int id;

    @Column(unique = true)
    private String email;

    private String code;

    public void setAuthCode(String email, String code) {
        this.email = email;
        this.code = code;
    }

}
