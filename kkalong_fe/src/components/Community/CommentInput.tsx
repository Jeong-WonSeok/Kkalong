import { request } from 'http'
import { useState } from 'react'
import styled from 'styled-components'
import axios from '../../api/axios'
import requests from '../../api/requests'
import { useAppSelector } from '../../hooks/reduxHook'
import { commentType } from '../../pages/Community/DetailHelpCodi'

export default function CommentInput({article_id, category, CommentsInput} :{article_id: number, category:string, CommentsInput: (data: commentType) => void}) {
  const [Message, setMessage] = useState('')
  const [CodiImg, setCodiImg] = useState(null as null | number)
  const { cody } = useAppSelector(state=>state.CodyComment)

  const SendMessage = async () => {
    if (!Message) {
      return
    }
    // axios 요청 보내기
    if (category === "closet" || category === "cody") {
      const data = {
        content: Message,
        codi_id: cody.cody_id
      }
      const res = await axios.post(requests.detailHelpCodi + article_id + requests.comment , data)
      console.log(res.data)
      CommentsInput(res.data)
    } else {
      const data = {content: Message}
      const res = await axios.post(requests.detailBestDress + article_id + requests.comment, data)
      console.log(res.data)
      CommentsInput(res.data)
    }
    setMessage('')
  }

  const EnterInput = (e:any) => {
    if (e.key === 'Enter') {
      SendMessage()
    }
  }

  return (
    <ColumnContainer>
      {/* 코디가 있을 때만 보임 */}
      {cody && <div>
        <CodyImg src={cody.cody_img}/>
      </div>}
      <Container>
        <Input placeholder='댓글을 입력해주세요' value={Message} onChange={(e: any) => setMessage(e.target.value)} onKeyPress={EnterInput}/>
        <Button onClick={SendMessage}>작성</Button>
      </Container>  
    </ColumnContainer>

  )
}

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

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

const CodyImg = styled.img`
  width: 50px;
  height: 50px;
`