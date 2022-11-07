import { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import TopNav from '../../components/ui/TopNav'
import FooterBar from '../../components/ui/FooterBar'
import Profile from '../../components/Community/Profile'
import CommentContainer from '../../components/Community/CommentContainer'

import BackArrow from '../../assets/icon/Nav/BackArrow.png'
import Menu from '../../assets/icon/Nav/menu.png'
import like from '../../assets/icon/Community/like.png'
import AlreadyLike from '../../assets/icon/Community/alreadyLike.png'

import { BestDresserArticle, Container } from './MainCommunity'

import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios'
import requests from '../../api/requests'
import MenuModal from '../../components/Community/MenuModal'
import Modal from '../../components/Community/Modal'

import {commentType} from './DetailHelpCodi'

export interface ArticleType extends BestDresserArticle{
  post_content: string,
  comment: Array<commentType>
}

type LikeType = {
  Like: boolean
}

export default function DetailBestDress() {
  // undefined 값을 없애주기 위해서 설정
  const [Like, setLike] = useState(false)
  const [IsMenu, setIsMenu] = useState(false)
  const [IsModal, setIsModal] = useState(false)
  const defaultComment: Array<commentType> = []
  const navigate = useNavigate()
  const params = useParams()
  // 객체 타입지정
  const [Article, setArticle] = useState<ArticleType>()

  useEffect(() => {
    async function getDetail() {
      const res = await axios.get(requests.detailBestDress + params.BestDressId)
      setArticle(res.data)
    }
    getDetail()
    setArticle({
      post_id : Number(params.BestDressId),
      post_img: 'http://m.ippeumi.com/web/product/big/Vdaily20210410_25EA_j024.jpg',
      post_user: {
        nickname: 'loki535',
        profile: ''
      },
      post_like: 13,
      post_content: '홍대 카페에서 찍어봤어요',
      comment: [{
        comment_id: 1,
        user: {
          user_id: 1,
          nickname: 'hello',
          profile_img: '',
        },
        content: '정말 이쁘세요',
        create_at: '2022-10-25 14:23:00',
        codi_img: null,
      },
      {
        comment_id: 2,
        user: {
          user_id: 2,
          nickname: 'queen3',
          profile_img: 'https://i1.sndcdn.com/avatars-BuwoWygg1Oj9xyIp-qQgBxA-t240x240.jpg',
        },
        content: '저도 거기서 찍고싶네요!',
        create_at: '2022-10-25 14:57:00',
        codi_img: null,
      }]
    })
    
  }, [])

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

  return (
    <div>
      <TopNav type="">
        <IconImg src={BackArrow} onClick={()=>navigate(-1)}/>
        <NavText>도전! 베스트 드레서✨</NavText>
        <IconImg src={Menu} onClick={()=> setIsMenu(!IsMenu)}/>
      </TopNav>

      {IsMenu && <MenuModal 
      Page={"BestDress"} 
      Id={Number(params.BestDressId)} 
      openModal={ModalChange}
      closeModal={()=> setIsMenu(false)}/>}
      {IsModal && <Modal Page={"BestDress"} Id={Number(params.BestDressId)} CloseModal={()=>setIsModal(false)}/>}

      <Container>
        <ContentContainer>
          <ContentImg src={Article?.post_img}/>
        </ContentContainer>
        <ContentInfoContainer>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 15px'}}>
            <ProfileContainer>
              <Profile Image={Article?.post_user.profile ? Article?.post_user.profile : ''} Size={30}/>
              <CustomText>{Article?.post_user.nickname}</CustomText>
            </ProfileContainer>
            <LikeContainer>
              {!!!Like && <Likeimg Like={Like} src={like} onClick={()=> setLike(!!!Like)}/>}
              {Like && <Likeimg Like={Like} src={AlreadyLike} onClick={()=> setLike(!!!Like)}/>}
              <CustomText style={{fontSize: '13px'}}>{Article?.post_like}</CustomText>
            </LikeContainer>
          </div>
          <CustomText style={{fontFamily: 'var(--base-font-200)', padding: '5px 15px 0px'}}>{Article?.post_content}</CustomText>
        </ContentInfoContainer>
        
        <LineDiv></LineDiv>

        <CommentContainer
         Comments={Article?.comment ? Article?.comment : defaultComment}
          article_id={Article?.post_id ? Article?.post_id : 1}
          category={"bestdress"}
          CommentsInput={CommentsInput}
          CommentsDelete={CommentsDelete}/>
      </Container>

      <FooterBar/>
    </div>
  )
}

const IconImg = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0;
`

const NavText = styled.p`
  font-family: var(--base-font-600);
  line-height: 0;
`

export const ContentContainer = styled.div`
  padding: 0px 10px 10px 10px;
`

const ContentImg = styled.img`
  width: 100%;
  border-radius: 30px;
`

const ContentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileContainer = styled.div`
  display:flex;
`

const LikeContainer = styled.div`
  margin: auto 0;
  display: flex;
`

const LikeJello = keyframes` 
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
`
  

const Likeimg = styled.img<LikeType>`
  width: 20px;
  height: 20px;
  margin-right: 3px;
  animation: ${(props) => props.Like && css`${LikeJello} 0.9s both`};
`

const CustomText = styled.p`
  margin: auto 0;
  font-size: 15px;
  font-family: var(--base-font-400);
`

export const LineDiv = styled.div`
  position: relative;
  left: -10px;
  background-color: var(--primary-color-700);
  width: 100vw;
  max-width: 360px;
  margin: 10px 0; 
  height: 2px;
  z-index: 3;
`