package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.CommunityService;
import com.ssafy.kkalong.api.service.RecommendService;
import com.ssafy.kkalong.api.service.UserService;
import com.ssafy.kkalong.api.service.WeatherService;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/recommend")
public class    RecommendController {

    @Autowired
    WeatherService weatherService;
    @Autowired
    RecommendService recommendService;
    @Autowired
    UserService userService;
    @Autowired
    CommunityService communityService;

    @PostMapping(consumes = {"multipart/form-data"}, value = "/personal")
    public ResponseEntity<String> insertPersonal(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestPart MultipartFile img){

        User user = userService.getUserByUserId(userInfo.getId());

        String personal = recommendService.insertPersonal(user, img);

        return ResponseEntity.ok().body(personal);
    }


    @PostMapping("/personal/{style}")
    public ResponseEntity<?> PersonalColorRecommend(@AuthenticationPrincipal UserDetailsImpl userInfo, @PathVariable String style){
        User user = userService.getUserByUserId(userInfo.getId());
        HashMap<Object, Object> result = recommendService.recommendPersonal(user.getPersonal_color(), "fall", user.getGender(), style);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/weather/{today}/{time}/{x}/{y}")
    public ResponseEntity<?> getWeather(@PathVariable String today, @PathVariable String time, @PathVariable String x, @PathVariable String y) throws JSONException, IOException {
        Map<String, String> weather = weatherService.loadTodayWeather(x, y, today, time);

        return ResponseEntity.ok().body(weather);
    }
}
