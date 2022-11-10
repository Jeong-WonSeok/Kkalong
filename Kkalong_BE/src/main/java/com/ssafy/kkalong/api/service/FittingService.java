package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.dto.BrandResponseDto;
import com.ssafy.kkalong.api.dto.ClothesResponseDto;
import com.ssafy.kkalong.api.dto.ClothingDto;
import com.ssafy.kkalong.api.entity.Brand;
import com.ssafy.kkalong.api.entity.Clothing;
import com.ssafy.kkalong.api.repository.BrandRepository;
import com.ssafy.kkalong.api.repository.ClothingRepository;
import org.checkerframework.checker.units.qual.C;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FittingService {

    @Autowired
    BrandRepository brandRepository;
    @Autowired
    ClothingRepository clothingRepository;

    public List<BrandResponseDto> selectAllBrand() {
        List<Brand> brandList = brandRepository.findAll();
        List<BrandResponseDto> brandDtoList = new ArrayList<>();
        for(Brand b : brandList){
            BrandResponseDto brandDto = new BrandResponseDto();

            brandDto.setName(b.getKorean_name());
            brandDto.setImg(b.getImg());

            brandDtoList.add(brandDto);
        }

        return brandDtoList;
    }

    public List<Clothing> selectClothesByBrand(int brand_id) {
        Brand brand = brandRepository.findById(brand_id);
        return clothingRepository.findByBrand(brand);
    }

    public ClothesResponseDto selectClothes(int clothing_id) {
        System.out.println("int" + clothing_id);
        Clothing clothes = clothingRepository.findById(clothing_id);
        System.out.println("gege" + clothes.getId());
        ClothesResponseDto clothesDto = new ClothesResponseDto();
        clothesDto.setImg(clothes.getImg());
        clothesDto.setName(clothes.getName());
        clothesDto.setMainCategory(clothes.getMain_category());
        clothesDto.setUrl(clothes.getUrl());
        return clothesDto;
    }
}
