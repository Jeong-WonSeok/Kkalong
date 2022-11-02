package com.ssafy.kkalong.security.oauth;

import com.ssafy.kkalong.api.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Map;

import static com.ssafy.kkalong.common.UserRole.ROLE_GUEST;

@Getter
@Slf4j
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String email;
    private String provider;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String email, String provider){
        System.out.println("OAuthAttributes-OauthAttributes의 builder");
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.email = email;
        this.provider = provider;
    }

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
        final BCryptPasswordEncoder passwordEncoder = passwordEncoder();
        return User.builder().email(email).password(passwordEncoder.encode(email)).role(ROLE_GUEST).provider(provider).build();
    }

    private BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
