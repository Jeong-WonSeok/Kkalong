package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.AuthCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthCodeRepository extends JpaRepository<AuthCode, Integer> {

    AuthCode findByEmail(String email);

    boolean existsByEmail(String email);
}