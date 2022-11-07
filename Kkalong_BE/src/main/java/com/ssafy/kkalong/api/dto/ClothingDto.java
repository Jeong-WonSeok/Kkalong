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
public class ClothingDto {
    private int closet_id;
    private String closet_name;
    private List<ClothingDto> clothings;
    private List<CodyDto> codies;
}
