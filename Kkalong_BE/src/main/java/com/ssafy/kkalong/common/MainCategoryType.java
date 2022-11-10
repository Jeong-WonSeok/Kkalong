package com.ssafy.kkalong.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum MainCategoryType {
    TOP("TOP"),
    BOTTOM("BOTTOM"),
    OUTER("OUTER"),
    SHOES("SHOES"),
    ACC("ACC");

    private final String value;
}
