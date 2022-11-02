package com.ssafy.kkalong.api.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Fitting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="fitting_id", nullable = false)
    private int id;

    @Column(nullable = false)
    private String img;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
