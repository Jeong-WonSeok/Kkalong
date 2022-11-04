package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.dto.BestDressRequestDto;
import com.ssafy.kkalong.api.dto.CommentDto;
import com.ssafy.kkalong.api.entity.Comment;
import com.ssafy.kkalong.api.entity.Post;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.repository.CommentRepository;
import com.ssafy.kkalong.api.repository.PostLikeRepository;
import com.ssafy.kkalong.api.repository.PostRepository;
import com.ssafy.kkalong.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class CommunityService {

    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public Post selectPost(int post_id){
        return postRepository.findById(post_id);
    }

    public Post insertBestDress(BestDressRequestDto bestReq){
        Post post = Post.builder()
                .img(bestReq.getPost_img())
                .content(bestReq.getContent())
                //user_id 입력
                .build();
        postRepository.save(post);
        return post;
    }


    public int selectCntLike(int post_id){
        int countLike = postLikeRepository.countByPostId(post_id);

        return countLike;
    }

    public CommentDto selectComment(int post_id) {
        Comment comment = commentRepository.findByPost(post_id);
        CommentDto commentDto = new CommentDto();
        commentDto.setContent(comment.getContent());
        return commentDto;
    }
//    public User selectUser(int user_id){
//        User user = userRepository.findById(user_id);
//
//        return user;
//    }
}
