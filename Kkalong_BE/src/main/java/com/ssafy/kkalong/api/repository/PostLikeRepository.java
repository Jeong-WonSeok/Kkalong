package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Post;
import com.ssafy.kkalong.api.entity.PostLike;
import com.ssafy.kkalong.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Integer> {

    int countByPostId(int post_id);

    List<PostLike> findByPost(Post post);

    boolean existsByPostAndUser(Post post, User user);

    @Transactional
    void deleteByPostAndUser(Post post, User user);
}