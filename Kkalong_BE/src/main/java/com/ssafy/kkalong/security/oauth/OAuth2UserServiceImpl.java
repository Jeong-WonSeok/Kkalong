package com.ssafy.kkalong.security.oauth;

import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.repository.UserRepository;
import com.ssafy.kkalong.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
@Slf4j
public class OAuth2UserServiceImpl implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    @Override
        public UserDetailsImpl loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
            System.out.println("CustomOAuth2UserService-loadUser: "+userRequest.toString());
            OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
            OAuth2User oAuth2User = delegate.loadUser(userRequest);

            String registrationId = userRequest.getClientRegistration().getRegistrationId();
            String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

            OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

            System.out.println("loadUserByUsername - oauth2: "+attributes.getEmail());

        User user = userRepository.findByEmail(attributes.getEmail());
        if(user==null){ //회원가입 한 적 없음
            System.out.println("회원가입한적 없는 사용자입니다");
            user = userRepository.save(attributes.toEntity());
            return new UserDetailsImpl(
                    user.getEmail(),
                    user.getPassword(),
                    user.getId(),
                    user.getNickname(),
                    user.getProvider(),
                    Collections.singleton(new SimpleGrantedAuthority(user.getRole().getValue()))
            );
        } else {
            if(!user.getProvider().equals(attributes.getProvider())){ //다른 계정으로 회원가입 한적 있음
                System.out.println(attributes.getProvider()+" 회원가입한적 있는 사용자입니다");
                return new UserDetailsImpl("invalid", "invalid", -1, "invalid", user.getProvider(), null);
            } else{ //로그인 처리
                System.out.println("로그인으로 안내합니다");
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

}
