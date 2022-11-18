package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class RecommendService {

    private final FirebaseService firebaseService;
    private final UserRepository userRepository;

    public String insertPersonal(User user, MultipartFile img) {

        String img_url = firebaseService.uploadUserFaceImg(user.getId(), img);

        String url = "http://localhost:8000/api/personal_color/"+user.getId();
//        String url = "http://70.12.130.101:8000/api/remove_clothing_bg/"+next_clothing_id;
        RestTemplate restTemplate = new RestTemplate();
        String personal_color = restTemplate.getForObject(url,String.class);
        personal_color = personal_color.split("\"")[1].split("\"")[0];
        System.out.println(personal_color);
        userRepository.updatePersonal(user.getId(), personal_color);

        return personal_color;

    }

    public HashMap<Object, Object> recommendPersonal(String personal_color, String fall, String gender, String style) {
        RestTemplate restTemplate = new RestTemplate();
        String url ="http://localhost:8000/api/personal_recommend/"+personal_color +"/"+ fall+ "/" + gender +"/" + style;
        HashMap<Object, Object> personal_recommend = restTemplate.getForObject(url, HashMap.class);
        System.out.println(personal_recommend.getClass().getName());
        return personal_recommend;
    }

    public HashMap<Object, Object> recommendWeather(String weather, String fall, String gender, String style) {
        RestTemplate restTemplate = new RestTemplate();
        String url ="http://localhost:8000/api/weather_recommend/"+ weather +"/"+ fall+ "/" + gender +"/" + style;
        HashMap<Object, Object> personal_recommend = restTemplate.getForObject(url, HashMap.class);
        System.out.println(personal_recommend.getClass().getName());
        return personal_recommend;
    }

}
