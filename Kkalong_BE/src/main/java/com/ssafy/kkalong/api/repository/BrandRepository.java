package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {

    Brand findById(int brand_id);

}