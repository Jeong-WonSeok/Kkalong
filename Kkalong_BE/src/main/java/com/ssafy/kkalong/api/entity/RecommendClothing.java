package com.ssafy.kkalong.api.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommendClothing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="recommendclothing_id", nullable = false)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="recommend_id")
    private Recommend recommend;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="clothing_id")
    private Clothing clothing;
}
