package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Closet;
import com.ssafy.kkalong.api.entity.ClosetClothing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClosetClothingRepository extends JpaRepository<ClosetClothing, Integer> {

    List<ClosetClothing> findAllByCloset(Closet closet);
}
