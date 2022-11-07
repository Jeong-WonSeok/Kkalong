package com.ssafy.kkalong.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HelpResponseDto {
    private int help_id;
    private boolean open;
    private String help_img;
    private String range;
    private String title;
    private String content;

}
