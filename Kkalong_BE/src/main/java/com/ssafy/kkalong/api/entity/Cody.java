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

    @Column(nullable = false, unique = true)
    private int code;

    @Column(nullable = false)
    private String img;

    @Column(nullable = false)
    private Boolean open;

    private int creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "cody")
    private List<CodyClothing> clothings = new ArrayList<>();


}
