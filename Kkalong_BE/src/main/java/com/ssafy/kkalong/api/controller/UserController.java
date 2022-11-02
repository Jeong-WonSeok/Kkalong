package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.SignupDto;
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
        result.put("token", jwtProvider.generateJwtTokenFromUser(user));
        result.put("user", user);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/signup/{email}")
    public ResponseEntity<?> authorizeEmail(@PathVariable String email){
        Map<String, Object> result = new HashMap<>();

        if(userService.isEmailDuplicated(email)){
            result.put("provider", userService.getProvider(email));
        } else{
            result.put("security",  userService.sendEmail(email));
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
