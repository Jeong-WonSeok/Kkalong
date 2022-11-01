package com.ssafy.kkalong.api.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CodyClothing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="codyclothing_id", nullable = false)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cody_id")
    private Cody cody;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="clothing_id")
    private Clothing clothing;
}
