import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios'
import requests from '../../api/requests'

import HelloIcon from '../../assets/icon/MyPage/hello.png'
import MyImg from '../../assets/icon/MyPage/My.png'
import ArticleIcon from '../../assets/icon/MyPage/article.png'
import FriendIcon from '../../assets/icon/MyPage/friend.png'
import MemberUpdateIcon from '../../assets/icon/MyPage/memberUpdate.png'
import MoveIcon from '../../assets/icon/MyPage/move.png'

import FooterBar from '../../components/ui/FooterBar';


export interface UserType {
  user_id : number
  email : string
  nickname : string
  gender : string
  age : number
  height : number
  weight : number
  followers : Array<number>
  followings : Array<number>
}

export default function MyPage() {
  const params = useParams()
  const navigate = useNavigate();
  const [User, setUser] = useState<UserType>()  

  useEffect(()=>{
    const app = document.getElementById('App') as HTMLDivElement
    app.style.marginTop = '0'
    const start = async() => {
      if (params.userId) {
        const Input = {value: params.userId}
        const res = await axios.get(requests.otherProfile, {
          params: {
            value: Number(params.userId)
          }
        })
        setUser(res.data.user)
      } else {
        setUser(JSON.parse(localStorage?.getItem('userProfile')as string))
      }
    }
    start()
    return () => {
      app.style.marginTop = '60px'
    }
  },[])

  return (
    <div>
      <MyPageDiv>
        <MyPageText>마이페이지</MyPageText>
        <MyPageTextDiv>
          <div>
            <MyPageHelloText>안녕하세요!</MyPageHelloText>
            <MyPageHelloIcon src={HelloIcon}></MyPageHelloIcon>
          </div>
          <NickNameP>{User?.nickname} 님!</NickNameP>
        </MyPageTextDiv>
        <MyPageImg src={MyImg}></MyPageImg>
        <MyPageFollowDiv>
          <MyPageFollow>팔로우 {User?.followings.length ? User?.followings.length : 0}</MyPageFollow>
          <MyPageLine></MyPageLine>
          <MyPageFollow>팔로워 {User?.followers.length ? User?.followers.length : 0}</MyPageFollow>
        </MyPageFollowDiv>
      </MyPageDiv>

      <MyPageUnderDiv>
        
      <MyPageUnderButton onClick={()=> navigate('Article')}>
        <MyPageIconTextDiv>
          <MyPageButtonIcon src={ArticleIcon}/>
          <MyPageButtonText>게시물</MyPageButtonText>
        </MyPageIconTextDiv>
        <MyPageButtonMove src={MoveIcon}/>
      </MyPageUnderButton>
      {!params.userId && 
      <div>
        <MyPageUnderButton onClick={()=>navigate(`Friend`)}>
          <MyPageIconTextDiv>
            <MyPageButtonIcon src={FriendIcon}/>
            <MyPageButtonText>친구</MyPageButtonText>
          </MyPageIconTextDiv>
          <MyPageButtonMove src={MoveIcon}/>
        </MyPageUnderButton>

        <MyPageUnderButton onClick={()=>navigate('Update')}>
          <MyPageIconTextDiv> 
            <MyPageButtonIcon src={MemberUpdateIcon}/>
            <MyPageButtonText>회원정보 수정</MyPageButtonText>
          </MyPageIconTextDiv>
          <MyPageButtonMove src={MoveIcon}/>
        </MyPageUnderButton>
      </div>
      }

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
  height:50%;
  min-height: 300px;
`


const MyPageText = styled.text`
  font-size: 16px;
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

//마이페이지 아이콘
const MyPageHelloIcon = styled.img`
  margin-left: 3px;
`

//인사말 
const MyPageHelloText = styled.text`
  font-family: var(--base-font-400);
  font-size: 1.1rem;
  color: black;
  
`

const NickNameP = styled.text`
  font-family: var(--base-font-400);
  color: var(--primary-color-200);
  font-size: 1.1rem;
`

//프로필 이미지
const MyPageImg = styled.img`
  margin: 10px;
  border: 2px solid #000000;
  border-radius: 50%;
  width : 110px;
  height : 110px;
`

//팔로우, 팔로워 div
const MyPageFollowDiv = styled.div`
  display : flex;
  flex-direction: row;
`

const MyPageLine = styled.div`
  margin: 10px 0;
  width : 2px;
  height: 21px;
  background-color: #FFFFFF;
`


// 팔로우, 팔로워
const MyPageFollow = styled.text`
  margin : 10px;
  font-size: 16px;
  color : var(--primary-color-100);
  font-family: var(--base-font-400);
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
 margin : 10px;
 padding: 15px 10px;
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