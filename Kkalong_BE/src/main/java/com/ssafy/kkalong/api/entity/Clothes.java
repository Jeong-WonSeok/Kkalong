package com.ssafy.kkalong.api.entity;

import com.ssafy.kkalong.common.ClothesType;
import lombok.*;
import org.springframework.stereotype.Controller;

import javax.persistence.*;

@Entity
@Table(name="CLOTHES")
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Clothes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Setter
    @Column(nullable = false)
    private String name;

    @Setter
    @Column(nullable = false)
    private String img;

    @Setter
    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private ClothesType type;

    @Column(nullable = false)
    private int season;

    @Column(nullable = false)
    @OneToOne(mappedBy = "clothes")
    private Brand brand;

}
