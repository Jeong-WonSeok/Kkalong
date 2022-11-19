package com.ssafy.kkalong.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(nullable=false, unique = true)
    private String password;

    private String gender;

    private int age;

    private int height;

    private int weight;

    @Column(nullable = false)
    private String provider;

    private String profile_img;

    private String face_img;

    private String body_img;

    private String personal_color;

    private boolean loving;

    private int lover_id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToMany(mappedBy = "user")
    private List<Closet> closets = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<Fitting> fittings = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<Post> posts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<Help> helps = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<PostLike> likeposts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    private List<ReplyLike> likereplys = new ArrayList<>();

    public void setUserInfo(SignupDto signupDto){
        this.nickname = signupDto.getNickname();
        this.gender = signupDto.getGender();
        this.age = signupDto.getAge();
        this.height = signupDto.getHeight();
        this.weight = signupDto.getWeight();
        this.profile_img = "https://firebasestorage.googleapis.com/v0/b/kkalong-b4cec.appspot.com/o/profile_img.jpg?alt=media";
        this.loving = false;
        this.lover_id = -1;
        this.role = UserRole.ROLE_USER;
    }

    public void setLoveInfo(int lover_id) {
        this.loving = true;
        this.lover_id = lover_id;
    }

    public void resetLoveInfo() {
        this.loving = false;
        this.lover_id = -1;
    }

    public void updateProfileImg(String profile_img){
        this.profile_img = profile_img;
    }

    public void updatePersonalColor(String personal_color) {this.personal_color = personal_color; }

    public void updateFaceImg(String face_img){
        this.face_img = face_img;
    }

    public void updateBodyImg(String body_img){
        this.body_img = body_img;
    }
}
