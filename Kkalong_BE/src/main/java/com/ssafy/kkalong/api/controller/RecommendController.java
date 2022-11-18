package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.ClothingDto;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.*;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/recommend")
public class RecommendController {

    private final WeatherService weatherService;
    private final RecommendService recommendService;
    private final UserService userService;
    private final ClosetService closetService;
    @PostMapping(consumes = {"multipart/form-data"}, value = "/personal")
    public ResponseEntity<String> insertPersonal(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestPart MultipartFile img){
        User user = userService.getUserByUserId(userInfo.getId());
        String personal = recommendService.insertPersonal(user, img);
        return ResponseEntity.ok().body(personal);
    }


    @GetMapping("/personalColor")
    public ResponseEntity<?> PersonalColorRecommend(@AuthenticationPrincipal UserDetailsImpl userInfo){

        User user = userService.getUserByUserId(userInfo.getId());

        List<HashMap<Object, Object>> casual = recommendService.recommendPersonal(user.getPersonal_color(), "fall", user.getGender(), "casual");
//        List<HashMap<Object, Object>> dandy = recommendService.recommendPersonal(user.getPersonal_color(), "fall", user.getGender(), "dandy");
//        List<HashMap<Object, Object>> hiphop = recommendService.recommendPersonal(user.getPersonal_color(), "fall", user.getGender(), "hiphop");
//        List<HashMap<Object, Object>> formal = recommendService.recommendPersonal(user.getPersonal_color(), "fall", user.getGender(), "formal");
        Map<String, Object> result = new HashMap<>();
        result.put("casual", casual);
//        result.put("dandy", dandy);
//        result.put("hiphop", hiphop);
//        result.put("formal", formal);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/weather/{x}/{y}")
    public ResponseEntity<?> getWeather(@AuthenticationPrincipal UserDetailsImpl userInfo, @PathVariable String x, @PathVariable String y) throws JSONException, IOException {
        String today = "20221118";
        String time = "1152";
        User user = userService.getUserByUserId(userInfo.getId());
        Map<String, String> weather = weatherService.loadTodayWeather(x, y, today, time, "1500");
        List<HashMap<Object, Object>> casual = recommendService.recommendWeather("casual", "fall", user.getGender(), weather.get(today));
//        HashMap<Object, Object> dandy = recommendService.recommendWeather("dandy", "fall", user.getGender(), weather.get(today));
//        HashMap<Object, Object> hiphop = recommendService.recommendWeather("hiphop", "fall", user.getGender(), weather.get(today));
//        HashMap<Object, Object> formal = recommendService.recommendWeather("formal", "fall", user.getGender(), weather.get(today));
        Map<String, Object> result = new HashMap<>();
        result.put("casual", casual);
        return ResponseEntity.ok().body(casual);
    }

    @GetMapping("/clothesInfo/{clothes_id}")
    public ResponseEntity<?> ClothesInfoRecommend(@AuthenticationPrincipal UserDetailsImpl userInfo, @PathVariable int clothes_id){

        User user = userService.getUserByUserId(userInfo.getId());
        ClothingDto clothes = closetService.getClothingInfoByClothingId(clothes_id);
        String style = closetService.getStyleByClothingId(clothes_id);
        List<HashMap<Object,Object>> cody = recommendService.recommendClothing(style, "fall", user.getGender(), clothes.getColor());
        Map<String, Object> result = new HashMap<>();
        result.put("cody", cody);

        return ResponseEntity.ok().body(result);
    }


}
