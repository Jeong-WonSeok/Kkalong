package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.ClothingDto;
import com.ssafy.kkalong.api.dto.ClothingInfoResponseDto;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.*;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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

    private final FirebaseService firebaseService;

    @PostMapping(consumes = {"multipart/form-data"}, value = "/personal")
    public ResponseEntity<?> insertPersonal(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestPart MultipartFile img){

        User user = userService.getUserByUserId(userInfo.getId());

        String[] personal = recommendService.insertPersonal(user, img);

        Map<String, Object> result = new HashMap<>();
        result.put("faceImg", personal[1]);
        result.put("personal", personal[0]);

        return ResponseEntity.ok().body(result);
    }


    @GetMapping("/personalColor")
    public ResponseEntity<?> PersonalColorRecommend(@AuthenticationPrincipal UserDetailsImpl userInfo){

        LocalDate now = LocalDate.now();
        DateTimeFormatter Monthformater = DateTimeFormatter.ofPattern("MM");
        int month = Integer.parseInt(now.format(Monthformater));
        String season = "";

        if(month <= 3 || month ==12) season = "winter";
        else if (month >= 4 && month <= 5) season = "spring";
        else if (month >= 6 && month <= 9) season = "summer";
        else season = "fall";


        User user = userService.getUserByUserId(userInfo.getId());


        List<HashMap<Object, Object>> casual = recommendService.recommendPersonal(user.getPersonal_color(), season, user.getGender(), "casual");
        //데이터 넣고 바꿈
        List<HashMap<Object, Object>> dandy = recommendService.recommendPersonal(user.getPersonal_color(), season, user.getGender(), "formal");
        List<HashMap<Object, Object>> hiphop = recommendService.recommendPersonal(user.getPersonal_color(), season, user.getGender(), "casual");
        List<HashMap<Object, Object>> formal = recommendService.recommendPersonal(user.getPersonal_color(), season, user.getGender(), "formal");
        Map<String, Object> result = new HashMap<>();
        result.put("casual", casual);
        result.put("dandy", dandy);
        result.put("hiphop", hiphop);
        result.put("formal", formal);
        result.put("personal", user.getPersonal_color());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/weather/{x}/{y}")
    public ResponseEntity<?> getWeather(@AuthenticationPrincipal UserDetailsImpl userInfo, @PathVariable String x, @PathVariable String y) throws JSONException, IOException {
        System.out.println(x);
        LocalDate now = LocalDate.now();
        LocalDate tomorrow = now.plusDays(1);
        LocalDate afterTwoDay = now.plusDays(2);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String today = now.format(formatter);
        String tomorrowDay = tomorrow.format(formatter);
        String twoDay = afterTwoDay.format(formatter);

        LocalTime timeNow = LocalTime.now();
        DateTimeFormatter timeFormatter =DateTimeFormatter.ofPattern("HHmm");
        String time = timeNow.format(timeFormatter);
        DateTimeFormatter Monthformater = DateTimeFormatter.ofPattern("MM");

        int month = Integer.parseInt(now.format(Monthformater));
        String season = "";

        if(month <= 3 || month ==12) season = "winter";
        else if (month >= 4 && month <= 5) season = "spring";
        else if (month >= 6 && month <= 9) season = "summer";
        else season = "fall";

        User user = userService.getUserByUserId(userInfo.getId());
        Map<String, String> weather = weatherService.loadTodayWeather(x, y, today, time, "700", tomorrowDay, twoDay);

        HashMap<Object, Object> casual1 = recommendService.recommendWeather("casual", season, user.getGender(), weather.get("today"));
        //데이터 전처리하고 바꿀것
        HashMap<Object, Object>  dandy1 = recommendService.recommendWeather("formal", season, user.getGender(), weather.get("today"));
        HashMap<Object, Object>  hiphop1 = recommendService.recommendWeather("casual", season, user.getGender(), weather.get("today"));
        HashMap<Object, Object>  formal1 = recommendService.recommendWeather("formal", season, user.getGender(), weather.get("today"));

        HashMap<Object, Object>  casual2 = recommendService.recommendWeather("casual", season, user.getGender(), weather.get("tomorrow"));
        //데이터 전처리하고 바꿀것
        HashMap<Object, Object>  dandy2 = recommendService.recommendWeather("formal", season, user.getGender(), weather.get("tomorrow"));
        HashMap<Object, Object>  hiphop2 = recommendService.recommendWeather("casual", season, user.getGender(), weather.get("tomorrow"));
        HashMap<Object, Object>  formal2 = recommendService.recommendWeather("formal", season, user.getGender(), weather.get("tomorrow"));

        HashMap<Object, Object>  casual3 = recommendService.recommendWeather("casual", season, user.getGender(), weather.get("tomorrowAfter"));
        //데이터 전처리하고 바꿀것
        HashMap<Object, Object>  dandy3 = recommendService.recommendWeather("formal", season, user.getGender(), weather.get("tomorrowAfter"));
        HashMap<Object, Object>  hiphop3 = recommendService.recommendWeather("casual", season, user.getGender(), weather.get("tomorrowAfter"));
        HashMap<Object, Object>  formal3 = recommendService.recommendWeather("formal", season, user.getGender(), weather.get("tomorrowAfter"));
//
        Map<String, Object> first = new HashMap<>();
        Map<String, Object> second = new HashMap<>();
        Map<String, Object> third = new HashMap<>();
        Map<String, Object> result = new HashMap<>();
        first.put("casual", casual1);
        first.put("dandy", dandy1);
        first.put("hiphop", hiphop1);
        first.put("formal", formal1);
        second.put("casual", casual2);
        second.put("dandy", dandy2);
        second.put("hiphop", hiphop2);
        second.put("formal", formal2);
        third.put("casual", casual3);
        third.put("dandy", dandy3);
        third.put("hiphop", hiphop3);
        third.put("formal", formal3);
        result.put("one", first);
        result.put("two", second);
        result.put("three", third);
        result.put("weather", weather);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/clothesInfo/{clothes_id}")
    public ResponseEntity<?> ClothesInfoRecommend(@AuthenticationPrincipal UserDetailsImpl userInfo, @PathVariable int clothes_id){
        LocalDate now = LocalDate.now();
        DateTimeFormatter Monthformater = DateTimeFormatter.ofPattern("MM");
        int month = Integer.parseInt(now.format(Monthformater));
        String season = "";

        if(month <= 3 || month ==12) season = "winter";
        else if (month >= 4 && month <= 5) season = "spring";
        else if (month >= 6 && month <= 9) season = "summer";
        else season = "fall";

        User user = userService.getUserByUserId(userInfo.getId());
        ClothingInfoResponseDto clothes = closetService.getClothingInfoByClothingId(clothes_id);
        String style = closetService.getStyleByClothingId(clothes_id);
        List<HashMap<Object,Object>> cody = recommendService.recommendClothing(style, season, user.getGender(), clothes.getColor(), clothes.getMainCategory(),user.getId());
        Map<String, Object> result = new HashMap<>();
        result.put("cody", cody);

        return ResponseEntity.ok().body(result);
    }


}
