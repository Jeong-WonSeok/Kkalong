import React from 'react'
import styled from 'styled-components'
import { commentType } from '../../pages/Community/DetailBestDress'
import Profile from './Profile'

export default function CommentMessage({comment}: {comment: commentType}) {
  return (
    <Container>
      <Profile Image={comment.user_id.profile_img} Size={40}/>
      <MessageContainer>
        <NickName>{comment.user_id.nickname}</NickName>
        <MessageContextContainer>
          <Message>{comment.content}</Message>
          <Date>{comment.create_at.slice(11,16)}</Date>
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
  background-color: var(--primary-color-100);
  border-radius: 10px;
  padding: 3px 7px;
  font-size: 13px;
  font-family: var(--base-font-300);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
`

const Date = styled.p`
  margin-top: auto;
  margin-bottom: 0;
  margin-left: 6px;
  font-size: 5px;
  color: #B5B5B5;
`