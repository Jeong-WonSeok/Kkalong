import React from 'react'
import styled from 'styled-components';
import Logo from '../../assets/icon/logo/kkalongLogo.png';
import KakaoLoginLogo from '../../assets/icon/Login/SocialLogin/kakao.png';
import GoogleLoginLogo from '../../assets/icon/Login/SocialLogin/google.png';
import EmailLogo from '../../assets/icon/Login/email.png';
import PasswordLogo from '../../assets/icon/Login/password.png';


export default function index() {
  return (
    <LoginDiv>
      <LogoImg src={Logo} alt="our service logo" ></LogoImg>
        <LoginInputDiv>
          <LoginInputImg src={EmailLogo}/>
          <EmailInput placeholder='이메일' type="email" ></EmailInput>
        </LoginInputDiv>
        <LoginInputDiv>
          <LoginInputImg src={PasswordLogo}/>
          <PasswordInput placeholder='비밀번호' type="password" ></PasswordInput>
        </LoginInputDiv>
        <LoginButton>로그인</LoginButton>
        <SocialLoginDiv>소셜로그인</SocialLoginDiv>
        <SocialLoginButton>
          <SocialLoginLinkTag>
            <KakaoLogin src={KakaoLoginLogo}></KakaoLogin>
          </SocialLoginLinkTag>
          <SocialLoginLinkTag>
            <GoogleLogin src={GoogleLoginLogo}></GoogleLogin>        
          </SocialLoginLinkTag>
        </SocialLoginButton>
        <RegisterDiv>
          <RegisterSpan>아직 회원이 아니신가요?</RegisterSpan>
          <RegisterLink>회원가입</RegisterLink>
                   
        </RegisterDiv>
    </LoginDiv>
  )
}

//전체 div
const LoginDiv = styled.div`

  display: flex;
  flex-direction : column;
  align-items : center;
  font-family: var(--base-font-300);
  height : 100vh;
`

//로고이미지
const LogoImg = styled.img`
  padding-top: 15%;
  padding-bottom : 15%;
  width:70px;
  height:70px;
  
`

//로그인 input을 담는 div
const LoginInputDiv = styled.div`
  width : 70%;
  position: relative;

`
const LoginInputImg = styled.img`
  position : absolute;
  top:10px;
  left:5px;
`


//이메일 입력
const EmailInput = styled.input`
  margin : 3px;
  border : none;
  background-color: #F0F0F0;
  font-family: var(--base-font-300);
  width: 100%;
  height: 30px;
  text-indent : 20px;

  border-radius : 10px;
`

//패스워드 입력
const PasswordInput = styled.input`
  margin :3px;
  border : none;
  background-color: #F0F0F0;
  font-family: var(--base-font-300);
  width: 100%;
  height: 30px;
  text-indent : 20px;
  border-radius : 10px;
  

`
//로그인 버튼
const LoginButton = styled.button`
margin : 10px;
  font-family: var(--base-font-300);
  font-size : 15px;
  color : white;
  border : none;
  background-color: #CBA171;
  width : 70%; 
  height: 40px;
  border-radius:30px;
  margin-top: 5%;
  &:hover {
    background-color:#67564E ;
  }
`


//------소셜로그인-------
const SocialLoginDiv = styled.div`
  display: flex;
  flex-direction: row;
  width:90vw;

  color : rgba(0, 0, 0, 0.35);
  font-size : 12px;
  margin : 40px 0px 10px;

  
  &::before {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size :0px;
    line-height: 0px;
    margin : 8px 16px;
  };
  
  &::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size :0px;
    line-height: 0px;
    margin : 8px 16px;
  };
  `

const SocialLoginButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-top : 30px;
`

// 소셜로그인 버튼 태그
const SocialLoginLinkTag = styled.a`
  
`

// 카카오로그인
const KakaoLogin = styled.img`
  margin : 0px 10px;
  padding : 10px;
  border : 1px solid #D9D9D9;
  border-radius: 15%;
`

// 구글로그인
const GoogleLogin = styled.img`
  margin : 0px 10px;
  padding : 10px;
  border : 1px solid #D9D9D9;
  border-radius: 15%;

`
// 회원가입 관련 div
const RegisterDiv = styled.div`
  display: flex;
  flex-direction : row;
  margin-top : 50px;
`

// 아직 회원이 아니신가요?
const RegisterSpan = styled.div`
  margin: 0px 5px;
  color : #B9B9B9;
  
`

// 회원가입으로 가는 링크
const RegisterLink = styled.a`
  margin: 0px 5px;
  text-decoration: underline;
`