package com.ssafy.kkalong.api.entity;

import com.ssafy.kkalong.api.dto.SignupDto;
import com.ssafy.kkalong.common.UserRole;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "email", "password"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id", nullable = false)
    private int id;

    @Column(nullable=false, unique = true, length = 50)
    private String email;

    @Column(unique = true)
    private String nickname;

    private String password;

    private String gender;

    private int age;

    private int height;

    private int weight;

    private String provider;

    private String img;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToMany(mappedBy = "user")
    private List<Closet> closets = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<Fitting> fittings = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<Help> helps = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<PostLike> likeposts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<ReplyLike> likereplys = new ArrayList<>();

    public void setUserInfo(SignupDto signupDto){
        this.nickname = signupDto.getNickname();
        this.gender = signupDto.getGender();
        this.age = signupDto.getAge();
        this.height = signupDto.getHeight();
        this.weight = signupDto.getWeight();
    }

}
