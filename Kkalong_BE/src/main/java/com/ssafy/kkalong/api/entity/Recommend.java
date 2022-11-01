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
public class Recommend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="recommend_id", nullable = false)
    private int id;

    @Column(nullable = false)
    private String img;

    @Column(nullable = false)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "recommend")
    private List<RecommendClothing> clothings = new ArrayList<>();


}
