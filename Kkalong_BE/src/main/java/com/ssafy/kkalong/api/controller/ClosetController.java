package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.dto.BestDressResponseInterface;
import com.ssafy.kkalong.api.entity.Closet;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.security.UserDetailsImpl;
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

    @GetMapping("/all")
    public ResponseEntity<?> getAllClosetByUserId(@AuthenticationPrincipal UserDetailsImpl userInfo){
        List<Map<String, Object>> result = new ArrayList<>();
        List<Closet> closets = userService.

        for (BestDressResponseInterface bd : post) {
            System.out.println(bd.getId());
            Map<String, Object> temp = new HashMap<>();
            Map<String, Object> temp_u = new HashMap<>();
            User user = communityService.selectUser(bd.getId());

            String nick = user.getNickname();
            String profile_img = user.getImg();

            temp.put("Best", bd);
            temp_u.put("NickName", nick);
            temp_u.put("profile_img", profile_img);
            temp.put("User", temp_u);
            result.add(temp);
        }

        return ResponseEntity.ok().body(result);
    }
}
