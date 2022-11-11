package com.ssafy.kkalong.api.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.ssafy.kkalong.api.dto.*;
import com.ssafy.kkalong.api.entity.*;
import com.ssafy.kkalong.api.service.CommunityService;
import com.ssafy.kkalong.api.service.FirebaseService;
import com.ssafy.kkalong.common.BaseEntity;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/community")
public class CommunityController {

    //    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    CommunityService communityService;

    @PostMapping("/imgTest")
    public ResponseEntity<?> imgTest(@RequestBody MultipartFile m){

        return ResponseEntity.ok().body(m.getOriginalFilename());
    }


    //좋아요 가장 많은 게시글 보여주기(3개 까지)
    @GetMapping("/best")
    public ResponseEntity selectBestDressTop() {
        List<Map<String, Object>> result = new ArrayList<>();
        List<BestDressResponseInterface> post = communityService.selectBestDress();

        for (BestDressResponseInterface bd : post) {
            System.out.println(bd.getId());
            Map<String, Object> temp = new HashMap<>();
            Map<String, Object> temp_u = new HashMap<>();
            User user = communityService.selectUser(bd.getId());

            String nick = user.getNickname();
            String profile_img = user.getImg();

            temp.put("Best", bd);
            temp_u.put("user_id", user.getId());
            temp_u.put("nickname", nick);
            temp_u.put("profile_img", profile_img);
            temp_u.put("email", user.getEmail());
            temp.put("user", temp_u);
            result.add(temp);
        }

        return ResponseEntity.ok().body(result);
    }

    //bestdress 목록 전부 다 가져오기
    @GetMapping(value = "/bestdress")
    public ResponseEntity<?> selectAllBestDress() {
        List<Map<String, Object>> result = new ArrayList<>();
        List<BestDressResponseInterface> post = communityService.selectAllPost();

        for (BestDressResponseInterface bd : post) {

            Map<String, Object> temp = new HashMap<>();
            Map<String, Object> temp_u = new HashMap<>();
            User user = communityService.selectUser(bd.getId());

            String nick = user.getNickname();
            String profile_img = user.getImg();

            temp.put("Best", bd);
            temp_u.put("user_id", user.getId());
            temp_u.put("nickname", nick);
            temp_u.put("profile_img", profile_img);
            temp_u.put("email", user.getEmail());
            temp.put("user", temp_u);
            result.add(temp);
        }

        return ResponseEntity.ok().body(result);
    }

    //    일일히 가져오기
    @GetMapping(value = "/bestdress/{post_id}")
    public ResponseEntity<?> selectPost(@PathVariable int post_id) {

        Map<String, Object> result = new HashMap<>();
        User user = communityService.selectUser(post_id);
        BestDressUserDto userDto = new BestDressUserDto(user.getId(), user.getNickname(), user.getImg(), user.getEmail());

        BestDressResponseInterface post = communityService.selectPost(post_id);

        List<Comment> commentList = communityService.selectComment(post_id);
        List<Map<String, Object>> commentArr = new ArrayList<>();

        List<Integer> likeList = communityService.selectLike(post_id);

        for (Comment comm : commentList) {
            Map<String, Object> comment = new HashMap<>();
            User temp_user = comm.getUser();
            BestDressUserDto comment_user = new BestDressUserDto();

            comment_user.setUser_id(temp_user.getId());
            comment_user.setNickname(temp_user.getNickname());
            comment_user.setProfile_image(temp_user.getImg());
            comment_user.setEmail(temp_user.getEmail());

            comment.put("content", comm.getContent());
            comment.put("user", comment_user);
            comment.put("comment_id", comm.getId());
            comment.put("createAt", communityService.selectCommentCreateAt(comm.getId()));

            commentArr.add(comment);
        }

        result.put("comment", commentArr);
        result.put("user", userDto);
        result.put("Best", post);
        result.put("like", likeList);
        result.put("createAt", communityService.selectPostCreateAt(post_id));
        return ResponseEntity.ok().body(result);
    }

//    bestdress 좋아요 클릭
    @PostMapping("/bestdress/{post_id}")
    public ResponseEntity<?> likeClick(@AuthenticationPrincipal UserDetailsImpl userInfo, @PathVariable int post_id){
        User user = communityService.getUser(userInfo.getEmail());
        communityService.updateLike(user, post_id);
        List<Integer> likeList = communityService.selectLike(post_id);
        Map<String, Object> result = new HashMap<>();
        result.put("like", likeList);

        return ResponseEntity.ok().body(result);
    }

    //bestDressRegister 등록
    @PostMapping(value = "/bestdress")
    public ResponseEntity<?> bestDressRegister(@AuthenticationPrincipal UserDetailsImpl userInfo, BestDressRequestDto bestReq)
    {

        Map<String, Object> result = new HashMap<>();
//        result.put("img", img);
        //유저 정보 가져오기
        User user = communityService.getUser(userInfo.getEmail());

        BestDressUserDto post_user = new BestDressUserDto();
        // 게시물 주인 정보 넣기
        post_user.setUser_id((user.getId()));
        post_user.setNickname(user.getNickname());
        post_user.setProfile_image(user.getImg());
        post_user.setEmail(user.getEmail());

        // DB 등록
        Post post = communityService.insertBestDress(bestReq, user);
        BestDressResponseInterface postDto = communityService.selectPost(post.getId());

        //댓글 리스트 가져오기
//        List<CommentDto> commentList = communityService.selectComment(post.getId());
        BestDressUserDto comment_user = new BestDressUserDto();
        Map<String, Object> comment = new HashMap<>();
        comment.put("content", null);
        comment.put("user_id", comment_user);
        comment.put("comment_id", null);

        result.put("Best", postDto);
        result.put("user_id", post_user);
        result.put("comment", comment);
        result.put("createAt", communityService.selectPostCreateAt(post.getId()));
        result.put("filename", bestReq.getPost_img().getOriginalFilename());

        return ResponseEntity.ok().body(result);
    }

    //베스트 드레서 삭제
    @DeleteMapping("/bestdress/{post_id}")
    public ResponseEntity<?> deletePost(@PathVariable int post_id) {
        communityService.deletePost(post_id);

        return ResponseEntity.ok().body("삭제 성공");
    }

    //베스트 드레서 수정
    @PutMapping("/bestdress/{post_id}")
    public ResponseEntity<?> UpdatePost(@AuthenticationPrincipal UserDetailsImpl userInfo, BestDressRequestDto bestReq, @PathVariable int post_id) {
        System.out.println("adfsafasfsafaffasffasfafsfsaf");
        Map<String, Object> result = new HashMap<>();
        System.out.println(bestReq.getPost_img().getOriginalFilename());
        communityService.updatePost(bestReq, post_id);

        User user = communityService.selectUser(post_id);

        BestDressUserDto userDto = new BestDressUserDto(user.getId(), user.getNickname(), user.getImg(), user.getEmail());

        BestDressResponseInterface post = communityService.selectPost(post_id);

        List<Comment> commentList = communityService.selectComment(post_id);
        List<Map<String, Object>> commentArr = new ArrayList<>();


        for (Comment comm : commentList) {
            Map<String, Object> comment = new HashMap<>();
            User temp_user = comm.getUser();
            BestDressUserDto comment_user = new BestDressUserDto();

            comment_user.setUser_id(temp_user.getId());
            comment_user.setNickname(temp_user.getNickname());
            comment_user.setProfile_image(temp_user.getImg());
            comment_user.setEmail(temp_user.getEmail());


            comment.put("content", comm.getContent());
            comment.put("user_id", comment_user);
            comment.put("comment_id", comm.getId());
            comment.put("createAt", "" + communityService.selectCommentCreateAt(comm.getId()));

            commentArr.add(comment);
        }

        result.put("comment", commentArr);
        result.put("user_id", userDto);
        result.put("Best", post);
        result.put("createAt", communityService.selectPostCreateAt(post_id));
        result.put("filename", bestReq.getPost_img().getOriginalFilename());

        return ResponseEntity.ok().body(result);
    }


//    ================================================================================================
//    comment
//    ================================================================================================

    @PostMapping("bestdress/{post_id}/comment")
    public ResponseEntity<?> commentRegister(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody CommentRequestDto commentInfo, @PathVariable int post_id) {

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> user_id = new HashMap<>();

        Post post = communityService.getPost(post_id);
        User user = communityService.getUser(userInfo.getEmail());
        Comment comment = communityService.insertComment(commentInfo, user, post);

        user_id.put("nickname", user.getNickname());
        user_id.put("profile_img", user.getImg());
        user_id.put("user_id", user.getId());
        user_id.put("email", user.getEmail());
        //createAt 넣어야 댐

        result.put("comment_id", comment.getId());
        result.put("content", comment.getContent());
        result.put("user", user_id);
        result.put("createAt", communityService.selectCommentCreateAt(comment.getId()));

        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/bestdress/{post_id}/comment/{comment_id}")
    public ResponseEntity<?> deleteComment(@PathVariable int post_id, @PathVariable int conment_id) {
        communityService.deleteComment(conment_id);
        return ResponseEntity.ok().body("삭제 성공");
    }

    @PutMapping("/bestdress/{post_id}/comment/{comment_id}")
    public ResponseEntity<?> updateComment(@AuthenticationPrincipal UserDetailsImpl userInfo,@PathVariable int post_id,  @PathVariable int comment_id, @RequestBody CommentRequestDto commentInfo) {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> userMap = new HashMap<>();

        communityService.updateComment(comment_id, commentInfo);
        Comment comment = communityService.getComment(comment_id);
        User user = communityService.getUser(userInfo.getEmail());

        userMap.put("nickname", user.getNickname());
        userMap.put("profile_img", user.getImg());
        userMap.put("user_id", user.getId());
        userMap.put("email", user.getEmail());
        result.put("content", comment.getContent());
        result.put("user", userMap);
        result.put("comment_id", comment.getId());
        result.put("createAt", communityService.selectCommentCreateAt(comment.getId()));

        return ResponseEntity.ok().body(result);
    }

    //==================================================================
    // 도와줘요 패알못!
    //==================================================================

    //모든 목록 불러오기
    @GetMapping("/helpcodi")
    public ResponseEntity<?> selectAllHelp() {
        List<Map<String, Object>> result = new ArrayList<>();

        List<HelpResponseDto> help = communityService.selectAllHelp();
        for (HelpResponseDto h : help) {
            Map<String, Object> temp = new HashMap<>();

            BestDressUserDto userDto = new BestDressUserDto();
            User user = communityService.selectUserHelp(h.getHelp_id());
            userDto.setNickname(user.getNickname());
            userDto.setProfile_image(user.getImg());
            userDto.setUser_id(user.getId());
            userDto.setEmail(user.getEmail());

            temp.put("Help", h);
            h.setUser(userDto);
            result.add(temp);
        }

        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/helpcodi/{help_id}")
    public ResponseEntity<?> selectHelp(@PathVariable int help_id) {
        Map<String, Object> result = new HashMap<>();

        List<Reply> replyList = communityService.selectReply(help_id);
        List<Map<String, Object>> commentArr = new ArrayList<>();

        HelpResponseDto helpDto = communityService.selectHelp(help_id);
        BestDressUserDto userDto = new BestDressUserDto();
        User user = communityService.selectUserHelp(help_id);
        userDto.setNickname((user.getNickname()));
        userDto.setProfile_image(user.getImg());
        userDto.setUser_id(user.getId());
        userDto.setEmail(user.getEmail());

        helpDto.setUser(userDto);
        result.put("createAt", communityService.selectHelpCreateAt(help_id));


        for (Reply rpl : replyList) {
            Map<String, Object> reply = new HashMap<>();
            User temp_user = rpl.getUser();
            BestDressUserDto comment_user = new BestDressUserDto();


            comment_user.setNickname(temp_user.getNickname());
            comment_user.setProfile_image(temp_user.getImg());
            comment_user.setUser_id(temp_user.getId());
            comment_user.setEmail(temp_user.getEmail());

            ReplyCodyDto cody = new ReplyCodyDto();
            if (rpl.getCody()!=null){
                cody = new ReplyCodyDto(rpl.getCody().getId(), rpl.getCody().getImg());
            }
            reply.put("cody", cody);
            reply.put("content", rpl.getContent());
            reply.put("user", comment_user);
            reply.put("comment_id", rpl.getId());
            reply.put("createAt", communityService.selectReplyCreateAt(rpl.getId()));
            commentArr.add(reply);

        }


        result.put("Help", helpDto);
        result.put("comment", commentArr);


        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("helpcodi/{help_id}")
    public void deleteHelp(@PathVariable int help_id) {
        communityService.deleteHelp(help_id);
    }

    @PutMapping("helpcodi/{help_id}")
    public ResponseEntity<?> udpateHelp(@PathVariable int help_id, @RequestBody HelpRequestDto helpInfo){
        Map<String, Object> result = new HashMap<>();
        communityService.updateHelp(help_id, helpInfo);

        List<Reply> replyList = communityService.selectReply(help_id);
        List<Map<String, Object>> commentArr = new ArrayList<>();

        HelpResponseDto helpDto = communityService.selectHelp(help_id);
        BestDressUserDto userDto = new BestDressUserDto();
        User user = communityService.selectUserHelp(help_id);
        userDto.setNickname((user.getNickname()));
        userDto.setProfile_image(user.getImg());
        userDto.setUser_id(user.getId());
        userDto.setEmail(user.getEmail());

        helpDto.setUser(userDto);
        result.put("createAt", communityService.selectHelpCreateAt(help_id));


        for (Reply rpl : replyList) {
            Map<String, Object> reply = new HashMap<>();
            User temp_user = rpl.getUser();
            BestDressUserDto comment_user = new BestDressUserDto();

            comment_user.setNickname(temp_user.getNickname());
            comment_user.setProfile_image(temp_user.getImg());
            comment_user.setUser_id(temp_user.getId());
            comment_user.setEmail(temp_user.getEmail());

            reply.put("content", rpl.getContent());
            reply.put("user", comment_user);
            reply.put("comment_id", rpl.getId());
            reply.put("createAt", communityService.selectReplyCreateAt(rpl.getId()));
            commentArr.add(reply);

        }


        result.put("Help", helpDto);
        result.put("comment", commentArr);


        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/helpcodi")
    public ResponseEntity<?> insertHelp(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody HelpRequestDto helpInfo) {
        System.out.println(helpInfo.getContent());
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> comment = new HashMap<>();
        Map<String, Object> commentUser = new HashMap<>();
        Map<String, Object> userMap = new HashMap<>();
        Map<String, Object> codi = new HashMap<>();

        User user = communityService.getUser(userInfo.getEmail());
        int help_id = communityService.insertHelp(helpInfo, user);

        HelpResponseDto help = new HelpResponseDto();
        help.setHelp_id(help_id);
        help.setOpen(helpInfo.getOpen());
        help.setTitle(helpInfo.getTitle());
        help.setRange(helpInfo.getRange());
        help.setUser(new BestDressUserDto(user.getId(), user.getNickname(), user.getImg(), user.getEmail()));

        result.put("Help", help);
        comment.put("content", null);
        commentUser.put("nickname", null);
        commentUser.put("profile_img", null);
        comment.put("comment_id", null);
        comment.put("user", commentUser);
        codi.put("codi_img", null);

        comment.put("codi_id", codi);

        result.put("comment", comment);
        result.put("createAt", communityService.selectHelpCreateAt(help_id));

        return ResponseEntity.ok().body(result);

    }

    //=====================================================================
    //패알못 댓글
    //=====================================================================

    @PostMapping("helpcodi/{help_id}/comment")
    public ResponseEntity<?> replyRegister(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody ReplyRequestDto replyInfo, @PathVariable int help_id) {

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> user_id = new HashMap<>();
        Map<String, Object> codi = new HashMap<>();

        ReplyCodyDto cody = new ReplyCodyDto();
        if(replyInfo.getCodi_id() != null){
            cody = communityService.getCody(replyInfo.getCodi_id());
        }
        Help help = communityService.getHelp(help_id);
        User user = communityService.getUser(userInfo.getEmail());
        Reply reply = communityService.insertReply(replyInfo, user, help);

        user_id.put("nickname", user.getNickname());
        user_id.put("profile_img", user.getImg());
        user_id.put("user_id", user.getId());
        user_id.put("eamil", user.getEmail());
        //createAt 넣어야 댐

        result.put("content", reply.getContent());
        result.put("user", user_id);
        result.put("codi_id", cody);
        result.put("comment_id", reply.getId());
        result.put("createAt", communityService.selectReplyCreateAt(reply.getId()));

        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/helpcodi/{help_id}/comment/{reply_id}")
    public ResponseEntity<?> deleteReply(@PathVariable int help_id, @PathVariable int reply_id){
        communityService.deleteReply(reply_id);
        return ResponseEntity.ok().body("삭제 성공");
    }

    @PutMapping("/helpcodi/{help_id}/comment/{reply_id}")
    public ResponseEntity<?> updateReply(@AuthenticationPrincipal UserDetailsImpl userInfo, @PathVariable int help_id, @PathVariable int reply_id, @RequestBody ReplyRequestDto replyInfo){
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> userMap = new HashMap<>();

        communityService.updateReply(reply_id, replyInfo);
        Reply reply = communityService.getReply(reply_id);
        User user = communityService.getUser(userInfo.getEmail());
        ReplyCodyDto cody = new ReplyCodyDto();
        if(replyInfo.getCodi_id() != null){
            cody = communityService.getCody(replyInfo.getCodi_id());
        }


        userMap.put("nickname", user.getNickname());
        userMap.put("profile_img", user.getImg());
        userMap.put("user_id", user.getId());
        userMap.put("email", user.getEmail());
        result.put("content", reply.getContent());
        result.put("user", userMap);
        result.put("codi_id", cody);
        result.put("comment_id", reply.getId());
        result.put("createAt", communityService.selectReplyCreateAt(reply.getId()));

        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/helpcodi/{help_id}/{cody_id}")
    public void codiDownload(@PathVariable int help_id, @PathVariable int cody_id){
        communityService.updateCodiDown(cody_id);
    }

}
