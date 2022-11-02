package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {

}