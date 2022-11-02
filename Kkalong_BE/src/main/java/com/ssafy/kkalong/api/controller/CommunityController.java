package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.BestDressRequestDto;
import com.ssafy.kkalong.api.dto.BestDressUserDto;
import com.ssafy.kkalong.api.dto.CommentDto;
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

    @GetMapping(value="/best")
    public ResponseEntity best(){
        Map<String, Object> result = new HashMap<>();

        return ResponseEntity.ok().body(result);
    }


    @GetMapping(value = "/bestdress")
    public ResponseEntity<?> bestDress(){
        Map<String, Object> result = new HashMap<>();

        return ResponseEntity.ok().body(result);
    }

    @PostMapping(value="/bestdress")
    public ResponseEntity<?> bestDressRegister(@AuthenticationPrincipal User userInfo, @RequestBody final BestDressRequestDto bestReq){
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> comment = new HashMap<>();

        BestDressUserDto user = new BestDressUserDto();
        user.setNickname(userInfo.getNickname());
        user.setProfile_image(userInfo.getImg());

        Post post = communityService.insertBestDress(bestReq);
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
