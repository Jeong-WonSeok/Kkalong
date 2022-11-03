package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.*;
import com.ssafy.kkalong.api.entity.Post;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.CommunityService;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/community")
public class CommunityController {

//    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    CommunityService communityService;


    //좋아요 가장 많은 게시글 보여주기(3개 까지)
    @GetMapping("/best")
    public ResponseEntity selectBestDressTop(){
        List<Map<String, Object>> result = new ArrayList<>();
        List<BestDressResponseInterface> post = communityService.selectBestDress();

        for(BestDressResponseInterface bd : post){

            Map<String, Object> temp = new HashMap<>();
            Map<String, Object> temp_u = new HashMap<>();
            System.out.println("+++" + bd.getId());
            User user = communityService.selectUser(bd.getId());

            String nick = user.getNickname();
            String profile_img = user.getImg();

            temp.put("Best", bd);
            temp_u.put("NickName", nick);
            temp_u.put("profile_img", profile_img);
            temp.put("User", temp_u);
            result.add(temp);
        }

        return ResponseEntity.ok().body(result);
    }

    //bestdress 목록 전부 다 가져오기
    @GetMapping(value = "/bestdress")
    public ResponseEntity<?> selectBestDress(){
        Map<String, Object> result = new HashMap<>();

        return ResponseEntity.ok().body(result);
    }

    //일일히 가져오기
    @GetMapping(value="/bestdress/post_id")
    public ResponseEntity<?> selectPost(@RequestParam int post_id){

    }



    @GetMapping(value="/check")
    public ResponseEntity<?> check(@AuthenticationPrincipal UserDetailsImpl userInfo){
        System.out.println("check" +  userInfo.getEmail());

        return ResponseEntity.ok().body(userInfo.getEmail());
    }

    @PostMapping(value="/bestdress")
    public ResponseEntity<?> bestDressRegister(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody BestDressRequestDto bestReq){
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> comment = new HashMap<>();
        System.out.println(userInfo.getEmail());
        User user = communityService.getUser(userInfo.getEmail());

        BestDressUserDto post_user = new BestDressUserDto();
        post_user.setNickname(user.getNickname());
        post_user.setProfile_image(user.getImg());

        Post post = communityService.insertBestDress(bestReq, user);
        CommentDto commentdto = communityService.selectComment(post.getId());

        BestDressUserDto comment_user = new BestDressUserDto();
        comment_user.setNickname(commentdto.getUser().getNickname());
        comment_user.setProfile_image(commentdto.getUser().getImg());


        result.put("Best", post);
        result.put("user", post_user);
        comment.put("content", commentdto.getContent());
        comment.put("user", comment_user);
        result.put("comment", comment);
        return ResponseEntity.ok().body(result);
    }


}
