import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import TopNav from '../../components/ui/TopNav'
import FooterBar from '../../components/ui/FooterBar'
import HelpCodi from '../../components/Community/HelpCodi'
import { Container, HelpCodiArticle } from './MainCommunity'
import { CategoryText, PlusDiv } from './MainBestDress'
import { PlusImg } from './MainBestDress'

import backArrow from '../../assets/icon/Nav/BackArrow.png'
import AddArticle from '../../assets/icon/Community/addArticle.png'



type ButtonType = {
  tap?: boolean;
}

export default function MainHelpCodi() {
  const navigate = useNavigate()
  const [ HelpArticles, setHelpArticles ] = useState(Array<HelpCodiArticle>)
  const [ IsCodi, setIsCodi] = useState(true)
  const [ IsCloset, setIsCloset] = useState(false)

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

      <CategoryText style={{marginLeft: '10px'}}>친구가 곤란해하고 있어요</CategoryText>
      <FriendContainer>
        {HelpArticles.map((HelpArticle, idx) => {
            return (
              <TitleDiv key={idx}>
                Q. {HelpArticle.help_title.length > 25 ? HelpArticle.help_title.slice(0,23) + '...' : HelpArticle.help_title}
              </TitleDiv>
            )
          })}
      </FriendContainer>
      
      <ButtonContainer>
        {/* 해당 형식을 통해서 조건부로 렌더링이 가능하다 */}
        <TapButton tap={IsCodi} onClick={()=> {setIsCodi(true); setIsCloset(false)}}>코디</TapButton>
        <TapButton tap={IsCloset} onClick={()=> {setIsCodi(false); setIsCloset(true)}}>옷장</TapButton>
      </ButtonContainer>
      
      {IsCodi && <CodiContainer>
        {HelpArticles.map((HelpArticle, idx) => {
          return (
            <HelpCodi article={HelpArticle}/> 
          )
        })}
      </CodiContainer>}

      {IsCloset && <ClosetContainer>
          {HelpArticles.map((HelpArticle, idx) => {
            return (
            <TitleDiv key={idx} onClick={()=> navigate(`/community/HelpCodi/${idx}`)}>
              Q. {HelpArticle.help_title.length > 25 ? HelpArticle.help_title.slice(0,23) + '...' : HelpArticle.help_title}
            </TitleDiv>
            )
          })}
        </ClosetContainer>}
        
        <PlusDiv>
          <PlusImg src={AddArticle} onClick={()=> navigate('/community/HelpCodi/Add')}/>  
        </PlusDiv>
      <FooterBar/>
    </div>
  )
}

const BackArrow = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0;
`
const CodiContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: 1;
`

const ClosetContainer = styled(Container)`
  display:flex;
  flex-direction: column;
  align-items: center;
`

const FriendContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  max-height: 100px;
  overflow: scroll;
  align-items: center;
`

const TitleDiv = styled.div`
  font-size: 14px;
  font-family: var(--base-font-500);
  color: white;
  background-color: var(--primary-color-500);
  width: 90%;
  border-radius: 10px;
  margin-Bottom: 5px;
  padding: 3px 5px;
`

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`

// 타입스크립트에서 props를 주기 위해서는 props의 타입을 별도로 지정해야된다.
const TapButton = styled.div<ButtonType>`
  width: 50%;
  border-radius: 15px 15px 0 0;
  border-top: 6px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  height: 25px;
  font-size: 14px;
  line-height: 25px;
  color: ${(props) => (props.tap ? "var(--primary-color-900)" : "var(--primary-color-500)")};
  font-family: var(--base-font-500);
  text-align: center;
`