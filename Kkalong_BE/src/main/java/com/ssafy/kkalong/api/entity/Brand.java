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
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="brand_id", nullable = false)
    private int id;

    @Column(nullable=false, unique = true)
    private String name;

    @Column(nullable = false)
    private String img;

    @OneToMany(mappedBy = "brand")
    private List<Clothing> clothings = new ArrayList<>();

}
