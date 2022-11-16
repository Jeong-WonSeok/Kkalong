import { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import TopNav from '../../components/ui/TopNav'
import FooterBar from '../../components/ui/FooterBar'
import Profile from '../../components/Community/Profile'
import CommentContainer from '../../components/Community/CommentContainer'

import BackArrow from '../../assets/icon/Nav/BackArrow.png'
import Menu from '../../assets/icon/Nav/menu.png'
import LikeImg from '../../assets/icon/Community/like.png'
import AlreadyLike from '../../assets/icon/Community/alreadyLike.png'

import { BestDresserArticle, Container } from './MainCommunity'

import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios'
import requests from '../../api/requests'
import MenuModal from '../../components/Community/MenuModal'
import Modal from '../../components/Community/Modal'

import {commentType} from './DetailHelpCodi'
import { UserType } from '../MyPage/MyPage'
import { useAppSelector } from '../../hooks/reduxHook'

export interface ArticleType extends BestDresserArticle{
  comment: Array<commentType>,
  createAt: string,
  like: Array<number>
}

type LikeType = {
  Like: boolean
}

export default function DetailBestDress() {
  // undefined 값을 없애주기 위해서 설정
  const [IsMenu, setIsMenu] = useState(false)
  const [IsModal, setIsModal] = useState(false)
  const defaultComment: Array<commentType> = []
  const { User } = useAppSelector(state => state.User)
  const navigate = useNavigate()
  const params = useParams()
  // 객체 타입지정
  const [Article, setArticle] = useState<ArticleType>()
  const [LikeCount, setLikeCount] = useState(0)
  const [Like, setLike] = useState(false)

  useEffect(() => {
    async function getDetail() {
      const res = await axios.get(requests.detailBestDress + params.BestDressId)
      console.log(res.data)
      setArticle(res.data)
      setLikeCount(res.data.Best.likeCount)
      setLike(res.data.like.includes(User!.user_id) ? true : false)
    }
    getDetail()
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

  // 게시글 좋아요
  const PostLike = async () => {
    const res = await axios.post(requests.detailBestDress + Article?.Best.id)
    setLike(!Like)
    if (!Like) {
      setArticle((current) => {
        let newArticle = current as ArticleType
        newArticle.like = res.data.like
        newArticle.Best.likeCount = newArticle.like.length
        return newArticle
      })
    } else {
      setArticle((current) => {
        let newArticle = current as ArticleType
        const result = newArticle!.like.filter(num => {
          return num !== User!.user_id
        })
        newArticle!.like = result
        newArticle.Best.likeCount = result.length
        return newArticle
      })
    }
  }

  return (
    <div>
      <TopNav type="">
        <IconImg src={BackArrow} onClick={()=>navigate(-1)}/>
        <NavText>도전! 베스트 드레서✨</NavText>
        {User?.user_id === Article?.user.user_id ? <IconImg src={Menu} onClick={()=> setIsMenu(!IsMenu)}/> : <div style={{width: '30px', height: '30px'}}></div>}
      </TopNav>

      {IsMenu && <MenuModal 
      Page={"BestDress"} 
      Id={Number(params.BestDressId)} 
      openModal={ModalChange}
      closeModal={()=> setIsMenu(false)}/>}
      {IsModal && <Modal Page={"BestDress"} Id={Number(params.BestDressId)} CloseModal={()=>setIsModal(false)}/>}

      <Container>
        <ContentContainer>
          <ContentImg src={Article?.Best.img}/>
        </ContentContainer>
        <ContentInfoContainer>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 15px'}}>
            {Article?.user && 
            <ProfileContainer>
              <Profile Image={Article!.user.profile_image} Size={30} id={Article!.user.user_id}/>
              <CustomText>{Article!.user.nickname}</CustomText>
            </ProfileContainer>}
            <LikeContainer>
              {!!!Like && <Likeimg Like={Like} src={LikeImg} onClick={()=>{PostLike(); setLikeCount(LikeCount+1)}}/>}
              {Like && <Likeimg Like={Like} src={AlreadyLike} onClick={()=>{PostLike(); setLikeCount(LikeCount-1)}}/>}
              <CustomText style={{fontSize: '13px'}}>{LikeCount}</CustomText>
            </LikeContainer>
          </div>
          <CustomText style={{fontFamily: 'var(--base-font-200)', padding: '5px 15px 0px'}}>{Article?.Best.content}</CustomText>
        </ContentInfoContainer>
        
        <LineDiv></LineDiv>

        <CommentContainer
         Comments={Article?.comment ? Article?.comment : defaultComment}
          article_id={Article?.Best.id ? Article?.Best.id : 1}
          creator={Article?.user.user_id ? Article?.user.user_id : 0}
          category={"bestdress"}
          CommentsInput={CommentsInput}
          CommentsDelete={CommentsDelete}
          CommentsEdit={CommentsEdit}/>
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
  z-index: -1;
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
  z-index: -1;
`