import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import BackArrowIcon from "../../assets/icon/Nav/BackArrow.png";


import Profile from "../../components/Community/Profile";
import Search from "../../components/ui/Search";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";
import Friend from "../../components/User/Friend";
import { UserType } from "./MyPage";

import axios from '../../api/axios'
import requests from '../../api/requests'

export interface FriendType {
  follower : [{
    user : { 
       user_id : number
       nickname  : string
       img : string
     }
     lover : boolean
   }]
}

export default function MyPageArticle() {
  const navigate = useNavigate();
  const [User, setUser] = useState<UserType>()
  const [Friends, setFrineds] = useState<FriendType>()
  
  useEffect(()=>{
    setUser(JSON.parse(localStorage?.getItem('userProfile')as string))
    const start = async () => {
      const res = await axios.get(requests.myFriend)
      setFrineds(res.data)
    }
    start()
    
  },[])

  const SearchFriend = async(Text: string) => {
    const SearchFriend = Friends?.follower.filter(info => {
      return info.user.nickname.includes(Text)
    })
  }

  return (
    <div>
      <TopNav type={""}>
        <TopDivBackArrow src={BackArrowIcon} onClick={()=>navigate(-1)} />
        <TopDivText>{User?.nickname}님의 친구</TopDivText>
        <div style={{width:"30px", height:"30px"}}></div>
      </TopNav>

    <MyPageArticleFriendContainer>
      <Search Search={SearchFriend}>유저검색</Search>

      {Friends?.follower.length && <Friend Friend={Friends!}/>}
      

      <FooterBar/>
    </MyPageArticleFriendContainer>
    </div>
  );
}

const MyPageArticleFriendContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
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

