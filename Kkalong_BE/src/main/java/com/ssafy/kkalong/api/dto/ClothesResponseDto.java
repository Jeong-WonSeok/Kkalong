package com.ssafy.kkalong.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClothesResponseDto {
    private int clothing_id;
    private String img;
    private String name;
    private int mainCategory;
    private int subCategory;
    private String url;
}
