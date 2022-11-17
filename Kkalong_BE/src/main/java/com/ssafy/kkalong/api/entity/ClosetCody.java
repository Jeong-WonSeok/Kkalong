package com.ssafy.kkalong.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClosetCody {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="closetcody_id", nullable = false)
    private int id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="closet_id")
    private Closet closet;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cody_id")
    private Cody cody;

}
