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
public class ClothingInfoResponseDto {
    private int closet_id;
    private int clothing_id;
    private String img;
    private int mainCategory;
    private int subCategory;
    private List<String> season;
    private String style;
    private String color;
    private String personal_color;
    private String gender;
    private int brand_id;
    private String url;
}
