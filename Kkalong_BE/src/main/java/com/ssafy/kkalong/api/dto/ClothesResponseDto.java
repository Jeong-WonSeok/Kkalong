package com.ssafy.kkalong.api.dto;

import com.ssafy.kkalong.common.ClothesType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClothesResponseDto {
    private String img;
    private String name;
    private ClothesType type;
    private String url;
}
