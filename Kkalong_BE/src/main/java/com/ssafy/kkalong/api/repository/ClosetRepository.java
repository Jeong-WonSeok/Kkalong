package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Closet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClosetRepository extends JpaRepository<Closet, Integer> {

}