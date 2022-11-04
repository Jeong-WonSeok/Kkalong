package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Help;
import com.ssafy.kkalong.api.entity.Post;
import com.ssafy.kkalong.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query(nativeQuery = true, value = "select p.post_id, p.img, count(l.post_id) as like, u.nickname, u.img from post as p " +
            "left join post_like as l on p.post_id = l.post_id " + "left join user as u on p.user_id = u.user_id order by count(l.post_id) DESC  limit 3")
    List<Post> findByBestDress();

    Post findById(int post_id);

    @Query("select d from Post d where d.user.id = :user_id")
    List<Post> findAllByUserId(@Param("user_id") Integer user_id);

}