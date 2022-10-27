import { useState, useEffect } from 'react'
import styled from 'styled-components'

import TopNav from '../../components/ui/TopNav'
import { HelpCodiArticle, Container } from './MainCommunity'
import Profile from '../../components/Community/Profile'

import BackArrow from '../../assets/icon/Nav/BackArrow.png'
import Menu from '../../assets/icon/Nav/menu.png'
import { useNavigate } from 'react-router-dom'
import FooterBar from '../../components/ui/FooterBar'
import { LineDiv } from './DetailBestDress'
import CommentContainer from '../../components/Community/CommentContainer'

export interface commentType {
  user_id: {
    nickname: string,
    profile_img: string,
  },
  content: string,
  create_at: string,
}

export interface ArticleType extends HelpCodiArticle{
  help_content: string,
  comment: Array<commentType>
}

export default function DetailHelpCodi() {
  const defaultComment: Array<commentType> = []
  const navigate = useNavigate()
  const [Article, setArticle] = useState<ArticleType>()

  useEffect(()=>{
    setArticle({
      help_id: 1,
      help_img: 'https://i3.codibook.net/files/1978121543118/a553319d9394abde/70936325.jpg?class=big',
      user_id: {
        nickname: 'infp2',
        profile: ''
      },
      help_title: '20대 남자인데 데이트 코디 어떤가요?',
      help_content: '같은 대학교 동기랑 내일 영화 약속 잡아놨는데 이정도면 무난할까요?',
      comment: [{
        user_id: {
          nickname: 'hello',
          profile_img: '',
        },
        content: '청자켓말고 가디건은 어때요?',
        create_at: '2022-10-25 14:23:00',
      },
      {
        user_id: {
          nickname: 'queen3',
          profile_img: 'https://i1.sndcdn.com/avatars-BuwoWygg1Oj9xyIp-qQgBxA-t240x240.jpg',
        },
        content: '그 옷은 정말 아닌거같아요!',
        create_at: '2022-10-25 14:57:00',
      }]
    })
  },[])

  return (
    <div>
      <TopNav type={''}>
        <MenuImg src={BackArrow} onClick={()=>navigate('/community/HelpCodi')}/>
        <NavText>도와주세요 패알못😂</NavText>
        <MenuImg src={Menu}/>
      </TopNav>

      <Container >
        <ImgContainer>
          <TitleText>Q. {Article?.help_title}</TitleText>
          <CodiImg src={Article?.help_img}/>
          <ProfileContainer>
            <Profile Image={Article?.user_id.profile? Article?.user_id.profile : ''} Size={30}/>
            <ProfileName>{Article?.user_id.nickname}</ProfileName>
          </ProfileContainer>
          <TitleText style={{fontFamily: 'var(--base-font-300)'}}>{Article?.help_content}</TitleText>
        </ImgContainer>

        <LineDiv></LineDiv>

        <CommentContainer Comments={Article?.comment ? Article?.comment : defaultComment}/>
      </Container>

      <FooterBar/>
    </div>
  )
}

const MenuImg = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0;
`

const NavText = styled.p`
  font-family: var(--base-font-600);
  line-height: 0;
`

const ImgContainer = styled.div`
  padding: 0 10px;
`

const TitleText = styled.p`
  font-size: 16px;
  margin: 0;
  font-family: var(--base-font-400);
`

const CodiImg = styled.img`
  border-radius: 20px;
  max-width: 320px;
  padding: 0 10px;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ProfileName = styled.span`
  font-size: 10px;
  font-family: var(--base-font-400);
  margin: auto 0;
`