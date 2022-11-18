package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.*;
import com.ssafy.kkalong.api.entity.*;
import com.ssafy.kkalong.api.service.ClosetService;
import com.ssafy.kkalong.api.service.UserService;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = {"*"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/closet")
public class ClosetController {

    private final ClosetService closetService;
    private final UserService userService;

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

    @PostMapping(consumes = {"multipart/form-data"}, value ="/cody")
    public ResponseEntity<?> registerCody(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestPart("cody") CodyDto codyDto, @RequestPart("img") MultipartFile img){
        Map<String, Object> result = new HashMap<>();
        Cody cody = closetService.registerCody(userInfo.getId(), codyDto, img);
        result.put("cody_id", cody.getId());
        result.put("img", cody.getImg());
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
