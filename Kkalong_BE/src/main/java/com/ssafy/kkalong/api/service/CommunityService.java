package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.dto.BestDressRequestDto;
import com.ssafy.kkalong.api.dto.BestDressResponseDto;
import com.ssafy.kkalong.api.dto.BestDressResponseInterface;
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

    //좋아요 많은 순 3개 출력
    public List<BestDressResponseInterface> selectBestDress(){
        System.out.println(postRepository.findByBestDress());
        return postRepository.findByBestDress();
    }

    public List<BestDressResponseInterface> selectAllPost(){
        return postRepository.findByAllBestDress();
    }

    public BestDressResponseInterface selectPost(int post_id){
        return postRepository.findByDressPost(post_id);
    }


    public Post insertBestDress(BestDressRequestDto bestReq, User userInfo){
        Post post = Post.builder()
                .img(bestReq.getPost_img())
                .content(bestReq.getContent())
                .user(userInfo)
                .build();
        postRepository.save(post);
        return post;
    }


    public CommentDto selectComment(int post_id) {
        Comment comment = commentRepository.findByPost(post_id);
        CommentDto commentDto = new CommentDto();
        commentDto.setContent(comment.getContent());
        commentDto.setUser(comment.getUser());
        return commentDto;
    }

    public User selectUser(int post_id){
        User user = postRepository.findById(post_id).getUser();
        return user;
    }

    public User getUser(String user_email){
        User user = userRepository.findByEmail(user_email);
        return user;
    }
}
