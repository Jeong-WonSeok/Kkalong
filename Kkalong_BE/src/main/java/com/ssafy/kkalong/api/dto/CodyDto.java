package com.ssafy.kkalong.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CodyDto {
    private int closet_id;
    private int user_id;
    private int creater_id;
    private String name;
    private String style;
    private boolean spring;
    private boolean summer;
    private boolean fall;
    private boolean winter;
    private List<Integer> clothings;
}
