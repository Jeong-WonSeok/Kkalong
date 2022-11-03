package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.*;
import com.ssafy.kkalong.api.entity.Comment;
import com.ssafy.kkalong.api.entity.Post;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.CommunityService;
import com.ssafy.kkalong.common.BaseEntity;
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
            System.out.println(bd.getId());
            Map<String, Object> temp = new HashMap<>();
            Map<String, Object> temp_u = new HashMap<>();
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
    public ResponseEntity<?> selectAllBestDress(){
        List<Map<String, Object>> result = new ArrayList<>();
        List<BestDressResponseInterface> post = communityService.selectAllPost();

        for(BestDressResponseInterface bd : post){

            Map<String, Object> temp = new HashMap<>();
            Map<String, Object> temp_u = new HashMap<>();
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

//    일일히 가져오기
    @GetMapping(value="/bestdress/post_id")
    public ResponseEntity<?> selectPost(@RequestParam int post_id){

        Map<String, Object> result = new HashMap<>();
        User user = communityService.selectUser(post_id);
        BestDressUserDto userDto = new BestDressUserDto(user.getNickname(), user.getImg());

        BestDressResponseInterface post = communityService.selectPost(post_id);

        List<CommentDto> commentList = communityService.selectComment(post_id);
        List<Map<String, Object>> commentArr = new ArrayList<>();

        for(CommentDto comm : commentList) {
            Map<String, Object> comment = new HashMap<>();
            User temp_user = comm.getUser();
            BestDressUserDto comment_user = new BestDressUserDto();

            comment_user.setNickname(temp_user.getNickname());
            comment_user.setProfile_image(temp_user.getImg());

            comment.put("content", comm.getContent());
            comment.put("user_id", comment_user);

            commentArr.add(comment);
        }

        result.put("comment", commentArr);
        result.put("user_id", userDto);
        result.put("Best", post);

        return ResponseEntity.ok().body(result);
    }


    //bestDressRegister 등록
    @PostMapping(value="/bestdress")
    public ResponseEntity<?> bestDressRegister(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody BestDressRequestDto bestReq){

        Map<String, Object> result = new HashMap<>();
        
        //유저 정보 가져오기
        User user = communityService.getUser(userInfo.getEmail());

        BestDressUserDto post_user = new BestDressUserDto();
        // 게시물 주인 정보 넣기
        post_user.setNickname(user.getNickname());
        post_user.setProfile_image(user.getImg());

        // DB 등록
        Post post = communityService.insertBestDress(bestReq, user);
        BestDressResponseInterface postDto = communityService.selectPost(post.getId());

        //댓글 리스트 가져오기
//        List<CommentDto> commentList = communityService.selectComment(post.getId());
        BestDressUserDto comment_user = new BestDressUserDto();
        Map<String, Object> comment = new HashMap<>();
        comment.put("content", null);
        comment.put("user_id", comment_user);
//        for(CommentDto comm : commentList) {
//            Map<String, Object> comment = new HashMap<>();
//            User temp_user = comm.getUser();
//            BestDressUserDto comment_user = new BestDressUserDto();
//
//            comment_user.setNickname(temp_user.getNickname());
//            comment_user.setProfile_image(temp_user.getImg());
//
//            comment.put("content", comm.getContent());
//            comment.put("comment_user", comment_user);
//        }

        result.put("Best", postDto);
        result.put("user_id", post_user);
        result.put("comment", comment);

        return ResponseEntity.ok().body(result);
    }

    //베스트 드레서 삭제
    @DeleteMapping("/bestdress/post_id")
    public ResponseEntity<?> deletePost(@RequestParam int post_id){
        communityService.deletePost(post_id);

        return ResponseEntity.ok().body("삭제 성공");
    }

    //베스트 드레서 수정
    @PutMapping("/bestdress/post_id")
    public ResponseEntity<?> UpdatePost(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody BestDressRequestDto bestReq, @RequestParam int post_id){

        Map<String, Object> result = new HashMap<>();

        communityService.updatePost(bestReq, post_id);

        User user = communityService.selectUser(post_id);

        BestDressUserDto userDto = new BestDressUserDto(user.getNickname(), user.getImg());

        BestDressResponseInterface post = communityService.selectPost(post_id);

        List<CommentDto> commentList = communityService.selectComment(post_id);
        List<Map<String, Object>> commentArr = new ArrayList<>();


        for(CommentDto comm : commentList) {
            Map<String, Object> comment = new HashMap<>();
            User temp_user = comm.getUser();
            BestDressUserDto comment_user = new BestDressUserDto();

            comment_user.setNickname(temp_user.getNickname());
            comment_user.setProfile_image(temp_user.getImg());

            comment.put("content", comm.getContent());
            comment.put("user_id", comment_user);

            commentArr.add(comment);
        }

        result.put("comment", commentArr);
        result.put("user_id", userDto);
        result.put("Best", post);

        return ResponseEntity.ok().body(result);
    }


//    ================================================================================================
//    comment
//    ================================================================================================

    @PostMapping("bestdress/post_id/comment")
    public ResponseEntity<?> commentRegister(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody CommentRequestDto commentInfo, @RequestParam int post_id){

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> user_id = new HashMap<>();

        Post post = communityService.getPost(post_id);
        User user = communityService.getUser(userInfo.getEmail());
        Comment comment = communityService.insertComment(commentInfo, user, post);

        user_id.put("nickname", user.getNickname());
        user_id.put("profile_img", user.getImg());
        //createAt 넣어야 댐
        
        result.put("content", comment.getContent());
        result.put("user_id", user_id);

        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/bestdress/post_id/comment")
    public ResponseEntity<?> deleteComment(@RequestParam int content_id){
        communityService.deleteComment(content_id);
        return ResponseEntity.ok().body("삭제 성공");
    }

    @PutMapping("/bestdress/post_id/comment")
    public ResponseEntity<?> updateComment(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestParam int comment_id, @RequestBody CommentRequestDto commentInfo){
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> userMap = new HashMap<>();

        communityService.updateComment(comment_id, commentInfo);
        Comment comment = communityService.getComment(comment_id);
        User user = communityService.getUser(userInfo.getEmail());

        userMap.put("nickname", user.getNickname());
        userMap.put("profile_img", user.getImg());
        result.put("content", comment.getContent());
        result.put("user_id", userMap);
        result.put("updateAt", comment.getUpdatedAt());

        return ResponseEntity.ok().body(result);
    }





}
