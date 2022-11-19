import React, { useEffect } from 'react'
import styled from 'styled-components'
import FooterBar from '../../components/ui/FooterBar'
import Personal from '../../assets/icon/Recommand/PersonalColor.png'

export default function PersonalColor() {
  useEffect(()=>{
    const app = document.getElementById('App') as HTMLDivElement
    app.style.marginTop = '0'

    return () => {
      app.style.marginTop = ''
    }
  },[])
  return (
    <Gradation>
      <MainText>퍼스널 컬러 <br/> 코디추천</MainText>
      <MainImg src={Personal}/>
      <FooterBar/>
    </Gradation>
  )
}

const Gradation = styled.div`
  background: linear-gradient(180deg, var(--primary-color-500) 0%, rgba(74, 231, 253, 0) 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const MainText = styled.p`
  margin: 0;
  line-height: 30px;
  font-size: 1.2rem;
  font-family: var(--base-font-400);
  text-align: center;
`

const MainImg = styled.img`
  width: 60%;
`