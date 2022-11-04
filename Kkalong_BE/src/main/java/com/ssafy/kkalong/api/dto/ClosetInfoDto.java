package com.ssafy.kkalong.api.dto;

import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClosetInfoDto{
    private int closet_id;
    private String closet_name;
    private List<ClothingDto> clothings;
    private List<CodyDto> codies;
}
