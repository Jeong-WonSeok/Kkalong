import React from 'react'
import styled from 'styled-components'
import { BestDresserArticle } from '../../pages/Community/MainCommunity'
import like from '../../assets/icon/Community/like.png'
import defaultProfile from '../../assets/icon/Community/defaultProfile.png'

export default function BestDresser({article} : {article:BestDresserArticle}) {

  return (
    <Container style={{backgroundImage: `url(${article.post_img})`}}>
      <ProfileContainer>
        <ProfileImg src={article.post_user.profile ? article.post_user.profile : defaultProfile}/>
        <span>{article.post_user.nickname}</span>
      </ProfileContainer>
      <LikeContainer>
        <LikeImg src={like}/>
        {article.post_like}
      </LikeContainer>
    </Container>
  )
}

const Container = styled.div`
  min-width: 140px;
  height: 180px;
  padding: 10px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 10px 0 0;
  background-size: cover;
  overflow: hidden
`

const ProfileContainer = styled.div`
  font-family: var(--base-font-300);
  color: white;
  font-size: 12px;
  display: flex;
  flex-direction: row;
`

const ProfileImg = styled.img`
  width: 17px;
  height: 17px;
  border-radius: 8px;
  margin-right: 4px;
`

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  font-size: 12px;
  font-family: var(--base-font-400);
`

const LikeImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`