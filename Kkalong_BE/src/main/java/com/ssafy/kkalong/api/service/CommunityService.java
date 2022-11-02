package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.entity.Post;
import com.ssafy.kkalong.api.entity.User;
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

    public List<Post> selectBestPost(){
        List<Post> findByBestPost = postRepository.findByBestPost();

        return findByBestPost;
    }

    public int selectCntLike(int post_id){
        int countLike = postLikeRepository.countByPost(post_id);

        return countLike;
    }

    public User selectUser(int user_id){
        User user = userRepository.findById(user_id);

        return user;
    }
}
