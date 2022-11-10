package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.dto.ClothingDto;
import com.ssafy.kkalong.api.entity.*;
import com.ssafy.kkalong.api.repository.*;
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

    private final UserRepository userRepository;
    private final ClosetRepository closetRepository;
    private final ClothingRepository clothingRepository;
    private final BrandRepository brandRepository;
    private final FirebaseService firebaseService;
    private final ClosetClothingRepository closetClothingRepository;

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

    public Clothing registerClothing(int user_id, ClothingDto clothingDto, MultipartFile img) {
        User user = userRepository.findById(user_id);
        Clothing clothing = Clothing.builder()
                .main_category(clothingDto.getMainCategory())
                .sub_category(clothingDto.getSubCategory())
                .spring(clothingDto.isSpring())
                .summer(clothingDto.isSummer())
                .fall(clothingDto.isFall())
                .winter(clothingDto.isWinter())
                .color(clothingDto.getColor())
                .gender(user.getGender())
                .brand(brandRepository.findById(clothingDto.getBrand_id()))
                .build();
        int clothing_id = clothingRepository.save(clothing).getId();
        Clothing savedClothing = clothingRepository.findById(clothing_id);
        String imgUrl = firebaseService.uploadClothingImgWithoutBackground(clothing_id, img);
        //옷장과 옷 매핑
        Closet baseCloset = closetRepository.findBaseClosetByUserId(user_id);
        if(baseCloset.getId() != clothingDto.getCloset_id()){
            Closet currCloset = closetRepository.findById(clothingDto.getCloset_id());
            ClosetClothing closetClothing = ClosetClothing.builder().closet(currCloset).clothing(savedClothing).build();
            closetClothingRepository.save(closetClothing);
        }
        ClosetClothing closetClothing = ClosetClothing.builder().closet(baseCloset).clothing(savedClothing).build();
        ClosetClothing cl = closetClothingRepository.save(closetClothing);
        return clothing;
    }

    public ClothingDto getClothingInfoByClothingId(int clothing_id) {
        Clothing clothing = clothingRepository.findById(clothing_id);
        ClothingDto clothingDto = ClothingDto.builder()
                .closet_id(-1)
                .img(clothing.getImg())
                .mainCategory(clothing.getMain_category())
                .subCategory(clothing.getSub_category())
                .spring(clothing.isSpring())
                .summer(clothing.isSummer())
                .fall(clothing.isFall())
                .winter(clothing.isWinter())
                .color(clothing.getColor())
                .gender(clothing.getGender())
                .brand_id(clothing.getBrand().getId())
                .url(clothing.getUrl())
                .build();
        return clothingDto;
    }
}
