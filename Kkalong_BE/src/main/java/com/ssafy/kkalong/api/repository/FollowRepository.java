package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Follow;
import com.ssafy.kkalong.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {

    Follow findBySenderAndReceiver(User sender, User receiver);

    List<Follow> findAllBySender(User sender);

    List<Follow> findAllByReceiver(User receiver);

}