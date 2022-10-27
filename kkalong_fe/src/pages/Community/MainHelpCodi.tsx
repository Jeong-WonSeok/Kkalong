import { useState, useEffect } from 'react'
import styled from 'styled-components'
import TopNav from '../../components/ui/TopNav'

import backArrow from '../../assets/icon/Nav/BackArrow.png'
import { useNavigate } from 'react-router-dom'
import FooterBar from '../../components/ui/FooterBar'
import { Container, HelpCodiArticle } from './MainCommunity'
import HelpCodi from '../../components/Community/HelpCodi'

export default function MainHelpCodi() {
  const navigate = useNavigate()
  const [ HelpArticles, setHelpArticles ] = useState(Array<HelpCodiArticle>)

  useEffect(() => {
    setHelpArticles([
      {
        help_id: 1,
        help_img: 'https://i3.codibook.net/files/1978121543118/a553319d9394abde/70936325.jpg?class=big',
        user_id: {
          nickname: 'infp2',
          profile: ''
        },
        help_title: '20대 남자인데 데이트 코디 어떤가요?'
      },
      {
        help_id: 2,
        help_img: 'https://i.pinimg.com/474x/85/06/4d/85064decf478772d1659c1aec4afd4b5.jpg',
        user_id: {
          nickname: 'poni',
          profile: ''
        },
        help_title: '새내기 코디 어때요?'
      },
      {
        help_id: 3,
        help_img: 'https://i.pinimg.com/originals/94/8a/22/948a22cfbdd4554d964e7c4b84cc9a50.jpg',
        user_id: {
          nickname: 'Rabbit13',
          profile: ''
        },
        help_title: '친구랑 홍대갈 예정인데 이 정도면 평타?'
      },
      {
        help_id: 4,
        help_img: 'https://i.pinimg.com/originals/4a/22/8b/4a228b0859fc11f0c28525d7cd0c059a.jpg',
        user_id: {
          nickname: 'loki535',
          profile: ''
        },
        help_title: '겨울 데이트룩 괜찮은가요?'
      },
    ])
  }, [])
  
  return (
    <div>
      <TopNav type={""}>
        <BackArrow src={backArrow} onClick={()=>navigate('/community')}/>
        <CategoryText>도와주세요 패알못😂</CategoryText>
        <div style={{ width: '30px', height: '30px'}}></div>
      </TopNav>

      <CodiContainer>
        {HelpArticles.map((HelpArticle, idx) => {
          return (
            <HelpCodi article={HelpArticle}/> 
          )
        })}
      </CodiContainer>

      <FooterBar/>
    </div>
  )
}

const BackArrow = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0;
`

const CategoryText = styled.p`
  line-height: 0;
  font-family: var(--base-font-600);
`
const CodiContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`