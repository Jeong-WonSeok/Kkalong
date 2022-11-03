package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Follow;
import com.ssafy.kkalong.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {

    List<Follow> findAllBySender(User sender);

    List<Follow> findAllByReceiver(User receiver);

}