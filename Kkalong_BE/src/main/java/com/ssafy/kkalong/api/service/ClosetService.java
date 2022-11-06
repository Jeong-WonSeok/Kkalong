package com.ssafy.kkalong.api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.kkalong.api.entity.Closet;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.repository.ClosetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;

@Service
public class ClosetService {

    @Autowired
    ClosetRepository closetRepository;

    public List<Closet> getClosetsByUserId(User user) {
        return closetRepository.findAllByUser(user);
    }

    public MultipartFile removeBackGround(int id, MultipartFile file) throws Exception {

        String originalFileName = file.getOriginalFilename();
        String url = "http://k7b302.p.ssafy.io:8000/api/removeBg";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        String imageFileString = getBase64String(file);
        body.add("filename", id +"."+file.getContentType());
        body.add("image", imageFileString);

        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);
        HttpEntity<?> response = restTemplate.postForEntity(url, requestMessage, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        MultipartFile bgRemovedImg = objectMapper.readValue((byte[]) response.getBody(), MultipartFile.class);
        return bgRemovedImg;
    }

    private String getBase64String(MultipartFile multipartFile) throws Exception {
        byte[] bytes = multipartFile.getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }

    public List<String> getColorInfos(MultipartFile bgRemovedImg) {
    }
}
