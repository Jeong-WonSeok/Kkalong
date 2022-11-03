package com.ssafy.kkalong.api.repository;

import com.ssafy.kkalong.api.entity.Comment;
import com.ssafy.kkalong.api.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Integer> {

    @Query(nativeQuery = true, value = "select r.* from reply r left join help h on r.help_id = h.help_id where h.help_id = :help_id")
    List<Reply> findByHelp(int help_id);

    Reply findById(int reply_id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update reply set content = :content where reply_id = :reply_id")
    void updateReply(int reply_id, String content);
}