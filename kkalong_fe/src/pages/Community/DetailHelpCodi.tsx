import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'

import TopNav from '../../components/ui/TopNav'
import FooterBar from '../../components/ui/FooterBar'
import { HelpCodiArticle, Container } from './MainCommunity'
import Profile from '../../components/Community/Profile'
import { LineDiv } from './DetailBestDress'
import CommentContainer from '../../components/Community/CommentContainer'

import BackArrow from '../../assets/icon/Nav/BackArrow.png'
import Menu from '../../assets/icon/Nav/menu.png'
import Closet from '../../assets/icon/Footer/select_closet.png'
import MenuModal from '../../components/Community/MenuModal'
import Modal from '../../components/Community/Modal'



export interface commentType {
  user_id: {
    nickname: string,
    profile_img: string,
  },
  content: string,
  create_at: string,
  codi_img: string | null,
}

export interface ArticleType extends HelpCodiArticle{
  help_content: string,
  open: boolean,
  comment: Array<commentType>
}

export default function DetailHelpCodi() {
  const navigate = useNavigate()
  const params = useParams()
  const [IsMenu, setIsMenu] = useState(false)
  const [IsModal, setIsModal] = useState(false)
  const defaultComment: Array<commentType> = []
  const [Article, setArticle] = useState<ArticleType>()

  useEffect(()=>{
    setArticle({
      help_id: 1,
      help_img: 'https://i3.codibook.net/files/1978121543118/a553319d9394abde/70936325.jpg?class=big',
      user_id: {
        nickname: 'infp2',
        profile: ''
      },
      open: false,
      help_title: '20대 남자인데 데이트 코디 어떤가요?',
      help_content: '같은 대학교 동기랑 내일 영화 약속 잡아놨는데 이정도면 무난할까요?',
      comment: [{
        user_id: {
          nickname: 'hello',
          profile_img: '',
        },
        content: '청자켓말고 가디건은 어때요?',
        create_at: '2022-10-25 14:23:00',
        codi_img: 'https://i.pinimg.com/474x/85/06/4d/85064decf478772d1659c1aec4afd4b5.jpg',
      },
      {
        user_id: {
          nickname: 'queen3',
          profile_img: 'https://i1.sndcdn.com/avatars-BuwoWygg1Oj9xyIp-qQgBxA-t240x240.jpg',
        },
        content: '그 옷은 정말 아닌거같아요!',
        create_at: '2022-10-25 14:57:00',
        codi_img: 'https://i.pinimg.com/736x/50/9d/b9/509db9f147d3b7d9589a0ded6a97b45b.jpg,'
      }]
    })
  },[])

  const ModalChange = () => {
    setIsMenu(false)
    setIsModal(true)
  }

  const CommentsInput = (data:commentType) => {
    let newArticle = [...Article!.comment]
    newArticle.push(data)
    setArticle((prev) => ({
      ...prev!,
      comment: newArticle
    }))
}

  return (
    <div>
      <TopNav type={''}>
        <MenuImg src={BackArrow} onClick={()=>navigate('/community/HelpCodi')}/>
        <NavText>도와주세요 패알못😂</NavText>
        <MenuImg src={Menu} onClick={()=>setIsMenu(true)}/>
      </TopNav>

      {IsMenu && <MenuModal 
      Page={"Helpcodi"}
      Category={Article?.open? "Closet" : "Codi"} 
      Id={Number(params.HelpCodiId)} 
      openModal={ModalChange}
      closeModal={()=> setIsMenu(false)}/>}
      {IsModal && <Modal Page={"BestDress"} Id={Number(params.BestDressId)} CloseModal={()=>setIsModal(false)}/>}

      <Container >
        <ImgContainer>
          <TitleText>Q. {Article?.help_title}</TitleText>
          {!!!Article?.open &&<CodiImg src={Article?.help_img}/>}
          <ProfileContainer>
            <div style={{display: 'flex' ,flexDirection: 'row'}}>
              <Profile Image={Article?.user_id.profile? Article?.user_id.profile : ''} Size={30}/>
              <ProfileName>{Article?.user_id.nickname}</ProfileName>
            </div>
            {Article?.open && <ClosetButton>
                <ClosetImg src={Closet}/>
                <ClosetP>옷장보기</ClosetP>
              </ClosetButton>}
          </ProfileContainer>
          <TitleText style={{fontFamily: 'var(--base-font-300)'}}>{Article?.help_content}</TitleText>
        </ImgContainer>

        <LineDiv></LineDiv>

        <CommentContainer 
        Comments={Article?.comment ? Article?.comment : defaultComment} 
        article_id={Article?.help_id ? Article?.help_id : 1}
        category={Article?.open ? "closet" : "cody"}
        CommentsInput={CommentsInput}/>
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
`

const ProfileContainer = styled.div`
  margin: 5px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ProfileName = styled.p`
  font-size: 14px;
  font-family: var(--base-font-400);
  margin: auto 0;
`

const ClosetButton = styled.div`
  width: 120px;
  height: 30px;
  border-radius: 10px;
  background-color: var(--primary-color-300);
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const ClosetImg = styled.img`
  width: 24px;
  height: 24px;
`

const ClosetP = styled.p`
  font-family: var(--base-font-400);
  margin: auto 0;
  margin-right: 4px;
  font-size: 14px;
`