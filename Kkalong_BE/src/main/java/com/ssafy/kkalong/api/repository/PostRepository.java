package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.dto.BestDressResponseInterface;
import com.ssafy.kkalong.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query(nativeQuery = true, value = "select p.post_id as id, p.img as img, count(l.post_id) as likecount, p.content as content from post as p " +
            "left join post_like as l on p.post_id = l.post_id " + "left join user as u on p.user_id = u.user_id group by p.post_id order by count(l.post_id) DESC  limit 3")
    List<BestDressResponseInterface> findByBestDress();

    @Query(nativeQuery = true, value = "select p.post_id as id, p.img as img, count(l.post_id) as likecount, p.content as content from post as p " +
            "left join post_like as l on p.post_id = l.post_id " + "left join user as u on p.user_id = u.user_id group by p.post_id")
    List<BestDressResponseInterface> findByAllBestDress();

    @Query(nativeQuery = true, value = "select p.post_id as id, p.img as img, count(l.post_id) as likecount, p.content as content from post as p " +
            "left join post_like as l on p.post_id = l.post_id " + "left join user as u on p.user_id = u.user_id where p.post_id = :post_id ")
    BestDressResponseInterface findByDressPost(int post_id);

    Post findById(int post_id);

    @Query("select d from Post d where d.user.id = :user_id")
    List<Post> findAllByUserId(@Param("user_id") Integer user_id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update post set content = :content , img = :img where post_id = :post_id ")
    void updatePost(String content, String img, int post_id);

}