package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.*;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.ClosetService;
import com.ssafy.kkalong.api.service.UserService;
import com.ssafy.kkalong.jwt.JwtProvider;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ClosetService closetService;
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

    @PostMapping("/follow")
    public void sendFollowRequest(@AuthenticationPrincipal UserDetailsImpl user, @RequestBody IntegerDto integerDto){
        userService.sendFollowRequest(user.getId(), integerDto.getValue());
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfileByUserId(@RequestBody IntegerDto integerDto){
        Map<String, Object> result = new HashMap<>();

        User user = userService.getUserByUserId(integerDto.getValue());
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
                .build();
        result.put("user", userInfoDto);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/write")
    public ResponseEntity<?> getPostsAndHelpsByUserId(@RequestBody IntegerDto integerDto){
        Map<String, Object> result = new HashMap<>();
        result.put("Bests", userService.getBestsByUserId(integerDto.getValue()));
        result.put("Helps", userService.getHelpsByUserId(integerDto.getValue()));
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/friend")
    public ResponseEntity<?> getFollwerProfileInfosByUserId(@AuthenticationPrincipal UserDetailsImpl userInfo){
        Map<String, Object> result = new HashMap<>();



        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/test")
    public ResponseEntity<?> Test(@AuthenticationPrincipal UserDetailsImpl user){
        Map<String, Object> result = new HashMap<>();
        result.put("id", user.getId());
        result.put("email", user.getEmail());
        return ResponseEntity.ok().body(result);
    }
}
