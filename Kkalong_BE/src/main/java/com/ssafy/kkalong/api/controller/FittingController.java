package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.BrandResponseDto;
import com.ssafy.kkalong.api.dto.ClothesResponseDto;
import com.ssafy.kkalong.api.entity.Clothing;
import com.ssafy.kkalong.api.service.FittingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/aifitting")
public class FittingController {

    private final FittingService fittingService;

    @GetMapping("/brand")
    public ResponseEntity<?> selectAllBrand(){
        Map<String, Object> result = new HashMap<>();
        List<BrandResponseDto> brandList = fittingService.selectAllBrand();
        result.put("brand_id", brandList);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/brand/{brand_id}")
    public ResponseEntity<?> selectBrandClothes(@PathVariable int brand_id){
        Map<String, Object> result = new HashMap<>();
        List<Clothing> clothes = fittingService.selectClothesByBrand(brand_id);
        List<Map<String, Object>> cloList = new ArrayList<>();
        for(Clothing clo : clothes){
            Map<String, Object> img = new HashMap<>();
            img.put("img", clo.getImg());
            img.put("id", clo.getId());
            Map<String,Object> clothes_id = new HashMap<>();
            clothes_id.put("clothes_id", img);
            cloList.add(clothes_id);
        }
        result.put("brand_id", cloList);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/brand/{brand_id}/{clothes_id}")
    public ResponseEntity<?> selectClothes(@PathVariable int brand_id, @PathVariable int clothes_id){
        ClothesResponseDto clothes = fittingService.selectClothes(clothes_id);
        Map<String, Object> result = new HashMap<>();
        result.put("clothes_id", clothes);
        return ResponseEntity.ok().body(result);
    }
}
