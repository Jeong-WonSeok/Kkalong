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
public class Closet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="closet_id", nullable = false)
    private int id;

    private String name;

    private boolean base;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "closet")
    private List<ClosetClothing> clothings = new ArrayList<>();

    @OneToMany(mappedBy = "closet")
    private List<ClosetCody> codies = new ArrayList<>();
}
