import { request } from 'http'
import { useState } from 'react'
import styled from 'styled-components'
import axios from '../../api/axios'
import requests from '../../api/requests'
import { commentType } from '../../pages/Community/DetailHelpCodi'

export default function CommentInput({article_id, category, CommentsInput} :{article_id: number, category:string, CommentsInput: (data: commentType) => void}) {
  const [Message, setMessage] = useState('')
  const [CodiImg, setCodiImg] = useState(null as null | number)

  const SendMessage = async () => {
    // axios 요청 보내기
    if (category === "closet" || category == "cody") {
      const data = {
        content: Message,
        codi_id: CodiImg
      }
      const res = await axios.post(requests.detailHelpCodi + article_id + requests.comment , data)
      CommentsInput(res.data)
    } else {
      const data = {content: Message}
      const res = await axios.post(requests.detailBestDress + article_id + requests.comment, data)
      CommentsInput(res.data)
    }
    setMessage('')
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
  height: 30px;
  background-color: white;
  display: flex;
  flex-direction: row;
  position: fixed;
  left: auto;
  bottom: 70px;
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