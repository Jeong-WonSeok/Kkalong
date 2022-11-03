package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Comment findByPost(int Post_id);

}