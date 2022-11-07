package com.ssafy.kkalong.api.controller;


import com.ssafy.kkalong.api.dto.RemoveBgDto;
import com.ssafy.kkalong.api.entity.Closet;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.ClosetService;
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
    UserService userService;

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
    public ResponseEntity<?> removeBackgroundandGetColorInfo(@AuthenticationPrincipal UserDetailsImpl userInfo, @RequestBody MultipartFile file) throws Exception {
        Map<String, Object> result = new HashMap<>();
        if (file!=null) {
            System.out.println("file"+file);
            MultipartFile bgRemovedImg = closetService.removeBackGround(userInfo.getId(), file);
            List<String> extractedColors = closetService.getColorInfos(bgRemovedImg);
            RemoveBgDto removeBgDto = RemoveBgDto.builder()
                    .file(bgRemovedImg)
                    .color(extractedColors)
                    .build();
            result.put("img", removeBgDto);
            return ResponseEntity.ok().body(result);
        } else{
            return ResponseEntity.badRequest().body("이미지 파일이 없습니다");
        }
    }

}
