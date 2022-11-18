package com.ssafy.kkalong.api.dto;

import com.ssafy.kkalong.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BestDressRequestDto extends BaseEntity {

    private MultipartFile post_img;
    private String content;



}
