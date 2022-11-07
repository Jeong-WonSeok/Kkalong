package com.ssafy.kkalong.api.entity;

import com.ssafy.kkalong.common.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Help extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="help_id", nullable = false)
    private int id;

    private String openrange;

    private String title;

    private String content;

    private String img;

    @Column(nullable = false)
    private Boolean open;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "help", cascade = {CascadeType.REMOVE})
    private List<Reply> replies = new ArrayList<>();
}
