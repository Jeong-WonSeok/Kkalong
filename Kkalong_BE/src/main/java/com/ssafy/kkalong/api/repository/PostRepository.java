package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.dto.BestDressRequestDto;
import com.ssafy.kkalong.api.dto.BestDressResponseDto;
import com.ssafy.kkalong.api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query(nativeQuery = true, value = "select p.post_id, p.img, count(l.post_id) as 'like', p.content from post as p " +
            "left join post_like as l on p.post_id = l.post_id " + "left join user as u on p.user_id = u.user_id order by count(l.post_id) DESC  limit 3")
    List<BestDressResponseDto> findByBestDress();

    @Query(nativeQuery = true, value = "select p.post_id, p.img, count(l.post_id) as 'like', p.content from post as p " +
            "left join post_like as l on p.post_id = l.post_id " + "left join user as u on p.user_id = u.user_id order by p.create_at")
    List<BestDressResponseDto> findAllByPost();

    Post findById(int post_id);


}