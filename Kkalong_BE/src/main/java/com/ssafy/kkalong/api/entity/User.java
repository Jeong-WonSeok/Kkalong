package com.ssafy.kkalong.api.entity;

import com.ssafy.kkalong.api.dto.SignupDto;
import com.ssafy.kkalong.common.BaseEntity;
import com.ssafy.kkalong.common.UserRole;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "email", "nickname", "password", "age", "gender", "height", "weight"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id", nullable = false)
    private int id;

    @Column(nullable=false, unique = true, length = 50)
    private String email;

    @Column(nullable=false, unique = true)
    private String nickname;

    @Column(nullable=false, unique = true)
    private String password;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private int height;

    @Column(nullable = false)
    private int weight;

    @Column(nullable = false)
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

    public User orElse(Object o) {
        return null;
    }
}
