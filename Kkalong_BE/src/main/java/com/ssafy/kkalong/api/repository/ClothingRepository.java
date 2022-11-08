package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Brand;
import com.ssafy.kkalong.api.entity.Clothing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothingRepository extends JpaRepository<Clothing, Integer> {
    List<Clothing> findByBrand(Brand brand);

    Clothing findById(int clothes_id);
}
