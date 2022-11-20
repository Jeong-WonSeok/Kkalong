package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RecommendService {

    private final FirebaseService firebaseService;
    private final UserService userService;
    public String[] insertPersonal(User user, MultipartFile img) {


        String face = user.getFace_img();
        String personal = user.getPersonal_color();

        if(face == "") {
            System.out.println("a");
            if (personal == "") {
                System.out.println("B");
                return new String[]{user.getPersonal_color(), user.getFace_img()};
            }else {
                String url = "http://localhost:8000/api/personal_color/" + user.getId();
                RestTemplate restTemplate = new RestTemplate();
                String personal_color = restTemplate.getForObject(url, String.class);
                personal_color = personal_color.split("\"")[1].split("\"")[0];
                user.updatePersonalColor(personal_color);
                userService.saveUser(user);


                return new String[]{personal_color, user.getFace_img()};
            }
        }

        String face_img = firebaseService.uploadUserFaceImg(user.getId(), img);

        System.out.println(face_img);

        String url = "http://localhost:8000/api/personal_color/"+user.getId();
        RestTemplate restTemplate = new RestTemplate();
        String personal_color = restTemplate.getForObject(url, String.class);
        personal_color = personal_color.split("\"")[1].split("\"")[0];

        user.updatePersonalColor(personal_color);
        user.updateFaceImg(face_img);
        User savedUser = userService.saveUser(user);

        return new String[] {personal_color, face_img};

    }

    public List<HashMap<Object, Object>> recommendPersonal(String personal_color, String season, String gender, String style) {
        RestTemplate restTemplate = new RestTemplate();
        String url ="http://localhost:8000/api/personal_recommend/"+personal_color +"/"+ season+ "/" + gender +"/" + style;
        List<HashMap<Object, Object>> personal_recommend = restTemplate.getForObject(url, List.class);
        System.out.println(personal_recommend.getClass().getName());
        return personal_recommend;
    }

    public HashMap<Object, Object> recommendWeather(String style, String season, String gender, String temp) {
        RestTemplate restTemplate = new RestTemplate();
        String url ="http://localhost:8000/api/weather_recommend/"+ style +"/"+ season+ "/" + gender +"/" + temp;
        HashMap<Object, Object> weather_recommend = restTemplate.getForObject(url, HashMap.class);
        System.out.println(weather_recommend.getClass().getName());
        return weather_recommend;
    }

    public List<HashMap<Object, Object>> recommendClothing(String style, String season, String gender, String color, int main, int user_id) {
        RestTemplate restTemplate = new RestTemplate();
        String url ="http://localhost:8000/api/clothesInfo_recommend/"+ style +"/"+ season+ "/" + gender +"/" + color+ "/" + main+ "/" + user_id;
        List<HashMap<Object, Object>> clothes_recommend = restTemplate.getForObject(url, List.class);
        return clothes_recommend;
    }
}
