package com.ssafy.kkalong.api.controller;


import com.ssafy.kkalong.api.dto.ClothingDto;
import com.ssafy.kkalong.api.entity.Closet;
import com.ssafy.kkalong.api.entity.Clothing;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.ClosetService;
import com.ssafy.kkalong.api.service.FirebaseService;
import com.ssafy.kkalong.api.service.UserService;
import com.ssafy.kkalong.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;


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
        List<Map<String, Object>> result = new ArrayList<>();
        User user = userService.getUserByUserId(userInfo.getId());
        List<Closet> closets = closetService.getClosetsByUserId(user);
        for (Closet closet : closets) {
            System.out.println();
        }
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/removeBg")
    public ResponseEntity<?> removeBackgroundAndGetColorInfo(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody MultipartFile file) throws Exception {
        Map<String, Object> result = new HashMap<>();
        if (file!=null) {
//            MultipartFile bgRemovedImg = closetService.removeBackGround(userInfo.getId(), imgUrl);
//            List<String> extractedColors = closetService.getColorInfos(bgRemovedImg);
//            RemoveBgDto removeBgDto = RemoveBgDto.builder()
//                    .file(bgRemovedImg)
//                    .color(extractedColors)
//                    .build();
//            result.put("img", removeBgDto);
            String imgUrl = firebaseService.uploadImageWithBackground(userInfo.getId(), userInfo.getEmail(), file);
            System.out.println(imgUrl);
            String removedBgImgUrl = closetService.removeBackGround(imgUrl);
            System.out.println(removedBgImgUrl);

            return ResponseEntity.ok().body(result);
        } else{
            return ResponseEntity.badRequest().body("이미지 파일이 없습니다");
        }
    }

    @PostMapping(consumes = {"multipart/form-data"}, value = "/clothing")
    public void registerClothing(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestPart("clothing") ClothingDto clothingDto, @RequestPart("img") MultipartFile img){
        closetService.registerClothing(userInfo.getId(), clothingDto, img);
    }

    @GetMapping("/clothing/{clothing_id}")
    public ResponseEntity<?> getClothingInfoByClothingId(@PathVariable int clothing_id){
        Map<String, Object> result = new HashMap<>();
        ClothingDto clothingDto = closetService.getClothingInfoByClothingId(clothing_id);
        result.put("clothing", clothingDto);
        return ResponseEntity.ok().body(result);
    }

}
