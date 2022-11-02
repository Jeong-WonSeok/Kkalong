package com.ssafy.kkalong.security;

import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
@Slf4j
// 인증 과정 중 실제 Database에 회원을 데이터를 조회하는UserDetailsService를 구현
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        System.out.println("loadUserByUsername - kkalong : "+email);
        User user = userRepository.findByEmail(email);
        if(user==null){
            return new UserDetailsImpl(email, "invalid", -1, "invalid", "invalid", null);
        } else {
            return new UserDetailsImpl(
                    user.getEmail(),
                    user.getPassword(),
                    user.getId(),
                    user.getNickname(),
                    user.getProvider(),
                    Collections.singleton(new SimpleGrantedAuthority(user.getRole().getValue()))
            );
        }
    }

}