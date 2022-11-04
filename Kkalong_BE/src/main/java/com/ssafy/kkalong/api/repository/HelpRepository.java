package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Help;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HelpRepository extends JpaRepository<Help, Integer> {

    @Query("select d from Help d where d.user.id = :user_id")
    List<Help> findAllByUserId(@Param("user_id") Integer user_id);

    Help findById(int help_id);

}