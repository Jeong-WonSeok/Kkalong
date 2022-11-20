import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import BackArrowIcon from "../../assets/icon/Nav/BackArrow.png";
import SearchIcon from '../../assets/icon/Nav/search.png'


import Profile from "../../components/Community/Profile";
import Search from "../../components/ui/Search";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";
import Friend from "../../components/User/Friend";
import { UserType } from "./MyPage";

import axios from '../../api/axios'
import requests from '../../api/requests'
import { useAppSelector } from "../../hooks/reduxHook";

export interface FriendType {
  user_id : number
  nickname  : string
  profile_img : string
  loving : boolean
  lover_id : number
}

// TODO : 애인신청 로직 설정

export default function MyPageArticle() {
  const navigate = useNavigate();
  const { User } = useAppSelector(state => state.User)
  const [Friends, setFrineds] = useState(Array<FriendType>)
  // 검색 시 친구를 최상단에 올려주기 위해 설정
  const [FriendsId, setFriendsId] = useState(Array<Number>)
  const [IsSearch, setIsSearch] = useState(false)
  const [IsModal, setIsModal] = useState(false)
  const [SearchFriendList, setSearchFriendList] = useState(Array<FriendType>)
  const [RequestLover, setRequestLover] = useState(Array<Number>)
  
  useEffect(()=>{
    const start = async () => {
      const res = await axios.get(requests.myFriend)
      setFrineds(res.data.friends)
      setRequestLover(res.data.lovers)
      setFriendsId(res.data.friends.map((friend: any) => {
        return friend.user_id
      }))
    }
    start()
    
  },[])

  const SearchFriend = async(Text: string) => {
    const res = await axios.get(requests.searchFriend + Text)
    setSearchFriendList(res.data.users)
    setIsSearch(true)
  }

  return (
    <div>
      <TopNav type={""}>
        <TopDivBackArrow src={BackArrowIcon} onClick={()=>navigate(-1)} />
        <TopDivText>{User?.nickname}님의 친구</TopDivText>
        <SearchImg src={SearchIcon} onClick={()=>setIsModal(!IsModal)}/>
      </TopNav>

    <MyPageArticleFriendContainer>
      <Search  Search={SearchFriend} Open={IsModal} StopSearch={()=>setIsSearch(false)}>유저검색</Search>

      {/* 유저목록 */}
      {IsSearch ? 
      SearchFriendList?.length ? <Friend FriendsId={FriendsId} Friend={SearchFriendList!} IsSearch={IsSearch} Request={[]} NotLove={true}/> : <NoneFriend>검색 결과가 없습니다.</NoneFriend> :
      Friends?.length ? <Friend FriendsId={FriendsId} Friend={Friends!} IsSearch={IsSearch} Request={RequestLover} NotLove={false}/> : !IsSearch && <NoneFriend>아직 친구가 없어요</NoneFriend>}


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

const SearchImg = styled.img`
  width: 20px;
  height: 20px;
  padding: 5px;
`
// ..의 친구
const TopDivText = styled.text`
  font-family: var(--base-font-500);
`;

const NoneFriend = styled.div`
  font-family: var(--base-font-300);
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
  width: 100%;  
`