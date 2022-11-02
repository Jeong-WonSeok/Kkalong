package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.ClosetClothing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClosetClothingRepository extends JpaRepository<ClosetClothing, Integer> {

}
