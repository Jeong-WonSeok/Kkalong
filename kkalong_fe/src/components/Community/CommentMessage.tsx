import React, {useState} from 'react'
import styled, { css } from 'styled-components'
import { commentType } from '../../pages/Community/DetailHelpCodi'
import Profile from './Profile'

import axios from '../../api/axios'
import requests from '../../api/requests'

import codiSave from '../../assets/icon/Community/codiSave.png'
import Edit from '../../assets/icon/Community/Edit.png'
import Trash from '../../assets/icon/Community/Trash.png'
import { useParams } from 'react-router-dom'
import { UserType } from '../../pages/MyPage/MyPage'
import { useAppSelector } from '../../hooks/reduxHook'

type writtenType = {
  wirtten: boolean
}

export default function CommentMessage({comment, category, creator, CommentsDelete, CommentsEdit}: {comment: commentType, category: string, creator:number, CommentsDelete:(idx: number) => void,  CommentsEdit:(idx: number, data: commentType) => void}) {
  const { User } = useAppSelector(state => state.User)
  const [EditContent, setEditContent] = useState(comment.content)
  const [IsEdit, setIsEdit] = useState(false)
  const params = useParams()

  const CommentDelete = async(idx: number) => {
    if (category === "bestdress"){
      await axios.delete(requests.detailBestDress + params.BestDressId + requests.comment + comment.comment_id)
    } else {
      await axios.delete(requests.detailHelpCodi + params.HelpCodiId + requests.comment + comment.comment_id)
    }
    CommentsDelete(idx)
  }

  const EditMessage = async(idx: number) => {
    const data = {content : EditContent}
    if (category === "bestdress"){
      const res= await axios.put(requests.detailBestDress + params.BestDressId + requests.comment + String(idx), data)
      console.log(res.data)
      CommentsEdit(idx, res.data)
    } else {
      const res = await axios.put(requests.detailHelpCodi + params.HelpCodiId + requests.comment + String(idx), data)
      console.log(res.data)
      CommentsEdit(idx, res.data)
    }
    setIsEdit(false)
    setEditContent('')
  }

  const Codisave = () => {
    axios.put(requests.detailHelpCodi + `${params.HelpCodiId}/` + comment!.cody.cody_id)
  }

  const EnterPress = (e:any, idx: number) => {
    if (e.key === "Enter") {
      EditMessage(idx)
    }
  }

  return (
    <Container wirtten={comment.user.user_id === creator}>
      <MessageContextContainer wirtten={comment.user.user_id === creator}>
        <MessageContainer style={{justifyContent: 'start'}}>
          <Profile Image={comment.user.profile_img} Size={30} id={comment.user.user_id}/>
        </MessageContainer>
        <MessageContainer style={{marginRight: '6px'}}>
          <NickName wirtten={comment.user.user_id === creator}>{comment.user.nickname}</NickName>
          <MessageContextContainer wirtten={comment.user.user_id === creator}>
            {!IsEdit && 
            <MessageContextContainer wirtten={comment.user.user_id === creator}>
              <Message>
                {category === "closet"  && comment?.cody.cody_img? <CodiImg src={comment!.cody.cody_img} alt="코디"/> : null}
                {comment.content}
              </Message>
              <MessageContainer style={{justifyContent: 'flex-end', margin: '0 4px'}}>
                {category === "closet" && comment?.cody.cody_id && creator === User.user_id ? <CodiSave src={codiSave} onClick={Codisave}/> : null}
                <Date>
                  {comment.createAt.slice(11,16)}
                </Date>
              </MessageContainer>
            </MessageContextContainer>}

            {/* 수정 취소 버튼 추가해야됨 */}
            {IsEdit && 
            <MessageContextContainer wirtten={comment.user.user_id === creator} style={{alignItems: 'center', justifyContent: 'space-between'}}>
              <EditMessageInput value={EditContent} onChange={(e: any)=> setEditContent(e.target.value)} onKeyPress={(e:any)=>EnterPress(e, comment.comment_id)}/>
              <Button onClick={()=> EditMessage(comment.comment_id)}>수정</Button>
            </MessageContextContainer>
            }
            
          </MessageContextContainer>
        </MessageContainer>
      </MessageContextContainer>
      {/* 추후 작성한 유저만 수정 삭제 할 수 있도록 */}
      {comment.user.user_id === User.user_id && 
      <MessageContextContainer wirtten={comment.user.user_id === creator}>
        <UpdateImg src={Edit} onClick={()=> setIsEdit(true)}/>
        <UpdateImg src={Trash} onClick={()=> CommentDelete(comment.comment_id)}/>
      </MessageContextContainer>}
    </Container>
  )
}

const Container = styled.div<writtenType>`
  display: flex;
  flex-direction: ${props => props.wirtten ? css`row-reverse` : css`row`};
  margin-bottom: 5px;
  justify-content: space-between;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NickName = styled.p<writtenType>`
  margin: 0;
  font-size: 7px;
  text-align: ${props => props.wirtten ? css`end` : css`start`};
  font-family: var(--base-font-300);
`

const MessageContextContainer = styled.div<writtenType>`
  display: flex;
  flex-direction: ${props => props.wirtten ? css`row-reverse` : css`row`};
  background-color: white;
`

const Message = styled.div`
  display:flex;
  flex-direction: column;
  background-color: var(--primary-color-100);
  border-radius: 10px;
  padding: 3px 7px;
  font-size: 13px;
  font-family: var(--base-font-300);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
`

const EditMessageInput = styled.input`
  width: 70%;
  max-width: 200px;
  height: 20px;
  font-size: 13px;
  border-radius: 10px;
  background-color: var(--primary-color-100);
  padding: 3px 0;
  text-indent: 5px;
  font-family: var(--base-font-300);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
`

const Button = styled.button`
  width: 54px;
  height: 27px;
  padding: 3px;
  border-radius: 10px;
  border: 0;
  font-family: var(--base-font-400);
  font-size: 12px;
  background-color: var(--primary-color-400);
`

const Date = styled.p`
  margin: 0;
  font-size: 5px;
  color: #B5B5B5;
`

const CodiImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`

const CodiSave = styled.img`
  width: 21px;
  height: 21px;
`

const UpdateImg = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 5px;
`