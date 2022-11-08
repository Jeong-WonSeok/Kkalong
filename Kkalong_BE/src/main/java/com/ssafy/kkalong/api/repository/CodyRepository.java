package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Cody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CodyRepository extends JpaRepository<Cody, Integer> {
    Cody findById(int cody_id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update cody set open = true where cody_id = :cody_id")
    void updateCodi(int cody_id);
}