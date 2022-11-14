package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.*;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.ClosetService;
import com.ssafy.kkalong.api.service.FirebaseService;
import com.ssafy.kkalong.api.service.UserService;
import com.ssafy.kkalong.jwt.JwtProvider;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final FirebaseService firebaseService;
    private final JwtProvider jwtProvider;

    @GetMapping("/social/login")
    public ResponseEntity<?> signUp(@AuthenticationPrincipal UserDetailsImpl userInfo) {
        Map<String, Object> result = new HashMap<>();
        User user = userService.getUserByUserId(userInfo.getId());
        UserInfoDto userInfoDto = UserInfoDto.builder()
                .user_id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .age(user.getAge())
                .height(user.getHeight())
                .weight(user.getWeight())
                .provider(user.getProvider())
                .followers(userService.getFollowerListByReceiverId(user.getId()))
                .followings(userService.getFollowingListBySenderId(user.getId()))
                .profile_img(user.getProfile_img())
                .body_img(user.getBody_img())
                .face_img(user.getFace_img())
                .loving(user.isLoving())
                .lover_id(user.getLover_id())
                .personal_color(user.getPersonal_color())
                .build();
        result.put("token", jwtProvider.generateJwtTokenFromUser(user));
        result.put("user", userInfoDto);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody final SignupDto signupDto) {
        Map<String, Object> result = new HashMap<>();

        User user = userService.signUp(signupDto);
        UserInfoDto userInfoDto = UserInfoDto.builder()
                .user_id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .age(user.getAge())
                .height(user.getHeight())
                .weight(user.getWeight())
                .provider(user.getProvider())
                .followers(userService.getFollowerListByReceiverId(user.getId()))
                .followings(userService.getFollowingListBySenderId(user.getId()))
                .profile_img(user.getProfile_img())
                .body_img(user.getBody_img())
                .face_img(user.getFace_img())
                .loving(user.isLoving())
                .lover_id(user.getLover_id())
                .personal_color(user.getPersonal_color())
                .build();
        result.put("token", jwtProvider.generateJwtTokenFromUser(user));
        result.put("user", userInfoDto);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/signupNext")
    public ResponseEntity<?> signUpNext(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody final SignupDto signupDto) {
        Map<String, Object> result = new HashMap<>();

        User user = userService.signUpNext(userInfo.getEmail(), signupDto);
        UserInfoDto userInfoDto = UserInfoDto.builder()
                .user_id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .age(user.getAge())
                .height(user.getHeight())
                .weight(user.getWeight())
                .provider(user.getProvider())
                .followers(userService.getFollowerListByReceiverId(user.getId()))
                .followings(userService.getFollowingListBySenderId(user.getId()))
                .profile_img(user.getProfile_img())
                .body_img(user.getBody_img())
                .face_img(user.getFace_img())
                .loving(user.isLoving())
                .lover_id(user.getLover_id())
                .personal_color(user.getPersonal_color())
                .build();
        result.put("token", jwtProvider.generateJwtTokenFromUser(user));
        result.put("user", userInfoDto);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/signup/email")
    public ResponseEntity<?> authorizeEmail(@RequestBody final StringDto stringDto){
        Map<String, Object> result = new HashMap<>();

        if(userService.isEmailDuplicated(stringDto.getValue())){
            result.put("provider", userService.getProvider(stringDto.getValue()));
        } else{
            result.put("security",  userService.sendEmail(stringDto.getValue()));
        }
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/check/nickname")
    public ResponseEntity<?> checkNickname(@RequestBody final StringDto stringDto){
        Map<String, Object> result = new HashMap<>();
        if(userService.isNicknameDuplicated(stringDto.getValue())){
            result.put("usable", false);
        } else{
            result.put("usable", true);
        }
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/profile/{user_id}")
    public ResponseEntity<?> getProfileByUserId(@PathVariable int user_id){
        Map<String, Object> result = new HashMap<>();

        User user = userService.getUserByUserId(user_id);
        if (user != null) {
            ProfileDto profileDto = ProfileDto.builder()
                    .user_id(user.getId())
                    .nickname(user.getNickname())
                    .followers(userService.getFollowerListByReceiverId(user.getId()))
                    .followings(userService.getFollowingListBySenderId(user.getId()))
                    .build();
            result.put("user", profileDto);
            return ResponseEntity.ok().body(result);
        }
        return ResponseEntity.badRequest().body("존재하지 않는 사용자");
    }

    @PostMapping("/profile/img")
    public ResponseEntity<?> updateProfileImgByUserId(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody MultipartFile profile_img){
        Map<String, Object> result = new HashMap<>();
        String profile_img_url = firebaseService.uploadUserProfileImg(userInfo.getId(), profile_img);
        result.put("profile_img", profile_img_url);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/profile/update")
    public ResponseEntity<?> updateProfileByUserId(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody SignupDto signupDto){
        Map<String, Object> result = new HashMap<>();

        User user = userService.signUpNext(userInfo.getEmail(), signupDto);
        UserInfoDto userInfoDto = UserInfoDto.builder()
                .user_id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .age(user.getAge())
                .height(user.getHeight())
                .weight(user.getWeight())
                .provider(user.getProvider())
                .followers(userService.getFollowerListByReceiverId(user.getId()))
                .followings(userService.getFollowingListBySenderId(user.getId()))
                .profile_img(user.getProfile_img())
                .body_img(user.getBody_img())
                .face_img(user.getFace_img())
                .loving(user.isLoving())
                .lover_id(user.getLover_id())
                .personal_color(user.getPersonal_color())
                .build();
        result.put("user", userInfoDto);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/write/{user_id}")
    public ResponseEntity<?> getPostsAndHelpsByUserId(@PathVariable int user_id){
        Map<String, Object> result = new HashMap<>();
        result.put("Bests", userService.getBestsByUserId(user_id));
        result.put("Helps", userService.getHelpsByUserId(user_id));
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/friend/{nickname}")
    public ResponseEntity<?> getUserProfileInfosByNickname(@PathVariable String nickname){
        Map<String, Object> result = new HashMap<>();
        List<ProfileInfoDto> users = new ArrayList<>();
        List<User> nicknames = userService.getUserIncludingNickname(nickname);
        for(User user : nicknames){
            ProfileInfoDto profileInfoDto = ProfileInfoDto.builder()
                    .user_id(user.getId())
                    .nickname(user.getNickname())
                    .profile_img(user.getProfile_img())
                    .isLoving(user.isLoving())
                    .lover_id(user.getLover_id())
                    .build();
            users.add(profileInfoDto);
        }
        result.put("users", users);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/friends")
    public ResponseEntity<?> getFriendProfileInfosByUserId(@AuthenticationPrincipal UserDetailsImpl userInfo){
        Map<String, Object> result = new HashMap<>();
        List<Integer> followers = userService.getFollowerListByReceiverId(userInfo.getId());
        List<Integer> followings = userService.getFollowingListBySenderId(userInfo.getId());
        followers.retainAll(followings); //교집합
        List<ProfileInfoDto> friends = new ArrayList<>();
        for (int i: followers) {
            User user = userService.getUserByUserId(i);
            ProfileInfoDto profileInfoDto = ProfileInfoDto.builder()
                    .user_id(i)
                    .nickname(user.getNickname())
                    .profile_img(user.getProfile_img())
                    .isLoving(user.isLoving())
                    .lover_id(user.getLover_id())
                    .build();
            friends.add(profileInfoDto);
        }
        result.put("friends", friends);
        result.put("lovers", userService.getLoverListByReceiverId(userInfo.getId()));
        result.put("loving", userService.getLovingListBySenderId(userInfo.getId()));
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/followers/{user_id}")
    public ResponseEntity<?> getFollowerProfileInfosByUserId(@PathVariable int user_id){
        Map<String, Object> result = new HashMap<>();
        List<Integer> followerList = userService.getFollowerListByReceiverId(user_id);
        List<ProfileInfoDto> followers = new ArrayList<>();
        for (int i: followerList) {
            User user = userService.getUserByUserId(i);
            ProfileInfoDto profileInfoDto = ProfileInfoDto.builder()
                    .user_id(i)
                    .nickname(user.getNickname())
                    .profile_img(user.getProfile_img())
                    .isLoving(user.isLoving())
                    .lover_id(user.getLover_id())
                    .build();
            followers.add(profileInfoDto);
        }
        result.put("followers", followers);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/followings/{user_id}")
    public ResponseEntity<?> getFollowingProfileInfosByUserId(@PathVariable int user_id){
        Map<String, Object> result = new HashMap<>();
        List<Integer> followingList = userService.getFollowingListBySenderId(user_id);
        List<ProfileInfoDto> followings = new ArrayList<>();
        for (int i: followingList) {
            User user = userService.getUserByUserId(i);
            ProfileInfoDto profileInfoDto = ProfileInfoDto.builder()
                    .user_id(i)
                    .nickname(user.getNickname())
                    .profile_img(user.getProfile_img())
                    .isLoving(user.isLoving())
                    .lover_id(user.getLover_id())
                    .build();
            followings.add(profileInfoDto);
        }
        result.put("followings", followings);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/follow/{follower_id}")
    public ResponseEntity<?> sendFollowRequest(@AuthenticationPrincipal UserDetailsImpl userInfo, @PathVariable int follower_id){
        Map<String, Object> result = new HashMap<>();
        List<Integer> followings = userService.sendFollowRequest(userInfo.getId(), follower_id);
        result.put("followings", followings);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/love/{lover_id}")
    public ResponseEntity<?> sendLoveRequest(@AuthenticationPrincipal UserDetailsImpl userInfo, @PathVariable int lover_id){
        Map<String, Object> result = new HashMap<>();
        List<Integer> followers = userService.getFollowerListByReceiverId(userInfo.getId());
        List<Integer> followings = userService.getFollowingListBySenderId(userInfo.getId());
        followers.retainAll(followings); //교집합
        for (int i: followers) {
            if(i==lover_id){
                userService.sendLoveRequest(userInfo.getId(), lover_id);
                break;
            }
        }
        //결과(친구 정보 재전송)
        return getFriendProfileInfosByUserId(userInfo);
    }

    @GetMapping("/test")
    public ResponseEntity<?> Test(@AuthenticationPrincipal UserDetailsImpl user){
        Map<String, Object> result = new HashMap<>();
        result.put("id", user.getId());
        result.put("email", user.getEmail());
        return ResponseEntity.ok().body(result);
    }
}
