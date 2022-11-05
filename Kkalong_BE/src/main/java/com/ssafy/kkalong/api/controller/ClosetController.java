package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.BestDressResponseInterface;
import com.ssafy.kkalong.api.dto.ClosetInfoDto;
import com.ssafy.kkalong.api.entity.Closet;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.service.ClosetService;
import com.ssafy.kkalong.api.service.CommunityService;
import com.ssafy.kkalong.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/closet")
public class ClosetController {

    @Autowired
    ClosetService closetService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllClosetByUserId(@AuthenticationPrincipal UserDetailsImpl userInfo){
        List<Map<String, Object>> result = new ArrayList<>();
//        List<Closet> closets = closetService.getClosetsByUserId(userInfo.getId());
//        for (Closet closet : closets) {

//        }

        return ResponseEntity.ok().body(result);
    }
}
