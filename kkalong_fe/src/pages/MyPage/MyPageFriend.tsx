import React from "react";
import styled from "styled-components";
import BackArrowIcon from "../../assets/icon/Nav/BackArrow.png";
import ProfileIcon from "../../assets/icon/MyPage/My.png";
import Profile from "../../components/Community/Profile";
import Search from "../../components/ui/Search";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";
import { useNavigate } from "react-router-dom";

export default function MyPageArticle() {
  const name = "정원석";
  const name2 = "정승우";

  const navigate = useNavigate();

  return (
    <MyPageArticleFriendContainer>
      <TopNav type={""}>
        <TopDivBackArrow src={BackArrowIcon} onClick={()=>navigate(-1)} />
        <TopDivText>{name}님의 친구</TopDivText>
        <div style={{width:"30px", height:"30px"}}></div>
      </TopNav>
      <MyPageFriendTopLine />
      <text>유저검색</text>
      <Search/>
      <FriendProfileDiv>
        <FriendProfileImg src={ProfileIcon}></FriendProfileImg>
        <FriendProfileName>{name2}</FriendProfileName>
      </FriendProfileDiv>
      <FooterBar/>
    </MyPageArticleFriendContainer>
  );
}

const MyPageArticleFriendContainer = styled.div`
  display: flex;
  flex-direction: column;
`;



// 뒤로가기버튼
const TopDivBackArrow = styled.img`
  width: 30px;
  height: 30px;

`;
// ..의 친구
const TopDivText = styled.text`
  font-family: var(--base-font-600);
`;

//상단 라인
const MyPageFriendTopLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #000000;
  margin: 10px auto;
  border: none;
`;



//프로필 div
const FriendProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;
//프로필 이미지
const FriendProfileImg = styled.img`
  border: 1px solid #000000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

//프로필 이름
const FriendProfileName = styled.text`
  margin-left: 30px;
  font-family: var(--base-font-400);
`;
