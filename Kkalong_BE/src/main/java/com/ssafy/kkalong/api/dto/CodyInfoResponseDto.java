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
public class CodyInfoResponseDto {
    private int cody_id;
    private String img;
    private String name;
    private boolean open;
    private String style;
    private List<String> season;
    private List<Integer> clothings;
}
