package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findById(int user_id);

    User findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);


    List<User> findByNicknameContainingIgnoreCase(String nickname);

}