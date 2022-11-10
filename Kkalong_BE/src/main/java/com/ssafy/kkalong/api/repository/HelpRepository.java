package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.dto.HelpRequestDto;
import com.ssafy.kkalong.api.entity.Help;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface HelpRepository extends JpaRepository<Help, Integer> {

    @Query("select d from Help d where d.user.id = :user_id")
    List<Help> findAllByUserId(@Param("user_id") Integer user_id);

    Help findById(int help_id);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "update help set content = :content, title = :title, open = :open, openrange = :range, img = :img " +
            "where help_id = :help_id")
    void updateHelp(int help_id, String content, String title, Boolean open, String range, String img);


}