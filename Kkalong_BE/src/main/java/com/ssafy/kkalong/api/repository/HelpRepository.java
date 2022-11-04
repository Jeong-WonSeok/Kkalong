package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Help;
import com.ssafy.kkalong.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpRepository extends JpaRepository<Help, Integer> {

    Help findById(int help_id);

}