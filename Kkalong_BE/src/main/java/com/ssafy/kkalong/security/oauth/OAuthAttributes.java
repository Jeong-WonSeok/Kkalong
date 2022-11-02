package com.ssafy.kkalong.security.oauth;

import com.ssafy.kkalong.api.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Map;

import static com.ssafy.kkalong.common.UserRole.ROLE_GUEST;
import static com.ssafy.kkalong.common.UserRole.ROLE_USER;

@Getter
@Builder
@Slf4j
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String email;
    private String provider;

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        System.out.println("OAuthAttributes-Of: [registrationId]: "+registrationId+ " [userNameAttributeName]: "+ userNameAttributeName + " [attributes]: "+ attributes.toString());
        if("kakao".equals(registrationId)) {
            return ofKakao(registrationId, userNameAttributeName, attributes);
        } else {
            return ofGoogle(registrationId, userNameAttributeName, attributes);
        }
    }

    private static OAuthAttributes ofGoogle(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        return OAuthAttributes.builder()
                .email((String) attributes.get("email"))
                .provider(registrationId)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofKakao(String registrationId, String userNameAttributeName, Map<String, Object> attributes){

        Map<String, Object> response = (Map<String, Object>) attributes.get("kakao_account");

        return OAuthAttributes.builder()
                .email((String) response.get("email"))
                .provider(registrationId)
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity(){
        return User.builder().email(email).password(new BCryptPasswordEncoder().encode(email)).role(ROLE_USER).provider(provider).build();
    }

}
