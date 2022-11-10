package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Closet;
import com.ssafy.kkalong.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClosetRepository extends JpaRepository<Closet, Integer> {

    Closet findById(int closet_id);

    List<Closet> findAllByUser(User user);

    @Query("select c from Closet c where c.user.id = :user_id and c.base=true")
    Closet findBaseClosetByUserId(int user_id);
}