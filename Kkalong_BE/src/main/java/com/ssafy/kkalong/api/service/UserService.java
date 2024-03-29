package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.dto.HelpInfoDto;
import com.ssafy.kkalong.api.dto.PostInfoDto;
import com.ssafy.kkalong.api.dto.SignupDto;
import com.ssafy.kkalong.api.entity.*;
import com.ssafy.kkalong.api.repository.*;
import com.ssafy.kkalong.common.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    @Value("${spring.mail.username}")
    private String mailSender;

    private final UserRepository userRepository;
    private final ClosetRepository closetRepository;
    private final AuthCodeRepository authCodeRepository;
    private final FollowRepository followRepository;
    private final LoveRepository loveRepository;
    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final HelpRepository helpRepository;
    private final JavaMailSender javaMailSender;


    public boolean isEmailDuplicated(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean isNicknameDuplicated(String nickname) { return userRepository.existsByNickname(nickname); }

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
                .profile_img("https://firebasestorage.googleapis.com/v0/b/kkalong-b4cec.appspot.com/o/profile_img.jpg?alt=media")
                .loving(false)
                .lover_id(-1)
                .build();
        userRepository.save(user);
        Closet closet = Closet.builder().name("전체").base(true).user(user).build();
        closetRepository.save(closet);
        return user;
    }

    public User signUpNext(String email, SignupDto signupDto) {
        User user = userRepository.findByEmail(email);
        user.setUserInfo(signupDto);
        userRepository.save(user);
        Closet closet = Closet.builder().name("전체").base(true).user(user).build();
        closetRepository.save(closet);
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
        User user = userRepository.findById(senderId);
        List<Follow> list = followRepository.findAllBySender(user);
        List<Integer> followingList = new ArrayList<>();
        for (Follow follow : list) {
            followingList.add(follow.getReceiver().getId());
        }
        return followingList;
    }
    public List<Integer> getFollowerListByReceiverId(int receiverId){
        User user = userRepository.findById(receiverId);
        List<Follow> list = followRepository.findAllByReceiver(user);
        List<Integer> followerList = new ArrayList<>();
        for(Follow follow : list){
            followerList.add(follow.getSender().getId());
        }
        return followerList;
    }

    public List<Integer> getLovingListBySenderId(int sender_id) {
        User user = userRepository.findById(sender_id);
        List<Love> list = loveRepository.findAllBySender(user);
        List<Integer> lovingList = new ArrayList<>();
        for(Love love : list){
            lovingList.add(love.getReceiver().getId());
        }
        return lovingList;
    }

    public List<Integer> getLoverListByReceiverId(int receiver_id) {
        User user = userRepository.findById(receiver_id);
        List<Love> list = loveRepository.findAllByReceiver(user);
        List<Integer> loverList = new ArrayList<>();
        for(Love love : list){
            loverList.add(love.getSender().getId());
        }
        return loverList;
    }



    public List<Integer> sendFollowRequest(int sender_id, int receiver_id) {
        User sender = userRepository.findById(sender_id);
        User receiver = userRepository.findById(receiver_id);
        if(sender != null && receiver != null){
            Follow follow = followRepository.findBySenderAndReceiver(sender, receiver);
            if(follow!=null){
                followRepository.deleteById(follow.getId());
            } else{
                Follow newFollow = Follow.builder().sender(sender).receiver(receiver).build();
                followRepository.save(newFollow);
            }

        }
        return getFollowingListBySenderId(sender_id);
    }

    public User getUserByUserId(int user_id) {
        return userRepository.findById(user_id);
    }

    public List<PostInfoDto> getBestsByUserId(int user_id) {
        User user = userRepository.findById(user_id);
        List<Post> list = postRepository.findAllByUserId(user_id);
        List<PostInfoDto> postInfos = new ArrayList<>();
        for (Post post : list) {
            PostInfoDto postInfoDto = PostInfoDto.builder()
                    .post_id(post.getId())
                    .post_img(post.getImg())
                    .like(postLikeRepository.countByPostId(post.getId()))
                    .user_id(user.getId())
                    .nickname(user.getNickname())
                    .profile_img(user.getProfile_img())
                    .build();
            postInfos.add(postInfoDto);
        }
        return postInfos;
    }

    public List<HelpInfoDto> getHelpsByUserId(int user_id) {
        User user = userRepository.findById(user_id);
        List<Help> list = helpRepository.findAllByUserId(user_id);
        List<HelpInfoDto> helpInfos = new ArrayList<>();
        for (Help help : list) {
            HelpInfoDto helpInfoDto = HelpInfoDto.builder()
                    .help_id(help.getId())
                    .open(help.getOpen())
                    .help_img(help.getImg())
                    .range(help.getOpenrange())
                    .title(help.getTitle())
                    .user_id(user.getId())
                    .nickname(user.getNickname())
                    .profile_img(user.getProfile_img())
                    .build();
            helpInfos.add(helpInfoDto);
        }
        return helpInfos;
    }

    public void sendLoveRequest(int sender_id, int receiver_id) {
        User sender = userRepository.findById(sender_id);
        User receiver = userRepository.findById(receiver_id);
        if(sender != null && receiver != null){
            Love receivedLove = loveRepository.findBySenderAndReceiver(receiver, sender); //상대방이 보낸 요청이 있는지 확인
            Love requestedLove = loveRepository.findBySenderAndReceiver(sender, receiver); //내가 보낸 요청이 있는지 화인
            if(receivedLove!=null){//상대방의 요청이 있음
                if(requestedLove !=null){ //애인 중이다가 내가 취소
                    sender.resetLoveInfo();
                    receiver.resetLoveInfo();
                    userRepository.save(sender);
                    userRepository.save(receiver);
                    loveRepository.deleteById(requestedLove.getId());
                } else { //애인으로 탄생
                    sender.setLoveInfo(receiver_id);
                    receiver.setLoveInfo(sender_id);
                    userRepository.save(sender);
                    userRepository.save(receiver);
                    Love newLove = Love.builder().sender(sender).receiver(receiver).build();
                    loveRepository.save(newLove);
                    //나와 애인에게 왔던 다른 요청들 삭제
                    List<Love> loveRequestForMe = loveRepository.findAllByReceiver(sender);
                    for(Love love : loveRequestForMe){
                        if(love.getSender().getId() == receiver_id) continue;
                        loveRepository.deleteById(love.getId());
                    }
                    List<Love> loveRequestForPartner = loveRepository.findAllByReceiver(receiver);
                    for(Love love : loveRequestForPartner){
                        if(love.getSender().getId() == sender_id) continue;
                        loveRepository.deleteById(love.getId());
                    }
                }
            } else{ //상대방 요청 없음
                if(requestedLove !=null){ //보냈던 내 요청만 취소
                    loveRepository.deleteById(requestedLove.getId());
                } else { //처음으로 내가 보내기
                    Love newLove = Love.builder().sender(sender).receiver(receiver).build();
                    loveRepository.save(newLove);
                }
            }
        }
    }

    public List<User> getUserIncludingNickname(String nickname) {
        return userRepository.findByNicknameContainingIgnoreCase(nickname);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

}
