package com.ssafy.kkalong.api.controller;

import com.ssafy.kkalong.api.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommunityController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final CommunityService communityService;

//    @GetMapping(value="best")

    @GetMapping(value="bestdress")
    public ResponseEntity<?> bestDress(){

        communityService.Post

        return ResponseEntity.ok().body('a');
    }

//    @PostMapping(value="bestdress")

}
