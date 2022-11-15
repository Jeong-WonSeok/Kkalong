import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import DefaultImg from "../../assets/icon/MyPage/My.png";
import { UserType } from '../../pages/MyPage/MyPage';
import { FriendType } from '../../pages/MyPage/MyPageFriend';
import axios from '../../api/axios'
import requests from '../../api/requests'

export default function Friend({Friend, IsSearch}: {Friend: Array<FriendType>, IsSearch: boolean}) {
  const [User, setUser] = useState<UserType>()

  useEffect(()=>{
    setUser(JSON.parse(localStorage?.getItem('userProfile')as string))
  },[])

  // 팔로우 로직
  const Follow = (id: number) => {
    const data = {
      follower_id: id
    }
    axios.post(requests.follow, data)
    if (User?.followers.includes(id)) {
      const newFollwer =  User.followers.filter(follwer_id => {
        return follwer_id !== id
      })
      setUser((current) => ({
        ...current as UserType,
        followers: newFollwer
      }))
      localStorage.setItem("userProfile", JSON.stringify(User));
    } else {
      setUser((current) => ({
        ...current as UserType,
        followers: User?.followers.push(id) as unknown as Array<number>
      }))
      localStorage.setItem("userProfile", JSON.stringify(User));
    }
  }
  
  return (
    <div>
      {Friend.map((person, idx) => {
        return (
          <FriendDiv>
            <FriendProfileDiv key={idx}>
              <FriendProfileImg src={DefaultImg}></FriendProfileImg>
              <FriendProfileName>{person?.nickname}</FriendProfileName>
            </FriendProfileDiv>
            <FollowBtn onClick={() => Follow(person?.user_id)}>{User?.followers.includes(person.user_id) ? "언팔로우" : "팔로우" }</FollowBtn>
          </FriendDiv>  
        )
      })}
   </div>
  )
}

const FriendDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px;
`

//프로필 div
const FriendProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
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

export const FollowBtn = styled.button`
  border: none;
  font-family: var(--base-font-400);
  font-size: 0.8rem;
  background-color: var(--primary-color-500);
  border-radius: 10px;
  color: white;
  width: 60px;
  height: 25px;
`