package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Post;
import com.ssafy.kkalong.api.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Integer> {

    int countByPost(int post);
}