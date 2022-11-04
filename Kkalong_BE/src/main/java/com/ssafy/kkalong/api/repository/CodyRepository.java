package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Cody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodyRepository extends JpaRepository<Cody, Integer> {
    Cody findById(int cody_id);
}