import React from 'react'
import styled, { css } from 'styled-components'
import FooterBar from '../../components/ui/FooterBar'
import TopNav from '../../components/ui/TopNav'
import { useAppSelector } from '../../hooks/reduxHook'
import { CategoryText } from '../Community/MainCommunity'

type seasonType = {
  season: string
}

export default function PersonalColorRecommend() {
  const {User} = useAppSelector(state => state.User)
  const SeasonColor = {
    "spring": "#F08080",
    "summer": "#87CEFA",
    "fall": "#B8860B",
    "winter": "#FFFAFA"
  }

  return (
    <div>
      <TopNav type="">
        <div></div>
        <CategoryText>퍼스널 컬러 코디 추천</CategoryText>
        <div></div>
      </TopNav>

      <Container>
        <Info>{User.nickname}님의 퍼스널 컬러는 <PersonalColor season={SeasonColor['winter']}>겨울</PersonalColor></Info>
        <CodyContainer season={SeasonColor['winter']}>
          
        </CodyContainer>                                          
      </Container>

      <FooterBar/>
    </div>

  )
}

const Container = styled.div`
  padding: 10px;
`

const Info = styled.p`
  font-size: 0.9rem;
  font-family: var(--base-font-300);
`

const PersonalColor = styled.span<seasonType>`
  color: ${props => props.season};
  text-shadow: ${props =>props.season === "winter" ? css`1px 1px 4px rgba(0, 0, 0, 0,25)` : css``};
`

const CodyContainer = styled.div<seasonType>`
  background-color: ${props => props.season};
  opacity: 0.7;
  width: 100%;
  height: 400px;
`