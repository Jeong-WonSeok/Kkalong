import React from 'react'
import styled from 'styled-components'
import { commentType } from '../../pages/Community/DetailHelpCodi'
import Profile from './Profile'
import codiSave from '../../assets/icon/Community/codiSave.png'

export default function CommentMessage({comment}: {comment: commentType}) {
  return (
    <Container>
      <Profile Image={comment.user_id.profile_img} Size={40}/>
      <MessageContainer>
        <NickName>{comment.user_id.nickname}</NickName>
        <MessageContextContainer>
          <Message>
            {comment.codi_img ? <CodiImg src={comment.codi_img}/> : null}
            {comment.content}
          </Message>
          <MessageContainer style={{justifyContent: 'flex-end', marginLeft: '4px'}}>
            {comment.codi_img ? <CodiSave src={codiSave}/> : null}
            <Date>
              {comment.create_at.slice(11,16)}
            </Date>
          </MessageContainer>
        </MessageContextContainer>
      </MessageContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NickName = styled.p`
  margin: 0;
  font-size: 7px;
  font-family: var(--base-font-300);
`

const MessageContextContainer = styled.div`
  display: flex;
  flex-direction: row;
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