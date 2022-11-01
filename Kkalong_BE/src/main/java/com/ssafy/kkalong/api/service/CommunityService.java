package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommunityService {

    private final PostRepository postRepository;

    public List<?> selectBestPost(){
        List<?> findByBestPost = postRepository.findByBestPost();

        return findByBestPost;
    }
}
