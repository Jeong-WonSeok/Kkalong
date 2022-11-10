import React from "react";
import styled from "styled-components";
import { BestDresserArticle } from "../../pages/Community/MainCommunity";
import { useNavigate } from "react-router-dom";

import like from "../../assets/icon/Community/like.png";
import defaultImg from "../../assets/icon/Community/defaultImg.png"
import Profile from "./Profile";
import FirebaseUrl from "../../hooks/FirebaseUrl";

export default function BestDresser({
  article,
}: {
  article: BestDresserArticle;
}) {
  const navigate = useNavigate();
  
  return (
    <Container
      style={{ backgroundImage: `url(${article.Best.img ? FirebaseUrl(article) : defaultImg})` }}
      onClick={() => navigate(`/community/BestDress/${article.Best.id}`)}
    >
      <ProfileContainer>
        <Profile Image={article.user.profile_img} Size={17} id={article.user.user_id}/>
        <span>{article.user.nickname}</span>
      </ProfileContainer>
      <LikeContainer>
        <LikeImg src={like} />
        {article.Best.likeCount}
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
