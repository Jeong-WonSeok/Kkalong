package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.entity.Post;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {

//    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final CommunityService communityService;

//    @GetMapping(value="/best")
    @GetMapping(value="/check")
    public void check(){
        System.out.println('a');
    }


    @GetMapping(value = "/bestdress")
    public ResponseEntity<?> bestDress(){
        System.out.println("a");
        List<Post> bestDress = communityService.selectBestPost();
        List<Integer> cntLike = new ArrayList<>();
        List<User> userList = new ArrayList<>();
        Map<String, Object> result = new HashMap<>();


        for( Post post : bestDress){
            System.out.println(post);
//            cntLike.add(communityService.selectCntLike(post.getId()));
//            userList.add(communityService.selectUser(post.getUser().getId()));
        }

        result.put("Best", bestDress);
        result.put("LikeCnt", cntLike);
        result.put("user_id", userList);

        return ResponseEntity.ok().body(result);
    }

//    @PostMapping(value="/bestdress")

}
