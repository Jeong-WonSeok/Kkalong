package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Love;
import com.ssafy.kkalong.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoveRepository extends JpaRepository<Love, Integer> {

    Love findBySenderAndReceiver(User sender, User receiver);

    List<Love> findAllBySender(User sender);

    List<Love> findAllByReceiver(User receiver);

}