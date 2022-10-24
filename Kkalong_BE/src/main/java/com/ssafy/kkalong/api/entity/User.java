package com.ssafy.kkalong.api.entity;

import lombok.*;
import org.springframework.stereotype.Controller;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="USER")
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Setter
    @Column(nullable=false, unique = true, length = 50)
    private String email;

    @Setter
    @Column(nullable=false, unique = true)
    private String nickname;

    @Setter
    @Column(nullable = true)
    private String password;

    @Setter
    @Column(nullable = false)
    private Character gender;

    @Setter
    @Column(nullable = false)
    private String age;

    @Setter
    @Column(nullable = false)
    private String height;

    @Setter
    @Column(nullable = false)
    private String weight;

    @Setter
    @Column(nullable = false)
    private String provider;

    @Setter
    @Column(nullable = true)
    private String img;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Closet> closets = new ArrayList<>();

}
