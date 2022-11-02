package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.SignupDto;
import com.ssafy.kkalong.api.dto.StringDto;
import com.ssafy.kkalong.api.dto.UserInfoDto;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.UserService;
import com.ssafy.kkalong.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    private final JwtProvider jwtProvider;

    public UserController(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody final SignupDto signupDto) {
        Map<String, Object> result = new HashMap<>();

        User user = userService.signUp(signupDto);
        UserInfoDto userInfoDto = UserInfoDto.builder()
                .email(user.getEmail())
                .password(user.getPassword())
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
    public ResponseEntity<?> signUpNext(@RequestBody final SignupDto signupDto) {
        Map<String, Object> result = new HashMap<>();

        User user = userService.signUpNext(signupDto);
        UserInfoDto userInfoDto = UserInfoDto.builder()
                .email(user.getEmail())
                .password(user.getPassword())
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

    @GetMapping("/test/{testValue}")
    public ResponseEntity<?> Test(@PathVariable String testValue){
        Map<String, Object> result = new HashMap<>();
        result.put("test", testValue);
        return ResponseEntity.ok().body(result);
    }
}
