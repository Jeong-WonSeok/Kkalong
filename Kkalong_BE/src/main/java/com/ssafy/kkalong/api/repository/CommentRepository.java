package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Comment;
import com.ssafy.kkalong.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {


    @Query(nativeQuery = true, value = "select c.* from comment c left join post p on c.post_id = p.post_id where p.post_id = :post_id")
    List<Comment> findByPost(int post_id);

    Comment findById(int comment_id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update comment set content = :content where comment_id = :comment_id")
    void updateComment(int comment_id, String content);
}