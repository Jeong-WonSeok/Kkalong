import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import Kkalong from '../assets/icon/logo/KkalongStart.png'
import SunGlasses from '../assets/icon/logo/SunGlasses.png'

export default function StartPage() {
  const navigate = useNavigate()
  useEffect(()=>{
    const app = document.getElementById('App') as HTMLDivElement
    app.style.margin = '0'
    setTimeout(()=>{
      navigate('/login')
    }, 3500)

    return () => {
      app.style.marginTop = '60px'
    }
  }, [])

  return (
    <Container>
      <ImgDiv>
        <KkalongImg src={Kkalong}/>
        <SunGlassesImg src={SunGlasses} />
      </ImgDiv>
    </Container>
  )
}

const EnterLogo = keyframes`
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
`

const SunGlassPoint = keyframes`
  0%,
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  10%,
  30%,
  50%,
  70% {
    -webkit-transform: translateY(-2px);
            transform: translateY(-2px);
  }
  20%,
  40%,
  60% {
    -webkit-transform: translateY(2px);
            transform: translateY(2px);
  }
  80% {
    -webkit-transform: translateY(1.6px);
            transform: translateY(1.6px);
  }
  90% {
    -webkit-transform: translateY(-1.6px);
            transform: translateY(-1.6px);
  }
`

const Container = styled.div`
  position: fixed;
  left: auto;
  top: 0;
  width: 100%;
  max-width: 360px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${EnterLogo} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`

const KkalongImg = styled.img`
  width: 200px; 
`

const SunGlassesImg = styled.img`
  position: absolute;
  left: -5px;
  top: 30px;
  width: 60px;
  animation: ${SunGlassPoint} 1.2s cubic-bezier(0.455, 0.030, 0.515, 0.955) 1.5s both;
`

const ImgDiv = styled.div`
  position: relative
`