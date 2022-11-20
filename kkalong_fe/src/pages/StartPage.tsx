import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import KakaoBtn from "../assets/icon/Login/SocialLogin/kakaoBtn.png"
import GoogleBtn from "../assets/icon/Login/SocialLogin/googleBtn.png"

export default function StartPage() {
  const navigate = useNavigate()
  const KeyWord = ['나만의 옷장', 'AI', '퍼스널 컬러', '가상피팅']
  const [idx, setIdx] = useState(0)
  useEffect(()=>{
    const app = document.getElementById('App') as HTMLDivElement
    app.style.margin = '0'
    
    return () => {
      app.style.margin = '60px 0 70px 0'
    }
  }, [])

  useEffect(()=>{
    setTimeout(()=>{
      setIdx((idx + 1) % 4)
    }, 1300)
  }, [idx])

  return (
    <Container>
      <ImgDiv>
        <ContentP><PointColor>깔롱</PointColor>은</ContentP>
        <ContentP># <ChangeP> {KeyWord[idx]}</ChangeP></ContentP> 
      </ImgDiv>

      <LoginContainer>
        <SocialLoginButton>
          <SocialLoginLinkTag>
            <a href="http://k7b302.p.ssafy.io:8080/api/v1/oauth2/authorization/kakao">
              <SocialImg style={{padding: '0 5px', width: '290px'}} src={KakaoBtn}/>
            </a>
          </SocialLoginLinkTag>
          <SocialLoginLinkTag>
            <a href="http://k7b302.p.ssafy.io:8080/api/v1/oauth2/authorization/google">
              <SocialImg src={GoogleBtn}/>
            </a>
          </SocialLoginLinkTag>
        </SocialLoginButton>
        <RegisterDiv>
          <RegisterLink onClick={()=>navigate("/signup")}>회원가입</RegisterLink>
          <RegisterLink onClick={()=>navigate("/login")}>로그인</RegisterLink>
        </RegisterDiv>
      </LoginContainer>
    </Container>
  )
}

const Container = styled.div`
  max-width: 360px;
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin-top: 15px;
`

const ContentP = styled.p`
  font-family: var(--main-font-100);
  font-size: 1.6rem;
  margin: 0;
  margin-bottom: 5px;
`

const PointColor = styled.span`
  color: var(--primary-color-700)
`

const titleAnimation = keyframes`
  0% {
    color: var(--primary-color-100);
    transform: translateY(-50px);
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
      transform: translateY(50px);
      opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
      clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
  };
`

const ChangeP = styled(ContentP)`
  display: inline-block;
  color: var(--primary-color-900);
  line-height: 2;
  animation: ${titleAnimation} 1.31s 1.3s infinite;
` 

const LoginContainer = styled.div`
  position: absolute;
  bottom: 30px;
`

const SocialLoginButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 300px;
`;

// 소셜로그인 버튼 태그
const SocialLoginLinkTag = styled.a``;

const SocialImg = styled.img`
  width: 300px;
`
// 회원가입 관련 div
const RegisterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  margin-top: 20px;
`

// 회원가입으로 가는 링크
const RegisterLink = styled.a`
  margin: 0px 5px;
  font-size: 1rem;
  font-family: var(--base-font-300);
  text-decoration: none;
`;