package com.ssafy.kkalong.api.entity;

import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Clothing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="clothing_id", nullable = false)
    private int id;

    private String name;

    private String img;
    //옷장에 들어가는 옷은 null처리
    private int code;

    private String color;

    private String main_category;

    private String sub_category;

    private boolean spring;

    private boolean summer;

    private boolean fall;

    private boolean winter;

    private String gender;

    private String url;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @OneToMany(mappedBy = "clothing")
    List<ClosetClothing> closet = new ArrayList<>();

    @OneToMany(mappedBy = "clothing")
    List<CodyClothing> cody = new ArrayList<>();

    @OneToMany(mappedBy = "clothing")
    List<RecommendClothing> recommend = new ArrayList<>();

    @OneToMany(mappedBy = "clothing")
    List<Review> reviews = new ArrayList<>();

}
