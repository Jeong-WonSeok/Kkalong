package com.ssafy.kkalong.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClothingDto {
    private int closet_id;
    private String mainCategory;
    private String subCategory;
    private boolean spring;
    private boolean summer;
    private boolean fall;
    private boolean winter;
    private String color;
    private String gender;
    private int brand_id;
}
