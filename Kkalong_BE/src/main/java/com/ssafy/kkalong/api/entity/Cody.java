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
public class Cody {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cody_id", nullable = false)
    private int id;

    private String img;

    private Boolean open;

    private int creator;

    private String name;

    private String style;

    private boolean spring;

    private boolean summer;

    private boolean fall;

    private boolean winter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "cody")
    private List<CodyClothing> clothings = new ArrayList<>();

    @OneToMany(mappedBy = "cody")
    List<ClosetCody> codies = new ArrayList<>();

    public void setCodyImgUrl(String imgUrl){
        this.img = imgUrl;
    }
}
