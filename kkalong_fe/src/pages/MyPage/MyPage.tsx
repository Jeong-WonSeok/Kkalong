import React from 'react'
import styled from 'styled-components';
import HelloIcon from '../../assets/icon/MyPage/hello.png'
import MyImg from '../../assets/icon/MyPage/My.png'
import ArticleIcon from '../../assets/icon/MyPage/article.png'
import FriendIcon from '../../assets/icon/MyPage/friend.png'
import MemberUpdateIcon from '../../assets/icon/MyPage/memberUpdate.png'
import MoveIcon from '../../assets/icon/MyPage/move.png'
import { useNavigate } from 'react-router-dom';
import FooterBar from '../../components/ui/FooterBar';


export default function MyPage() {
  
  //state로 바꿔서 사용
  const follow = 120;
  const follower = 90;

  const navigate = useNavigate();

  const handleArticle = () => {
    navigate(`Article`)
  }

  const handleFriend = () => {
    navigate(`Friend`)

  }

  const handleUpdate = () => {
    navigate('Update')
  }
  
  return (
    <div>
      <MyPageDiv>
        <MyPageText>마이페이지</MyPageText>
        <MyPageTextDiv>
          <MyPageHelloDiv>
            <MyPageHelloText>안녕하세요!</MyPageHelloText>
            <MyPageHelloIcon src={HelloIcon}></MyPageHelloIcon>
          </MyPageHelloDiv>
          <MyPageText2>정원석님!</MyPageText2>
        </MyPageTextDiv>
        <MyPageProfile>
          <MyPageImg src={MyImg}></MyPageImg>
        </MyPageProfile>
        <MyPageFollowDiv>
          <MyPageFollow>팔로우 {follow}</MyPageFollow>
          <MyPageLine></MyPageLine>
          <MyPageFollow>팔로워 {follower}</MyPageFollow>
        </MyPageFollowDiv>
      </MyPageDiv>
      <MyPageUnderDiv>
        
      <MyPageUnderButton>
        <MyPageIconTextDiv onClick={handleArticle}>
          <MyPageButtonIcon src={ArticleIcon}/>
          <MyPageButtonText>게시물</MyPageButtonText>
        </MyPageIconTextDiv>
        <MyPageButtonMove src={MoveIcon}/>
      </MyPageUnderButton>
      <MyPageUnderButton>
        <MyPageIconTextDiv onClick={handleFriend}>
          <MyPageButtonIcon src={FriendIcon}/>
          <MyPageButtonText>친구</MyPageButtonText>
        </MyPageIconTextDiv>
        <MyPageButtonMove src={MoveIcon}/>
        </MyPageUnderButton>
      <MyPageUnderButton>
          
      <MyPageIconTextDiv onClick={handleUpdate}> 
        <MyPageButtonIcon src={MemberUpdateIcon}/>
        <MyPageButtonText>회원정보 수정</MyPageButtonText>
      </MyPageIconTextDiv>
        <MyPageButtonMove src={MoveIcon}/>
        </MyPageUnderButton>
      </MyPageUnderDiv>
      <FooterBar/>
    </div>

  )
}


const MyPageDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  background-color: #947F6C;
  height :50%;
  font-family: var(--base-font-600)

`


const MyPageText = styled.text`

  font-family: var(--base-font-600);
  position : absolute;
  left : 10px;
  top : 10px;
  `

const MyPageTextDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  margin-top : 55px;

`

const MyPageHelloDiv = styled.div`
  
`
//마이페이지 아이콘
const MyPageHelloIcon = styled.img`
  
`

//인사말 
const MyPageHelloText = styled.text`
  font-family: var(--base-font-500);
  color:#F9E9CB;
  
`

//
const MyPageText2 = styled.text`
  font-family: var(--base-font-500);
  color:#000000;
  
`

//프로필 이미지 div
const MyPageProfile = styled.div`
  margin-top : 10px;
`


//프로필 이미지
const MyPageImg = styled.img`
  border: 2px solid #000000;
  border-radius: 50%;
  width : 100px;
  height : 100px;
`

//팔로우, 팔로워 div
const MyPageFollowDiv = styled.div`
  display : flex;
  flex-direction: row;

  `

  const MyPageLine = styled.hr`
    width : 2px;
    background-color: #FFFFFF;
  `


// 팔로우, 팔로워
const MyPageFollow = styled.text`
  margin : 10px;
  color : #FFFFFF;
  font-family: var(--base-font-600);
`

//마이페이지 하단 부분 div
const MyPageUnderDiv = styled.div`
  padding: 10px;
`

//각 게시물, 친구, 회원정보 수정 등으로 이동
const MyPageUnderButton = styled.div`
 display : flex ;
 flex-direction: row;
 justify-content: space-between;  
 margin : 20px;

`
//아이콘,글 div
const MyPageIconTextDiv = styled.div`
  display : flex;
  flex-direction: row;
  width:150px;

`

//버튼 아이콘
const MyPageButtonIcon = styled.img`
`

//버튼 text
const MyPageButtonText = styled.text`
  margin-left : 20px;
  font-family: var(--base-font-500);
  
  
`

//버튼 move
const MyPageButtonMove = styled.img`
margin: auto 0;
width: 10px;
height: 15px;

  
`