package com.ssafy.kkalong.api.entity;

import com.ssafy.kkalong.common.ClothesType;
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

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String img;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private ClothesType type;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private boolean spring;

    @Column(nullable = false)
    private boolean summer;

    @Column(nullable = false)
    private boolean fall;

    @Column(nullable = false)
    private boolean winter;

    @Column(nullable = false)
    private String gender;

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
