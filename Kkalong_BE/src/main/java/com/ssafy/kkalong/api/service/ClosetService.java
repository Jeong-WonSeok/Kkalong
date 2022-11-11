package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.dto.ClothingDto;
import com.ssafy.kkalong.api.dto.CodyDto;
import com.ssafy.kkalong.api.dto.CodyResponseDto;
import com.ssafy.kkalong.api.entity.*;
import com.ssafy.kkalong.api.repository.*;
import lombok.RequiredArgsConstructor;
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
    private final CodyRepository codyRepository;
    private final CodyClothingRepository codyClothingRepository;
    private final ClosetCodyRepository closetCodyRepository;

    public Object registerCloset(int user_id, String value) {
        User user = userRepository.findById(user_id);
        Closet closet = Closet.builder()
                .base(false)
                .user(user)
                .name(value)
                .build();
        return closetRepository.save(closet).getId();
    }

    public List<Closet> getClosetsByUserId(User user) {
        return closetRepository.findAllByUser(user);
    }

    public String removeBackGround(int user_id, MultipartFile file) {
//        String url = "http://localhost:8000/api/removeBg/"+imgUrl;
//        System.out.println("restTemplate Url: "+url);
//        RestTemplate restTemplate = new RestTemplate();
//        String s = restTemplate.getForObject(url,String.class);
//        return s;

        return firebaseService.uploadClothingImgWithoutBackground(user_id, file);
    }

    public List<String> getColorInfos() {
        List<String> colorList = new ArrayList<>();
        colorList.add("파랑색");
        colorList.add("초록색");
        return colorList;
    }

    public Clothing registerClothing(int user_id, ClothingDto clothingDto) {
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
                .img(clothingDto.getImg()) //임시 대처
                .brand(brandRepository.findById(clothingDto.getBrand_id()))
                .build();
        int clothing_id = clothingRepository.save(clothing).getId();
        Clothing savedClothing = clothingRepository.findById(clothing_id);
//        String imgUrl = firebaseService.uploadClothingImgWithoutBackground(clothing_id, img);
//        savedClothing.setClothingImgUrl(imgUrl);
//        clothingRepository.save(clothing);

        //옷장과 옷 매핑
        Closet baseCloset = closetRepository.findBaseClosetByUserId(user_id);
        if(baseCloset.getId() != clothingDto.getCloset_id()){
            Closet currCloset = closetRepository.findById(clothingDto.getCloset_id());
            ClosetClothing closetClothing = ClosetClothing.builder().closet(currCloset).clothing(savedClothing).build();
            closetClothingRepository.save(closetClothing);
        }
        ClosetClothing closetClothing = ClosetClothing.builder().closet(baseCloset).clothing(savedClothing).build();
        closetClothingRepository.save(closetClothing);
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

    public Cody registerCody(int user_id, CodyDto codyDto, MultipartFile img) {
        Cody cody = Cody.builder()
                .creator(codyDto.getCreater_id())
                .user(userRepository.findById(codyDto.getUser_id()))
                .name(codyDto.getName())
                .open(codyDto.getCreater_id()==codyDto.getUser_id()?true:false)
                .style(codyDto.getStyle())
                .spring(codyDto.isSpring())
                .summer(codyDto.isSummer())
                .fall(codyDto.isFall())
                .winter(codyDto.isWinter())
                .build();
        int cody_id = codyRepository.save(cody).getId();
        Cody savedCody = codyRepository.findById(cody_id);
        String imgUrl = firebaseService.uploadCodyImg(cody_id, img);
        savedCody.setCodyImgUrl(imgUrl);
        codyRepository.save(savedCody);

        //코디 옷 매칭
        for(int clothing_id : codyDto.getClothings()){
            Clothing clothing = clothingRepository.findById(clothing_id);
            CodyClothing codyClothing = CodyClothing.builder().cody(savedCody).clothing(clothing).build();
            codyClothingRepository.save(codyClothing);
        }

        //옷장 코디 매칭
        Closet baseCloset = closetRepository.findBaseClosetByUserId(user_id);
        if(baseCloset.getId() != codyDto.getCloset_id()){
            Closet currCloset = closetRepository.findById(codyDto.getCloset_id());
            ClosetCody closetCody = ClosetCody.builder().closet(currCloset).cody(savedCody).build();
            closetCodyRepository.save(closetCody);
        }
        ClosetCody closetCody = ClosetCody.builder().closet(baseCloset).cody(savedCody).build();
        closetCodyRepository.save(closetCody);
        return cody;
    }

    public Cody getCodyInfoByCodyId(int cody_id) {
        return codyRepository.findById(cody_id);
    }

    public List<CodyClothing> findAllCodyClothingByCody(Cody cody) {
        return codyClothingRepository.findAllByCody(cody);
    }

    public List<ClothingDto> findAllClothingByCloset(Closet closet) {
        List<ClosetClothing> closetClothings = closetClothingRepository.findAllByCloset(closet);
        List<ClothingDto> clothingDtos = new ArrayList<>();
        for (ClosetClothing closetClothing : closetClothings){
            clothingDtos.add(getClothingInfoByClothingId(closetClothing.getClothing().getId()));
        }
        return clothingDtos;
    }

    public List<CodyResponseDto> findAllCodybyCloset(Closet closet) {

        List<ClosetCody> closetCodies = closetCodyRepository.findAllByCloset(closet);
        List<CodyResponseDto> codyResponseDtos = new ArrayList<>();
        for(ClosetCody closetCody : closetCodies){
            CodyResponseDto codyResponseDto = CodyResponseDto.builder()
                    .cody_id(closetCody.getCody().getId())
                    .img(closetCody.getCody().getImg())
                    .name(closetCody.getCody().getName())
                    .open(closetCody.getCody().getOpen())
                    .build();
            codyResponseDtos.add(codyResponseDto);
        }
        return codyResponseDtos;
    }

}
