package com.ssafy.kkalong.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CodyResponseDto {
    private int cody_id;
    private String img;
    private String name;
    private boolean open;
    private String personal_color;
}
