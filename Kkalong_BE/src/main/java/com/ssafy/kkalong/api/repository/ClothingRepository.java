package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Clothing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothingRepository extends JpaRepository<Clothing, Integer> {

}
