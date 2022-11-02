package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.BestDressRequestDto;
import com.ssafy.kkalong.api.dto.BestDressResponseDto;
import com.ssafy.kkalong.api.dto.BestDressUserDto;
import com.ssafy.kkalong.api.dto.CommentDto;
import com.ssafy.kkalong.api.entity.Post;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.CommunityService;
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
        System.out.println('a');
        List<Map<String, Object>> result = new ArrayList<>();
        List<BestDressResponseDto> post = communityService.selectBestDress();
        Map<String, Object> a = new HashMap<>();
        a.put("aaa", "qwer");
        for(BestDressResponseDto bd : post){

            Map<String, Object> temp = new HashMap<>();
            Map<String, Object> temp_u = new HashMap<>();
            User user = communityService.selectUser(bd.getPost_id());

            String nick = user.getNickname();
            String profile_img = user.getImg();

            temp.put("Best", bd);
            temp_u.put("NickName", nick);
            temp_u.put("profile_img", profile_img);
            temp.put("User", temp_u);
            result.add(temp);
        }

        return ResponseEntity.ok().body(a);
    }


    @GetMapping(value = "/bestdress")
    public ResponseEntity<?> selectBestDress(){
        Map<String, Object> result = new HashMap<>();
        result.put("String", "String");
        return ResponseEntity.ok().body(result);
    }

    @PostMapping(value="/bestdress")
    public ResponseEntity<?> bestDressRegister(@AuthenticationPrincipal User userInfo, @RequestBody final BestDressRequestDto bestReq){
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> comment = new HashMap<>();

        BestDressUserDto user = new BestDressUserDto();
        user.setNickname(userInfo.getNickname());
        user.setProfile_image(userInfo.getImg());

        Post post = communityService.insertBestDress(bestReq, userInfo);
        CommentDto commentdto = communityService.selectComment(post.getId());


        BestDressUserDto comment_user = new BestDressUserDto();

        result.put("Best", post);
        result.put("user", user);
        comment.put("content", commentdto.getContent());
        comment.put("user", comment_user);
        result.put("comment", comment);
        return ResponseEntity.ok().body(result);
    }


}
