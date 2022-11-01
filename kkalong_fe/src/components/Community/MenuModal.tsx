import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'

import Edit from '../../assets/icon/Community/Edit.png'
import Trash from '../../assets/icon/Community/Trash.png'
import Modal from './Modal'

// page는 Cody인지, Best인지 확인하는 여부
// Id 는 수정할 떄 데이터를 넘겨주기 위한 인자
export default function MenuModal(props: any) {
  const navigate = useNavigate()
  const EditPage = () => {
    if (props.Page === "BestDress") {
      navigate(`/community/BestDress/Add/${props.Id}`)
    } else {
      navigate(`/community/HelpCodi/Add/${props.Category}/${props.Id}`)
    }
  }


  return (
    <Container onClick={props.closeModal}>
      <ModalContainer>
        <ButtonContainer onClick={EditPage}>
          <IconImg src={Edit}/>
          <ModalP>수정</ModalP>
        </ButtonContainer>

        <LineDiv></LineDiv>

        <ButtonContainer onClick={props.openModal}>
          <IconImg src={Trash}/>
          <ModalP>삭제</ModalP>
        </ButtonContainer>
      </ModalContainer>
    </Container>
  )
}

const MenuAnimation = keyframes`
  0% {
    -webkit-transform: translateY(-30px);
            transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`

const Container = styled.div`
  position: fixed;
  width:100%;
  height: 100%;
  max-width: 360px;
  left: auto;
  top: 0px;
  animation: ${MenuAnimation} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
` 

const ModalContainer = styled.div`
  z-index: 5;
  position: absolute;
  right: 10px;
  top: 50px;
  width: 100px;
  height: 101px;
  border-radius: 10px;
  border: 1px solid var(--primary-color-500);
  background-color: white;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 50px;
`

const ModalP = styled.p`
  width: 40px;
  font-family: var(--base-font-400);
  font-size: 16px;
  margin: 0;
`

const IconImg = styled.img`
  width: 25px;
  height: 25px;
`

const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--primary-color-500);
`