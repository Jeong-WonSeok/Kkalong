import { useState } from 'react'
import styled from 'styled-components'

export default function CommentInput() {
  const [Message, setMessage] = useState('')

  const SendMessage = () => {
    // axios 요청 보내기
  }

  return (
    <Container>
      <Input placeholder='댓글을 입력해주세요' value={Message} onChange={(e: any) => setMessage(e.target.value)}/>
      <Button onClick={SendMessage}>작성</Button>
    </Container>  
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 75px;
  margin: 0 auto;
  font-family: var(--base-font-400);
`

const Input = styled.input`
  width: 65%;
  height: 24px;
  border: 0px;
  background-color: var(--primary-color-100);
  border-radius: 10px;
  padding: 0 10px;
  margin-right: 10px;
`

const Button = styled.button`
  width: 54px;
  height: 24px;
  border-radius: 10px;
  border: 0;
  font-family: var(--base-font-400);
  font-size: 12px;
  background-color: var(--primary-color-400);
`