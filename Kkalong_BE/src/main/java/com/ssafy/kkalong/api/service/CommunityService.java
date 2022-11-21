package com.ssafy.kkalong.api.service;

import com.ssafy.kkalong.api.dto.*;
import com.ssafy.kkalong.api.entity.*;
import com.ssafy.kkalong.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CommunityService {

    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final HelpRepository helpRepository;
    private final ReplyRepository replyRepository;
    private final CodyRepository codyRepository;
    private final ClosetRepository closetRepository;
    

    //좋아요 많은 순 3개 출력
    public List<BestDressResponseInterface> selectBestDress(){
        return postRepository.findByBestDress();
    }

    public List<BestDressResponseInterface> selectAllPost(){
        return postRepository.findByAllBestDress();
    }

    public BestDressResponseInterface selectPost(int post_id){
        return postRepository.findByDressPost(post_id);
    }
    public Post getPost(int post_id){
        return postRepository.findById(post_id);
    }

    public boolean existsLike(User user, Post post) {
        return postLikeRepository.existsByPostAndUser(post, user);
    }


    // 도전 베스트드레서 등록
    public Post insertBestDress(String post_img, String content, User userInfo){
        Post post = Post.builder()
                //이미지 경로로 바꿔줄 예정
                .img(post_img)
                .content(content)
                .user(userInfo)
                .build();
        postRepository.save(post);
        return post;
    }


    public void deletePost(int post_id){
        postRepository.deleteById(post_id);
    }

    public void updatePost(BestDressRequestDto bestReq, int post_id) {
        postRepository.updatePost(bestReq.getContent(), bestReq.getPost_img().getOriginalFilename(), post_id); //이미지 경로로 바꿔줄 예정
    }

    public User selectUser(int post_id){
        User user = postRepository.findById(post_id).getUser();
        return user;
    }

    public User getUser(String user_email){
        User user = userRepository.findByEmail(user_email);
        return user;
    }

    public User selectUserHelp(int help_id){
        User user = helpRepository.findById(help_id).getUser();
        return user;
    }

//    ========================================================================
//    COMMENT
//    ========================================================================
    public List<Comment> selectComment(int post_id) {

        List<Comment> comment = commentRepository.findByPost(post_id);

        return comment;
    }

    public Comment getComment(int comment_id){
        return commentRepository.findById(comment_id);
    }

    public Comment insertComment(CommentRequestDto commentInfo, User userInfo, Post post) {
        Comment comment = Comment.builder()
                .content(commentInfo.getContent())
                .user(userInfo)
                .post(post)
                .build();
        commentRepository.save(comment);
        return comment;
    }

    public void deleteComment(int comment_id){
        commentRepository.deleteById(comment_id);
    }


    public void updateComment(int content_id, CommentRequestDto commentInfo) {
        System.out.println(commentInfo.getContent());
        commentRepository.updateComment(content_id, commentInfo.getContent());
    }



    //=============================================================================
    //도와주세요 패알못
    //=============================================================================

    public List<HelpResponseDto> selectAllHelp() {
        List<Help> help = helpRepository.findAll();
        List<HelpResponseDto> helpAll = new ArrayList<>();
        for (Help h : help) {
            HelpResponseDto helpTemp = new HelpResponseDto(h.getId(), h.getOpen(), h.getImg(), h.getOpenrange(), h.getTitle(), h.getContent(), new BestDressUserDto());
        helpAll.add(helpTemp);
        }

        return helpAll;
    }

    public HelpResponseDto selectHelp(int help_id) {
        Help help = helpRepository.findById(help_id);

        HelpResponseDto helpDto = new HelpResponseDto();
        helpDto.setHelp_id(help.getId());
        helpDto.setRange(help.getOpenrange());
        helpDto.setOpen(help.getOpen());
        helpDto.setHelp_img(help.getImg());
        helpDto.setTitle(help.getTitle());
        helpDto.setContent(help.getContent());
        helpDto.setUser(new BestDressUserDto());

        return helpDto;
    }

    public int insertHelp(HelpRequestDto helpDto, User user) {
        Help help = Help.builder()
                .content(helpDto.getContent())
                .openrange(helpDto.getRange())
                .title(helpDto.getTitle())
                .open(helpDto.getOpen())
                .user(user)
                .img(helpDto.getImg())
                .build();
        helpRepository.save(help);
        return help.getId();
    }

    public void deleteHelp(int help_id) {
        helpRepository.deleteById(help_id);
    }

    public List<Reply> selectReply(int help_id) {

        List<Reply> reply = replyRepository.findByHelp(help_id);

        return reply;
    }

    public Reply getReply(int reply_id){
        return replyRepository.findById(reply_id);
    }

    public Help getHelp(int help_id){
        return helpRepository.findById(help_id);
    }

    public Reply insertReply(ReplyRequestDto replyInfo, User userInfo, Help help) {
        Reply reply;
        if(replyInfo.getCodi_id() == null) {
            reply = Reply.builder()
                .content(replyInfo.getContent())
                .user(userInfo)
                .help(help)
                .build();
        }else {
            int cody_id = replyInfo.getCodi_id();
            reply = Reply.builder()
                .content(replyInfo.getContent())
                .user(userInfo)
                .help(help)
                .cody(codyRepository.findById(cody_id))
                .build();
        }
        replyRepository.save(reply);
        return reply;
    }

    public void updateHelp(int help_id, HelpRequestDto helpInfo) {
        helpRepository.updateHelp(help_id, helpInfo.getContent(), helpInfo.getTitle(), helpInfo.getOpen(), helpInfo.getRange(), helpInfo.getImg());
    }

    public void deleteReply(int reply_id) { replyRepository.deleteById(reply_id); }

    public void updateReply(int reply_id, ReplyRequestDto replyInfo) {
        replyRepository.updateReply(reply_id, replyInfo.getContent(), replyInfo.getCodi_id() );
    }

    public ReplyCodyDto getCody(int cody_id){

        Cody cody = codyRepository.findById(cody_id);
        ReplyCodyDto codyDto = new ReplyCodyDto();
        codyDto.setCody_img(cody.getImg());
        codyDto.setCody_id(cody_id);

        return codyDto;
    }

    public void updateCodiDown(int cody_id) {
        codyRepository.updateCodi(cody_id);
    }

    public void updateLike(User user, int post_id) {
        PostLike postLike = PostLike.builder()
                .user(user)
                .post(getPost(post_id))
                .build();
        postLikeRepository.save(postLike);
    }

    public void duplicateLike(User user, Post post){
        postLikeRepository.deleteByPostAndUser(post, user);
    }


    public List<Integer> selectLike(int post_id) {
        Post post = postRepository.findById(post_id);
        System.out.println(post.getId() + " " + post.getContent());
        List<PostLike> postLikes = postLikeRepository.findByPost(post);
        List<Integer> likeList = new ArrayList<>();
        for(PostLike po : postLikes){
            likeList.add(po.getUser().getId());
        }

        return likeList;
    }

    public String selectPostCreateAt(int post_id){
        return "" + postRepository.findById(post_id).getCreatedAt();
    }
    public String selectCommentCreateAt(int comment_id){
        return "" + commentRepository.findById(comment_id).getCreatedAt();
    }
    public String selectHelpCreateAt(int help_id){
        System.out.println("h" + help_id);
        return "" + helpRepository.findById(help_id).getCreatedAt();
    }
    public String selectReplyCreateAt(int reply_id){
        return "" + replyRepository.findById(reply_id).getCreatedAt();
    }

    public int findNextPostId() {
        int count = postRepository.countBy();
        if(count==0){
            return 1;
        } else{
            return postRepository.findMaxPostId()+1;
        }
    }

}
