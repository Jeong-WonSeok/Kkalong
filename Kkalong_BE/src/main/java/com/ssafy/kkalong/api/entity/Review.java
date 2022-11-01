package com.ssafy.kkalong.api.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review_id", nullable = false)
    private int id;

    private String gender;

    private String weight;

    private String height;

    private String size;

    private String color;

    private String brightness;

    private String thickness;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="clothing_id")
    private Clothing clothing;

}
