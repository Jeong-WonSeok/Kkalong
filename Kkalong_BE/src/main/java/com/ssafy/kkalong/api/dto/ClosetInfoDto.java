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
public class ClosetInfoDto{
    private int closet_id;
    private String name;
    private List<ClothingInfoResponseDto> clothings;
    private List<CodyInfoResponseDto> codies;
}
