import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import requests from '../../api/requests'

export default function Modal(props: any) {
  const navigate = useNavigate()
  // 삭제 axios 요청 보낼 예정
  const Delete = async () => {
    if (props.Page === "BestDress") {
      const res = await axios.delete(requests.detailBestDress + props.Id)
      console.log(res.data)
      navigate('/community/BestDress')
      
    } else {
      await axios.delete(requests.detailHelpCodi + props.Id)
      navigate('/community/HelpCodi')
    }
  }

  return (
    <Container>
      <ModalDiv>
        <ContentDiv>
          <ContentP>
            정말 삭제하시겠습니까?
          </ContentP>
        </ContentDiv>

        <LineDiv></LineDiv>

        <ButtonContainer>
          <ButtonDiv onClick={props.CloseModal} style={{borderRight: '1px solid var(--primary-color-750)'}}>
            <ButtonP>
              아니요
            </ButtonP>
          </ButtonDiv>
          <ButtonDiv onClick={Delete}>
            <ButtonP style={{color: 'red'}}>
              삭제
            </ButtonP>
          </ButtonDiv>
        </ButtonContainer>
      </ModalDiv>
    </Container>
  )
}


const Container = styled.div`
  position: fixed;
  left: auto;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 360px;
  height: 100vh;
  z-index: 10;
`

const ModalDiv = styled.div`
  z-index: 10;
  width: 200px;
  height: 120px;
  border-radius: 15px;
  background-color: white;
  border: 3px solid var(--primary-color-750);
`

const ContentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
`

const ContentP = styled.p`
  margin: 0;
  font-family: var(--base-font-400);
  font-size: 18px;
`
const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--primary-color-750);
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
`

const ButtonDiv = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;  
`

const ButtonP = styled.p`
  margin: 0;
  font-family: var(--base-font-300);
  font-size: 16px;
`