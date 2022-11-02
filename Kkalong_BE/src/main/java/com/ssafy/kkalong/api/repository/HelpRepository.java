package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Help;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpRepository extends JpaRepository<Help, Integer> {

}