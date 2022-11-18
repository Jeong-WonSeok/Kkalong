package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Cody;
import com.ssafy.kkalong.api.entity.CodyClothing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CodyClothingRepository extends JpaRepository<CodyClothing, Integer> {

    List<CodyClothing> findAllByCody(Cody cody);

}
