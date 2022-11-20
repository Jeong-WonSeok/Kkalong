import React, { useState, useEffect } from 'react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled, { keyframes } from 'styled-components';

export default function WeatherText({message} : {message:String[]}) {
  const [idx, setIdx] = useState(0)
  const total = message.length

  useEffect(()=>{
    setTimeout(()=>{
      setIdx((idx + 1) % total)
    }, 3000)
  },[idx])
  return (
    <Container>
        <TextContainer>
          <TextP>{message[idx]}</TextP>
        </TextContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const TextContainer = styled.div`
  width: 200px !important;
  padding: 5px 10px;
  height: 20px;
  background-color: var(--primary-color-100);
  border-radius: 30px;
`

const titleAnimation = keyframes`
  0% {
    color: var(--primary-color-100);
    transform: translateY(-10px);
    opacity: 0;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  }
  20% {
      color: var(--primary-color-900);
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  80% {
      color: var(--primary-color-900);
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  100% {
      color: var(--primary-color-100);
      transform: translateY(10px);
      opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
      clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
  };
`

const TextP = styled.p`
  font-family: var(--base-font-400);
  font-size: 14px;
  margin: 0 0 0 10px;
  animation: ${titleAnimation} 3.01s 3.01s infinite;
`
