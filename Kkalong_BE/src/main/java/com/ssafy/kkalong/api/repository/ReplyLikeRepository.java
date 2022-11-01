package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.ReplyLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyLikeRepository extends JpaRepository<ReplyLike, Integer> {

}