package com.ssafy.kkalong.api.entity;

import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reply_id", nullable = false)
    private int id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cody_id", nullable = true)
    private Cody cody;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "help_id")
    private Help help;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "reply")
    private List<ReplyLike> replylikes = new ArrayList<>();
}
