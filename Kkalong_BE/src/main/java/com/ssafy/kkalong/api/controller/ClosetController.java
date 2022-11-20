package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.*;
import com.ssafy.kkalong.api.entity.*;
import com.ssafy.kkalong.api.service.ClosetService;
import com.ssafy.kkalong.api.service.FirebaseService;
import com.ssafy.kkalong.api.service.UserService;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/closet")
public class ClosetController {

    private final ClosetService closetService;
    private final UserService userService;
    private final FirebaseService firebaseService;

    @GetMapping("/all/{user_id}")
    public ResponseEntity<?> getAllClosetByUserId(@PathVariable int user_id){
        Map<String, Object> result = new HashMap<>();
        User user = userService.getUserByUserId(user_id);
        List<ClosetInfoDto> closetInfoDtos = new ArrayList<>();
        List<Closet> closets = closetService.getClosetsByUserId(user);
        for (Closet closet : closets) {
            ClosetInfoDto closetInfoDto = ClosetInfoDto.builder()
                    .closet_id(closet.getId())
                    .name(closet.getName())
                    .clothings(closetService.findAllClothingByCloset(closet))
                    .codies(closetService.findAllCodybyCloset(closet))
                    .build();
            closetInfoDtos.add(closetInfoDto);
        }
        result.put("closets", closetInfoDtos);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/closet")
    public ResponseEntity<?> registerCloset(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody StringDto stringDto) throws Exception {
        Map<String, Object> result = new HashMap<>();
        result.put("closet_id", closetService.registerCloset(userInfo.getId(), stringDto.getValue()));
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/closet/{closet_id}")
    public ResponseEntity<?> getClothingImages(@PathVariable int closet_id) throws Exception {
        Map<String, Object> result = new HashMap<>();
        Closet closet = closetService.getClosetsByClosetId(closet_id);
        List<ClothingDto> clothings = closetService.findAllClothingByCloset(closet);
        String[] s1 = new String[2];
        String[] s2 = new String[2];
        for(ClothingDto clothingDto : clothings){
            String clothing_img_url = clothingDto.getImg();
            s1 = clothing_img_url.split("\\?");
            s2 = s1[0].split("/o/");
            System.out.println(s2[1]);
            URI url = URI.create(clothing_img_url);
            // 원격 파일 다운로드
            RestTemplate           rt     = new RestTemplate();
            ResponseEntity<byte[]> res    = rt.getForEntity(url, byte[].class);
            byte[]                 buffer = res.getBody();

            // 로컬 서버에 저장
//            String fileName = UUID.randomUUID().toString();                    // 파일명 (랜덤생성)
            String fileName = s2[1];                    // 파일명 (랜덤생성)
            String ext = "." + StringUtils.getFilenameExtension(clothing_img_url); // 확장자 추출
            Path target = Paths.get("/PLEASEPLEASE", fileName );    // 파일 저장 경로

            try {
                FileCopyUtils.copy(buffer, target.toFile());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
//        String url = "http://localhost:8000/api/clothing_img/"+s2[1];
//        RestTemplate restTemplate = new RestTemplate();
//        String removedBgImgUrl = restTemplate.getForObject(url,String.class);

        return ResponseEntity.ok().body(result);
    }

    @PostMapping(consumes = {"multipart/form-data"}, value = "/removeBg")
    public ResponseEntity<?> removeClothingImgBackground(@RequestPart MultipartFile img) {
        System.out.println("img file name:"+img.getOriginalFilename());
        System.out.println("img content type:"+img.getContentType());
        Map<String, Object> result = new HashMap<>();
        int next_clothing_id = closetService.findNextClothingId();
        System.out.println(next_clothing_id);
        String img_url = closetService.removeClothingImgBackground(next_clothing_id, img);
        img_url = img_url.substring(1, img_url.length()-1);
        String color = closetService.getColorInfos(next_clothing_id);
        color = color.substring(1, color.length()-1);
        result.put("img", img_url);
        result.put("color", color);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping(value = "/clothing")
    public ResponseEntity<?> registerClothing(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody ClothingDto clothingDto){
        Map<String, Object> result = new HashMap<>();
        Clothing clothing = closetService.registerClothing(userInfo.getId(), clothingDto);
        result.put("clothing_id", clothing.getId());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/clothing/{clothing_id}")
    public ResponseEntity<?> getClothingInfoByClothingId(@PathVariable int clothing_id){
        Map<String, Object> result = new HashMap<>();
        ClothingDto clothingDto = closetService.getClothingInfoByClothingId(clothing_id);
        result.put("clothing", clothingDto);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/clothings/{closet_id}")
    public ResponseEntity<?> getClothingsByClosetId(@PathVariable int closet_id){
        Map<String, Object> result = new HashMap<>();
        Closet closet = closetService.getClosetsByClosetId(closet_id);
        result.put("clothings", closetService.findAllClothingByCloset(closet));
        return ResponseEntity.ok().body(result);
    }

    @PostMapping(consumes = {"multipart/form-data"}, value = "/cody/img")
    public ResponseEntity<?> saveCodyImg(@RequestPart MultipartFile cody_img){
        Map<String, Object> result = new HashMap<>();
        int next_cody_id = closetService.findNextCodyId();
        String cody_img_url = firebaseService.uploadCodyImg(next_cody_id, cody_img);
        result.put("img", cody_img_url);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/cody")
    public ResponseEntity<?> registerCody(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody CodyDto codyDto){
        Map<String, Object> result = new HashMap<>();
        Cody cody = closetService.registerCody(userInfo.getId(), codyDto);
        result.put("cody_id", cody.getId());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/cody/{cody_id}")
    public ResponseEntity<?> getCodyInfoByCodyId(@PathVariable int cody_id){
        Map<String, Object> result = new HashMap<>();
        Cody cody = closetService.getCodyInfoByCodyId(cody_id);
        CodyResponseDto codyResponseDto = CodyResponseDto.builder()
                .cody_id(cody.getId())
                .img(cody.getImg())
                .name(cody.getName())
                .open(cody.getOpen())
                .build();
        result.put("cody", codyResponseDto);
        List<CodyClothing> codyClothings = closetService.findAllCodyClothingByCody(cody);
        ArrayList<ClothingDto> clothings = new ArrayList<>();
        for (CodyClothing codyClothing: codyClothings) {
            ClothingDto clothingDto = closetService.getClothingInfoByClothingId(codyClothing.getClothing().getId());
            clothings.add(clothingDto);
        }
        result.put("clothings", clothings);
        return ResponseEntity.ok().body(result);
    }
}
