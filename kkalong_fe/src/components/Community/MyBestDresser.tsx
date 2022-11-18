import React from "react";
import styled from "styled-components";
import { BestDresserArticle } from "../../pages/Community/MainCommunity";
import { useNavigate } from "react-router-dom";

import like from "../../assets/icon/Community/like.png";
import defaultImg from '../../assets/icon/Community/defaultImg.png'
import Profile from "./Profile";

export interface BestArticle {
  like: number,
  nickname:string,
  post_id: number,
  post_img: string,
  profile_img: string,
  user_id: number
}

export default function MyBestDresser({
  article,
}: {
  article: BestArticle ;
}) {
  console.log(article)
  const navigate = useNavigate();
  
  return (
    <Container
      style={{ backgroundImage: `url(${article.post_img ? article.post_img : defaultImg})` }}
      onClick={() => navigate(`/community/BestDress/false/${article.post_id}`)}
    >
      <ProfileContainer>
        <Profile Image={article.profile_img} Size={17} id={article.user_id}/>
        <UserNickName>{article.nickname}</UserNickName>
      </ProfileContainer>
      <LikeContainer>
        <LikeImg src={like} />
        {article.like}
      </LikeContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 140px;
  min-width: 140px;
  height: 180px;
  padding: 10px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 5px 10px 5px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
`

const ProfileContainer = styled.div`
  font-family: var(--base-font-300);
  color: white;
  font-size: 12px;
  display: flex;
  flex-direction: row;
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  font-size: 12px;
  font-family: var(--base-font-400);
`;

const LikeImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`;

const UserNickName = styled.span`
  margin-top: 5px;
  color : var(--primary-color-900);
`