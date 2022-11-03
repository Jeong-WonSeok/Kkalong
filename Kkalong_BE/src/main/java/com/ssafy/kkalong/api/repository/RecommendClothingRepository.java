package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.RecommendClothing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendClothingRepository extends JpaRepository<RecommendClothing, Integer> {

}
