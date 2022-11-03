package com.ssafy.kkalong.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HelpRequestDto {
    private String range;
    private String content;
    private String title;
    private Boolean open;
    private String img;
}
