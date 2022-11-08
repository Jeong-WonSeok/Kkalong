import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios'
import requests from '../../api/requests'

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
  comment_id: number,
  user: {
    user_id: number,
    nickname: string,
    profile_img: string,
  },
  content: string,
  create_at: string,
  codi_img: string | null,
}

export interface ArticleType extends HelpCodiArticle{
  content: string,
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
    const start = async () => {
      const res = await axios.get(requests.detailHelpCodi + params.HelpCodiId)
      const InputData = res.data.Help
      InputData['user'] = res.data.user_id
      InputData['comment'] = res.data.comment
      setArticle(InputData)
    }

    start()

  },[])

  const ModalChange = () => {
    setIsMenu(false)
    setIsModal(true)
  }

  // 댓글 추가
  const CommentsInput = (data:commentType) => {
    let newArticle = [...Article!.comment]
    newArticle.push(data)
    setArticle((prev) => ({
      ...prev!,
      comment: newArticle
    }))
  }

  // 댓글 삭제
  const CommentsDelete = (idx: number) => {
    let newArticle  = [...Article!.comment]
    let newComment = newArticle.filter(comment => {
      return comment.comment_id !== idx
    })
    setArticle((prev => ({
      ...prev!,
      comment: newComment
    })))
  }

    // 댓글 수정
  const CommentsEdit = (idx: number, data: commentType) => {
    let newArticle  = [...Article!.comment]
    let newComment = newArticle.map(comment => {
      if (comment.comment_id === idx) {
        comment = data
      }
      return comment
    })

    setArticle((prev => ({
      ...prev!,
      comment: newComment
    })))
  }

  const ShowCloset = () => {
    // 작성자의 코디 페이지로 이동
    navigate(`closet/${Article?.user.user_id}`)
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
          <TitleText>Q. {Article?.title}</TitleText>
          {!!!Article?.open &&<CodiImg src={Article?.help_img}/>}
          <ProfileContainer>
            <div style={{display: 'flex' ,flexDirection: 'row'}}>
              <Profile Image={Article?.user.profile_img ? Article?.user.profile_img : ''} Size={30}/>
              <ProfileName>{Article?.user.nickname}</ProfileName>
            </div>
            {Article?.open && <ClosetButton onClick={ShowCloset}>
                <ClosetImg src={Closet}/>
                <ClosetP>옷장보기</ClosetP>
              </ClosetButton>}
          </ProfileContainer>
          <TitleText style={{fontFamily: 'var(--base-font-300)'}}>{Article?.content}</TitleText>
        </ImgContainer>

        <LineDiv></LineDiv>

        <CommentContainer 
        Comments={Article?.comment ? Article?.comment : defaultComment} 
        article_id={Article?.help_id ? Article?.help_id : 1}
        category={Article?.open ? "closet" : "cody"}
        CommentsInput={CommentsInput}
        CommentsDelete={CommentsDelete}
        CommentsEdit={CommentsEdit}/>
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