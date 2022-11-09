package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.entity.Closet;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.repository.ClosetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ClosetService {

    @Autowired
    ClosetRepository closetRepository;

    public List<Closet> getClosetsByUserId(User user) {
        return closetRepository.findAllByUser(user);
    }

    public String removeBackGround(String imgUrl) {
        String url = "http://localhost:8000/api/removeBg/"+imgUrl;
        System.out.println("restTemplate Url: "+url);
        RestTemplate restTemplate = new RestTemplate();
        String s = restTemplate.getForObject(url,String.class);
        return s;
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//
//        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
////        String imageFileString = getBase64String(file);
////        body.add("filename", id +"."+file.getContentType());
//        body.add("image", file);
//
//        System.out.println(file.getOriginalFilename()+","+file.getContentType());
//
//        HttpEntity<?> requestEntity = new HttpEntity<>(body, headers);
//        HttpEntity<?> response = restTemplate.postForEntity(url, requestEntity, String.class);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        System.out.println(response.getBody());
//        MultipartFile bgRemovedImg = objectMapper.readValue((byte[]) response.getBody(), MultipartFile.class);
    }

//    private String getBase64String(MultipartFile multipartFile) throws Exception {
//        byte[] bytes = multipartFile.getBytes();
//        return Base64.getEncoder().encodeToString(bytes);
//    }

    public List<String> getColorInfos(MultipartFile bgRemovedImg) {
        List<String> colorList = new ArrayList<>();


        return colorList;
    }
}
