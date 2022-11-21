package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.dto.*;
import com.ssafy.kkalong.api.entity.*;
import com.ssafy.kkalong.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;


@Service
@RequiredArgsConstructor
@Transactional
public class ClosetService {

    private final UserRepository userRepository;
    private final ClosetRepository closetRepository;
    private final ClothingRepository clothingRepository;
    private final FirebaseService firebaseService;
    private final BrandRepository brandRepository;
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

    public String removeClothingImgBackground(int next_clothing_id, MultipartFile file) {
        firebaseService.uploadClothingImgWithBackground(next_clothing_id, file);
        String url = "http://localhost:8001/api/remove_clothing_bg/"+next_clothing_id;
//        String url = "http://70.12.130.101:8000/api/remove_clothing_bg/"+next_clothing_id;
        RestTemplate restTemplate = new RestTemplate();
        String removedBgImgUrl = restTemplate.getForObject(url,String.class);
        return removedBgImgUrl;
    }

    public String getColorInfos(int next_clothing_id) {
        String url = "http://localhost:8001/api/clothing_color/"+next_clothing_id;
//        String url = "http://70.12.130.101:8000/api/clothing_color/"+next_clothing_id;
        RestTemplate restTemplate = new RestTemplate();
        String color = restTemplate.getForObject(url,String.class);
        return color;
    }

    public String getCategoryInfos(int next_clothing_id) {
        String url = "http://70.12.130.101:8000/api/clothing_type/"+next_clothing_id;
        RestTemplate restTemplate = new RestTemplate();
        String mainCategory = restTemplate.getForObject(url,String.class);
        return mainCategory;
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
                .style(clothingDto.getStyle())
                .color(clothingDto.getColor())
                .gender(user.getGender())
                .img(clothingDto.getImg()) //임시 대처
                .brand(brandRepository.findById(clothingDto.getBrand_id()))
                .build();
        int clothing_id = clothingRepository.save(clothing).getId();
        Clothing savedClothing = clothingRepository.findById(clothing_id);

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

    public ClothingInfoResponseDto getClothingInfoByClothingId(int clothing_id) {
        Clothing clothing = clothingRepository.findById(clothing_id);
        List<String> season = getStringSeasonsfromClothing(clothing);
        ClothingInfoResponseDto clothingInfoResponseDto = ClothingInfoResponseDto.builder()
                .clothing_id(clothing.getId())
                .img(clothing.getImg())
                .mainCategory(clothing.getMain_category())
                .subCategory(clothing.getSub_category())
                .season(season)
                .color(clothing.getColor())
                .personal_color(getPersonalColorByClothingColor(clothing.getColor()))
                .style(clothing.getStyle())
                .gender(clothing.getGender())
                .brand_id(clothing.getBrand().getId())
                .url(clothing.getUrl())
                .build();
        return clothingInfoResponseDto;
    }

    public Cody registerCody(int user_id, CodyDto codyDto) {
        Cody cody = Cody.builder()
                .creator(codyDto.getCreater_id())
                .user(userRepository.findById(codyDto.getUser_id()))
                .name(codyDto.getName())
                .open(codyDto.getCreater_id()==codyDto.getUser_id()?true:false)
                .style(codyDto.getStyle())
                .img(codyDto.getImg())
                .spring(codyDto.isSpring())
                .summer(codyDto.isSummer())
                .fall(codyDto.isFall())
                .winter(codyDto.isWinter())
                .build();
        Cody savedCody =  codyRepository.save(cody);

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

    public List<ClothingInfoResponseDto> findAllClothingByCloset(Closet closet) {
        List<ClosetClothing> closetClothings = closetClothingRepository.findAllByCloset(closet);
        List<ClothingInfoResponseDto> clothingInfoResponseDtos = new ArrayList<>();
        for (ClosetClothing closetClothing : closetClothings){
            clothingInfoResponseDtos.add(getClothingInfoByClothingId(closetClothing.getClothing().getId()));
        }
        return clothingInfoResponseDtos;
    }

    public List<CodyInfoResponseDto> findAllCodybyCloset(Closet closet) {
        List<ClosetCody> closetCodies = closetCodyRepository.findAllByCloset(closet);
        List<CodyInfoResponseDto> codyInfoResponseDtos = new ArrayList<>();
        for(ClosetCody closetCody : closetCodies){
            CodyInfoResponseDto codyInfoResponseDto = CodyInfoResponseDto.builder()
                    .cody_id(closetCody.getCody().getId())
                    .img(closetCody.getCody().getImg())
                    .name(closetCody.getCody().getName())
                    .open(closetCody.getCody().getOpen())
                    .style(closetCody.getCody().getStyle())
                    .season(getStringSeasonsfromCody(closetCody.getCody()))
                    .clothings(findAllClothingbyCody(closetCody.getCody()))
                    .build();
            codyInfoResponseDtos.add(codyInfoResponseDto);
        }
        return codyInfoResponseDtos;
    }

    public List<Integer> findAllClothingbyCody(Cody cody){
        List<Integer> clothings = new ArrayList<>();
        List<CodyClothing> codyClothings = findAllCodyClothingByCody(cody);
        for(CodyClothing codyClothing : codyClothings){
            clothings.add(codyClothing.getClothing().getId());
        }
        return clothings;
    }

    public int findNextClothingId() {
        int count = clothingRepository.countBy();
        if(count==0){
            return 1;
        } else{
            return clothingRepository.findMaxClothingId()+1;
        }
    }

    public int findNextCodyId() {
        int count = codyRepository.countBy();
        if(count==0){
            return 1;
        } else{
            return codyRepository.findMaxCodyId()+1;
        }
    }

    public String getStyleByClothingId(int clothes_id) {
        Clothing clothing= clothingRepository.findById(clothes_id);
        return clothing.getStyle();
    }

    public Closet getClosetsByClosetId(int closet_id) {
        return closetRepository.findById(closet_id);
    }

    private List<String> getStringSeasonsfromClothing(Clothing clothing) {
        List<String> seasons = new ArrayList<>();
        if(clothing.isSpring()){
            seasons.add("봄");
        }
        if(clothing.isSummer()){
            seasons.add("여름");
        }
        if(clothing.isFall()){
            seasons.add("가을");
        }
        if(clothing.isWinter()){
            seasons.add("겨울");
        }
        return seasons;
    }

    public List<String> getStringSeasonsfromCody(Cody cody) {
        List<String> seasons = new ArrayList<>();
        if(cody.isSpring()){
            seasons.add("봄");
        }
        if(cody.isSummer()){
            seasons.add("여름");
        }
        if(cody.isFall()){
            seasons.add("가을");
        }
        if(cody.isWinter()){
            seasons.add("겨울");
        }
        return seasons;
    }

    private static String getPersonalColorByClothingColor(String color) {

        HashMap<String, String> map = new HashMap<>();

        map.put("라즈베리", "봄 웜");
        map.put("페일 핑크", "봄 웜");
        map.put("코랄", "봄 웜");
        map.put("노란색", "봄 웜");
        map.put("머스타드", "봄 웜");
        map.put("금색", "봄 웜");
        map.put("라이트 그린", "봄 웜");
        map.put("올리브 그린", "봄 웜");
        map.put("네온 블루", "봄 웜");
        map.put("라벤더", "봄 웜");
        map.put("갈색", "봄 웜");
        map.put("로즈골드", "봄 웜");
        map.put("레드 브라운", "봄 웜");
        map.put("카키 베이지", "봄 웜");
        map.put("카멜", "봄 웜");
        map.put("샌드", "봄 웜");
        map.put("베이지색", "봄 웜");

        map.put("라이트 핑크","여름 쿨");
        map.put("피치","여름 쿨");
        map.put("라이트 옐로우","여름 쿨");
        map.put("네온 그린","여름 쿨");
        map.put("민트","여름 쿨");
        map.put("스카이 블루","여름 쿨");
        map.put("라벤더","여름 쿨");
        map.put("베이지색","여름 쿨");

        map.put("딥레드","가을 웜");
        map.put("오렌지 핑크","가을 웜");
        map.put("카키","가을 웜");
        map.put("다크 그린","가을 웜");
        map.put("자주","가을 웜");
        map.put("보라색","가을 웜");
        map.put("다크 바이올렛","가을 웜");
        map.put("버건디","가을 웜");
        map.put("갈색","가을 웜");
        map.put("로즈골드","가을 웜");
        map.put("레드 브라운","가을 웜");
        map.put("카키 베이지","가을 웜");
        map.put("카멜","가을 웜");

        map.put("은색", "겨울 쿨");
        map.put("빨간색", "겨울 쿨");
        map.put("네온 핑크", "겨울 쿨");
        map.put("분홍색", "겨울 쿨");
        map.put("라이트 오렌지", "겨울 쿨");
        map.put("네온 오렌지", "겨울 쿨");
        map.put("주황색", "겨울 쿨");
        map.put("녹색", "겨울 쿨");
        map.put("네온 블루", "겨울 쿨");
        map.put("파란색", "겨울 쿨");
        map.put("샌드", "겨울 쿨");

        map.put("검정색","겨울 쿨");
        map.put("흰색","겨울 쿨");
        map.put("회색","겨울 쿨");
        map.put("라이트 그레이","겨울 쿨");
        map.put("다크 그레이","겨울 쿨");
        map.put("아이보리","봄 웜");
        map.put("네이비","겨울 쿨");
        map.put("데님","겨울 쿨");
        map.put("연청","여름 쿨");
        map.put("중청","겨울 쿨");
        map.put("진청","가을 웜");
        map.put("흑청","겨울 쿨");
        System.out.println(map.get(color));
        return map.get(color);
    }

}
