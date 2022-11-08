import React from 'react'
import styled from 'styled-components'
import DefaultImg from "../../assets/icon/MyPage/My.png";
import { FriendType } from '../../pages/MyPage/MyPageFriend';

export default function Friend({Friend}: {Friend: FriendType}) {
  return (
    <FriendProfileDiv>
      <FriendProfileImg src={DefaultImg}></FriendProfileImg>
      {/* <FriendProfileName>{Friend.follower.user.nickname}</FriendProfileName> */}
    </FriendProfileDiv>
  )
}


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
