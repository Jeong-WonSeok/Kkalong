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
public class CodyDto {
    private int closet_id;
    private String closet_name;
    private List<CodyDto> clothings;
    private List<CodyDto> codies;
}
