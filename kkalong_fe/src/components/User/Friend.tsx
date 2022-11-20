import React,{useState, useEffect} from 'react'
import styled, { css } from 'styled-components'
import { FriendType } from '../../pages/MyPage/MyPageFriend';
import axios from '../../api/axios'
import requests from '../../api/requests'
import { follow, lover } from '../../redux/modules/User';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';

import NoLove from '../../assets/icon/User/NoLove.png'
import MyLove from '../../assets/icon/User/MyLove.png'
import RequestLove from '../../assets/icon/User/RequestLove.png'
import alreadyLike from '../../assets/icon/Community/alreadyLike.png'
import Lover from '../../assets/icon/MyPage/Lover.png'
import { useNavigate } from 'react-router-dom';
import { LineDiv } from '../../pages/Community/DetailBestDress';

export default function Friend(
  {Friend, IsSearch, Request, NotLove, FriendsId}:
  {Friend: Array<FriendType>, IsSearch: boolean, Request: Array<Number>, NotLove: boolean, FriendsId:Array<Number>}) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {User} = useAppSelector(state => state.User)
  const [ Req, setReq ] = useState(Array<Number>)
  const [SearchMyFriends, setSearchMyFriends] = useState(Array<FriendType>)
  const [SearchFriends, setSearchFriends] = useState(Array<FriendType>)

  useEffect(()=> {
    if (Request.length > 0) {
      setReq(Request)
    }

    if (IsSearch) {
      setSearchMyFriends([])
      setSearchFriends([])
      Friend.map(f => {
        if (FriendsId.includes(f.user_id)){
          setSearchMyFriends([...SearchMyFriends, f])
        } else {
          setSearchFriends([...SearchFriends, f])
        }
        return
      })
    }
  }, [IsSearch])

  // 팔로우 로직
  const Follow = (id: number) => {
    dispatch(follow(String(id)))
  }

  const postLove = (id: number, request:boolean) => {
    dispatch(lover(String(id), request))
  }
  
  return (
    <div>
      {!IsSearch && Friend.map((person, idx) => {
        const request = Req.includes(person.user_id)
        return (
          <FriendDiv key={idx}>
            <FriendProfileDiv>
              <FriendProfileImg src={person.profile_img} onClick={()=>navigate(`/myPage/${person.user_id}`)}></FriendProfileImg>
              {User.loving && User.lover_id === person.user_id && <LoverDes src={Lover}/>}
              <FriendProfileName>{person?.nickname}</FriendProfileName>
            </FriendProfileDiv>
            <BtnContainer>
              <FollowBtn onClick={() => Follow(person?.user_id)}>{User?.followings.includes(person.user_id) ? "언팔로잉" : "팔로잉" }</FollowBtn>
              {!person!.loving && !NotLove && 
              <LoverBtn src={
                User?.loving && User?.lover_id === person.user_id ? alreadyLike
                  : !request && User?.lover_id === -1 ? NoLove 
                  : request && User?.lover_id === -1 ? RequestLove 
                  : !request && User?.lover_id === person.user_id ? MyLove 
                  : ''} 
                onClick={()=>postLove(person?.user_id, request)}/>}
            </BtnContainer>
          </FriendDiv>  
        )
      })}

      {IsSearch && <div>
        <Category>친구들</Category>
        {SearchMyFriends.map((person, idx) => {
          const request = Req.includes(person.user_id)
          return (
            <FriendDiv key={idx}>
              <FriendProfileDiv>
                <FriendProfileImg src={person.profile_img} onClick={()=>navigate(`/myPage/${person.user_id}`)}></FriendProfileImg>
                {User.loving && User.lover_id === person.user_id && <LoverDes src={Lover}/>}
                <FriendProfileName>{person?.nickname}</FriendProfileName>
              </FriendProfileDiv>
              <BtnContainer>
                <FollowBtn onClick={() => Follow(person?.user_id)}>{User?.followings.includes(person.user_id) ? "언팔로잉" : "팔로잉" }</FollowBtn>
                {!person!.loving && !NotLove && 
                <LoverBtn src={
                  User?.loving && User?.lover_id === person.user_id ? alreadyLike
                  : !request && User?.lover_id === -1 ? NoLove 
                  : request && User?.lover_id === -1 ? RequestLove 
                  : !request && User?.lover_id === person.user_id ? MyLove 
                  : ''} 
                  onClick={()=>postLove(person?.user_id, request)}/>}
              </BtnContainer>
            </FriendDiv>
          )     
        })}
        
        <LineDiv></LineDiv>

        {SearchFriends.map((person, idx) => {
          const request = Req.includes(person.user_id)
          return (
            <FriendDiv key={idx}>
              <FriendProfileDiv>
                <FriendProfileImg src={person.profile_img} onClick={()=>navigate(`/myPage/${person.user_id}`)}></FriendProfileImg>
                {User.loving && User.lover_id === person.user_id && <LoverDes src={Lover}/>}
                <FriendProfileName>{person?.nickname}</FriendProfileName>
              </FriendProfileDiv>
              <BtnContainer>
                <FollowBtn onClick={() => Follow(person?.user_id)}>{User?.followings.includes(person.user_id) ? "언팔로잉" : "팔로잉" }</FollowBtn>
                {!person!.loving && !NotLove && 
                <LoverBtn src={
                  User?.loving && User?.lover_id === person.user_id ? alreadyLike
                  : !request && User?.lover_id === -1 ? NoLove 
                  : request && User?.lover_id === -1 ? RequestLove 
                  : !request && User?.lover_id === person.user_id ? MyLove 
                  : ''} 
                  onClick={()=>postLove(person?.user_id, request)}/>}
                {person.loving && User?.lover_id === person.user_id && <LoverBtn src={alreadyLike} onClick={()=>postLove(person?.user_id, request)}/>}
              </BtnContainer>
            </FriendDiv>
          )     
        })}
        </div>}
   </div>
  )
}

const FriendDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 330px;
  margin: 10px 0;
`

//프로필 div
const FriendProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

//프로필 이미지
const FriendProfileImg = styled.img`
  border: 1px solid #000000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const LoverDes = styled.img`
  position:absolute;
  width: 25px;
  height: 25px;
  bottom: 0;
  left: 35px;
`

//프로필 이름
const FriendProfileName = styled.text`
  margin-left: 30px;
  font-family: var(--base-font-400);
`;

const BtnContainer = styled.div`
  display:flex;
  flex-direction: row;
`

export const FollowBtn = styled.button`
  border: none;
  font-family: var(--base-font-400);
  font-size: 0.8rem;
  background-color: var(--primary-color-500);
  border-radius: 10px;
  color: white;
  width: 60px;
  height: 25px;
  margin-right: 10px;
`

const LoverBtn = styled.img`
  width: 25px;
  height: 25px;
`

const Category = styled.p`
  width: 100%;
  font-family: var(--base-font-300);
  font-size: 1rem;
`