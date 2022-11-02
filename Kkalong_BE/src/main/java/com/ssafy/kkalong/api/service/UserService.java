package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.dto.SignupDto;
import com.ssafy.kkalong.api.entity.AuthCode;
import com.ssafy.kkalong.api.entity.Follow;
import com.ssafy.kkalong.api.entity.User;
import com.ssafy.kkalong.api.repository.AuthCodeRepository;
import com.ssafy.kkalong.api.repository.FollowRepository;
import com.ssafy.kkalong.api.repository.UserRepository;
import com.ssafy.kkalong.common.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    @Value("${spring.mail.username}")
    private String mailSender;

    private final UserRepository userRepository;
    private final AuthCodeRepository authCodeRepository;
    private final FollowRepository followRepository;
    private final JavaMailSender javaMailSender;


    public boolean isEmailDuplicated(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean isAuthEmailDuplicated(String email){
        return authCodeRepository.existsByEmail(email);
    }

    public String sendEmail(String email) {

        String code = createCode();
        AuthCode authCode;

        if(isAuthEmailDuplicated(email)){
            authCode = authCodeRepository.findByEmail(email);
            authCode.setAuthCode(email,code);
        } else{
            authCode = AuthCode.builder().email(email).code(code).build();
        }
        authCodeRepository.save(authCode);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("깔롱 서비스 회원가입 이메일 인증 번호");
        message.setText("깔롱 서비스 회원가입 이메일 인증 번호 안내\n 회원님의 이메일 인증 코드는 [ " + code + " ]입니다.\n 위 코드를 입력하여 이메일을 인증하시기 바랍니다.");
        message.setFrom(mailSender);
        message.setReplyTo(email);
        javaMailSender.send(message);

        return code;
    }

    public String getProvider(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return user.getProvider();
        } else {
            return "이메일을 찾을 수 없습니다";
        }
    }

    public User signUp(SignupDto signupDto) {
        User user = User.builder()
                .email(signupDto.getEmail())
                .password(new BCryptPasswordEncoder().encode(signupDto.getPassword()))
                .nickname(signupDto.getNickname())
                .gender(signupDto.getGender())
                .age(signupDto.getAge())
                .height(signupDto.getHeight())
                .weight(signupDto.getWeight())
                .provider(signupDto.getProvider())
                .role(UserRole.ROLE_USER)
                .build();
        userRepository.save(user);
        return user;
    }

    public String createCode() {
        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
        String str = "";
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    public List<Integer> getFollowingListBySenderId(int senderId){
        User user = userRepository.findById(senderId).orElse(null);
        List<Follow> list = followRepository.findAllBySender(user);
        List<Integer> followingList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            followingList.add(list.get(i).getReceiver().getId());
        }
        return followingList;
    }
    public List<Integer> getFollowerListByReceiverId(int receiverId){
        User user = userRepository.findById(receiverId).orElse(null);
        List<Follow> list = followRepository.findAllByReceiver(user);
        List<Integer> followerList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            followerList.add(list.get(i).getSender().getId());
        }
        return followerList;
    }
}
