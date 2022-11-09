import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import TopNav from '../../components/ui/TopNav'
import { BackArrow, CategoryText } from './MainBestDress'
import FooterBar from '../../components/ui/FooterBar'

import BackArrowImg from '../../assets/icon/Nav/BackArrow.png'
import AddCodiExample from '../../assets/icon/Community/AddCodiExample.jpg'
import AddCodi from '../../assets/icon/Community/addCodi.png'
import AddCloset from '../../assets/icon/Community/addCloset.png'



export default function AddSelectHelpCodi() {
  const navigate = useNavigate()
  return (
    <div>
      <TopNav type={''}>
        <BackArrow src={BackArrowImg} onClick={()=>navigate('/community/HelpCodi')}/>
        <CategoryText>도와주세요 패알못😂</CategoryText>
        <div style={{ width: '30px', height: '30px'}}></div>
      </TopNav>

    <Container>
      <div>
      <CodiBackground onClick={()=>{navigate('/community/HelpCodi/Add/Codi')}}>
        <SelectContainer>
          <ImgContainer>
            <SelectImg src={AddCodi}/>
            <SelectSpan>코디 추가</SelectSpan>
          </ImgContainer>
        </SelectContainer>
      </CodiBackground>
      <SelectSpan style={{color: 'black', fontFamily: 'var(--base-font-500)'}}>코디 피드백</SelectSpan>
      </div>
      <div>
      <SelectContainer onClick={()=>{navigate('/community/HelpCodi/Add/Closet')}}>
        <ImgContainer>
          <SelectImg src={AddCloset}/>
          <SelectSpan>옷장 공개하기</SelectSpan>
        </ImgContainer>
      </SelectContainer>
      <SelectSpan style={{color: 'black', fontFamily: 'var(--base-font-500)'}}>코디 추천</SelectSpan>
      </div>
    </Container>

    <FooterBar/>
    </div>
  )
}

const Container = styled.div`
  padding: 20px;
  height: 70vh;
  margin: auto 0;
  overflow: hidden;
  touch-action: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const CodiBackground = styled.div`
  background-image: url(${AddCodiExample});
  position: relative;
  width: 140px;
  height: 210px;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  z-index: 1;
`

export const SelectContainer = styled.div`
  width: 140px;
  height: 210px;
  border-radius: 10px;
  background: rgba(56, 56, 56, 0.74);
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
` 

export const SelectImg = styled.img`
  margin: 0 auto;
  width: 40px;
  height: 40px;
`

export const SelectSpan = styled.p`
  font-size: 15px;
  font-family: var(--font-base-400);
  color: var(--primary-color-300);
  margin-top: 20px;
  text-align: center;
`