import React from "react";
import styled from "styled-components";
import BackArrowIcon from "../../assets/icon/Nav/BackArrow.png";
import ProfileIcon from "../../assets/icon/MyPage/My.png"
import Profile from "../../components/Community/Profile";
import Search from "../../components/ui/Search";

export default function MyPageArticle() {


  const name = "정원석";
  const name2 = "정승우";

  return (<MyPageArticleFriendContainer>
        <ArticleFriendTopDiv>
          <TopDivBackArrow src={BackArrowIcon}/>
          <TopDivText>{name}님의 친구</TopDivText>
        </ArticleFriendTopDiv>
        <MyPageFriendTopLine />
        <text>유저검색</text>
        {/* <MyPageFriendSearch>
          <FriendSearchInput placeholder="유저 이름을 입력하세요"></FriendSearchInput>  
          <FriendSearchButton>검색</FriendSearchButton>
        </MyPageFriendSearch> */}
        <Search ></Search>
        <FriendProfileDiv>
          <FriendProfileImg src={ProfileIcon}></FriendProfileImg>
      <FriendProfileName>{name2}</FriendProfileName>
        </FriendProfileDiv>
  </MyPageArticleFriendContainer>);
}

const MyPageArticleFriendContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

//상단 div
const ArticleFriendTopDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

`;

// 뒤로가기버튼
const TopDivBackArrow = styled.img`
  width : 30px;
  height : 30px;
  position : absolute;
  left : 30px;
  

`
// ..의 친구
const TopDivText = styled.text`
  font-family: var(--base-font-600);
`

//상단 라인
const MyPageFriendTopLine = styled.hr`
  width : 100%;
  height : 1px;
  background-color: #000000;
  margin : 10px auto;
  border : none;
`

//검색 div
const MyPageFriendSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`
//검색 input
const FriendSearchInput = styled.input`
  border : none;
  background-color: #FFF8F4 ;
  width : 70%;
  border-radius: 5px;
`

//검색 버튼
const FriendSearchButton = styled.button`
  border : none;
  background-color: #CBA171;
  border-radius: 5px;

  
`

//프로필 div
const FriendProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin : 10px;
  
`
//프로필 이미지
const FriendProfileImg = styled.img`
  border : 1px solid #000000;
  border-radius: 50%;
  width : 50px;
  height : 50px;
`

//프로필 이름
const FriendProfileName = styled.text`
  margin-left : 30px;
  font-family: var(--base-font-400);

`