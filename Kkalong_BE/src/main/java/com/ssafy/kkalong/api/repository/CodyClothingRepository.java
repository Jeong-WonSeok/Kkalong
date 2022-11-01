package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.CodyClothing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodyClothingRepository extends JpaRepository<CodyClothing, Integer> {

}
