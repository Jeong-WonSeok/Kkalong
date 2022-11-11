package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.ClosetInfoDto;
import com.ssafy.kkalong.api.dto.ClothingDto;
import com.ssafy.kkalong.api.dto.CodyDto;
import com.ssafy.kkalong.api.dto.CodyResponseDto;
import com.ssafy.kkalong.api.entity.Closet;
import com.ssafy.kkalong.api.entity.Cody;
import com.ssafy.kkalong.api.entity.CodyClothing;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.ClosetService;
import com.ssafy.kkalong.api.service.FirebaseService;
import com.ssafy.kkalong.api.service.UserService;
import com.ssafy.kkalong.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/closet")
public class ClosetController {

    @Autowired
    ClosetService closetService;
    @Autowired
    UserService userService;
    @Autowired
    FirebaseService firebaseService;


    @GetMapping("/all")
    public ResponseEntity<?> getAllClosetByUserId(@AuthenticationPrincipal UserDetailsImpl userInfo){
        Map<String, Object> result = new HashMap<>();
        User user = userService.getUserByUserId(userInfo.getId());
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

    @PostMapping(value = "/removeBg")
    public ResponseEntity<?> removeBackground(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody MultipartFile img) throws Exception {
        Map<String, Object> result = new HashMap<>();
        List<String> colors = new ArrayList<>();
        colors.add("파랑색");
        colors.add("초록색");
        result.put("img", closetService.removeBackGround(userInfo.getId(), img));
        result.put("color", colors);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping(value = "/clothing")
    public void registerClothing(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody ClothingDto clothingDto){
        closetService.registerClothing(userInfo.getId(), clothingDto);
    }

    @GetMapping("/clothing/{clothing_id}")
    public ResponseEntity<?> getClothingInfoByClothingId(@PathVariable int clothing_id){
        Map<String, Object> result = new HashMap<>();
        ClothingDto clothingDto = closetService.getClothingInfoByClothingId(clothing_id);
        result.put("clothing", clothingDto);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping(consumes = {"multipart/form-data"}, value ="/cody")
    public void registerCody(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestPart("cody") CodyDto codyDto, @RequestPart("img") MultipartFile img){
        closetService.registerCody(userInfo.getId(), codyDto, img);
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
