package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.ClosetCody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClosetCodyRepository extends JpaRepository<ClosetCody, Integer> {

}
