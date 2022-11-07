package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Closet;
import com.ssafy.kkalong.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClosetRepository extends JpaRepository<Closet, Integer> {

    List<Closet> findAllByUser(User user);

}