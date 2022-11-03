package com.ssafy.kkalong.jwt;

import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.repository.UserRepository;
import com.ssafy.kkalong.security.UserDetailsImpl;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.xml.bind.DatatypeConverter;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
@Slf4j
public final class JwtProvider {

    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;

    // secret key
    @Value("${jwt.secret-key}")
    private String secretKey;

    // access token 유효시간
    private final long accessTokenValidTime = 24 * 60 * 60 * 1000L;

    // refresh token 유효시간
    private final long refreshTokenValidTime = 2 * 7 * 24 * 60 * 60 * 1000L;

    @PostConstruct
    private void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    //토큰에서 Claim 추출
    private Claims getClaimsFormToken(String token) {
        return Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey)).parseClaimsJws(token).getBody();
    }

    //토큰에서 인증 subject 추출
    private String getSubject(String token) {
        return getClaimsFormToken(token).getSubject();
    }

    //토큰에서 인증 정보 추출
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getSubject(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    //토큰에서 인증 정보 추출
    public String generateJwtToken(Authentication authentication) {

        Claims claims;
        if(authentication instanceof OAuth2AuthenticationToken) {//oauth2 로그인
            System.out.println("generateJwtToken: userDetailsImpl입니다: authentication"+authentication.toString());
            claims = Jwts.claims().setSubject(String.valueOf(((UserDetailsImpl) authentication.getPrincipal()).getUsername()));
        } else{ //kkalong 로그인
            System.out.println("generateJwtToken: userDetailsImpl 아닙니다: authentication"+authentication.toString());
            claims = Jwts.claims().setSubject(String.valueOf(authentication.getPrincipal()));
        }

        User user = userRepository.findByEmail(claims.getSubject());
        claims.put("id", user.getId());
        claims.put("nickname", user.getNickname());
        claims.put("provider", user.getProvider());
        claims.put("roles", authentication.getAuthorities());
        claims.put("profileImgUrl", user.getImg());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    //유저 정보로 토큰 생성
    public String generateJwtTokenFromUser(User user) {

        System.out.println(user.getAge()+user.getId()+ user.getProvider());

        Claims claims = Jwts.claims().setSubject(user.getEmail());

        claims.put("id", user.getId());
        claims.put("nickname", user.getNickname());
        claims.put("provider", user.getProvider());
        claims.put("roles", user.getRole());
        claims.put("img", user.getImg());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    //토큰 검증
    public boolean isValidToken(String token) {
        try {
            Claims claims = getClaimsFormToken(token);
            return !claims.getExpiration().before(new Date());
        } catch (JwtException | NullPointerException exception) {
            log.error("Token is invalid");
            return false;
        }
    }

    public User getUser(String token) {
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        String user_id = String.valueOf(claims.getBody().get("user_id"));
        return userRepository.findById(Integer.parseInt(user_id)).orElse(null);
    }


}