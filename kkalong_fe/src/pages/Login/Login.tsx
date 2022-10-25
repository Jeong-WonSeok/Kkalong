import React from 'react'
import styled from 'styled-components';
import Logo from '../../assets/icon/logo/kkalongLogo.png';


export default function index() {
  return (
    <LoginDiv>
      <LogoImg src={Logo} alt="our service logo" ></LogoImg>
        <EmailInput placeholder='이메일'></EmailInput>
        <PasswordInput placeholder='비밀번호'></PasswordInput>
        <LoginButton>로그인</LoginButton>
        <SocialLoginDiv>소셜로그인
        </SocialLoginDiv>
    </LoginDiv>
  )
}


const LoginDiv = styled.div`

  display: flex;
  flex-direction : column;
  align-items : center;
  font-family: var(--base-font-300);
  border: 10px solid red;
  height : 100vh;
`

const LogoImg = styled.img`
  width:70px;
  height:70px;
  
  
`

const EmailInput = styled.input`
  margin : 3px;
  border : none;
  background-color: #F0F0F0;
  font-family: var(--base-font-300);
  width: 70%;
  height: 25px;
  border-radius : 10px;
`

const PasswordInput = styled.input`
  margin : 3px;
  border : none;
  background-color: #F0F0F0;
  font-family: var(--base-font-300);
  width: 70%;
  height: 25px;
  border-radius : 10px;
  

`

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

`


const SocialLoginDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  align-items: center;
  color : rgba(0, 0, 0, 0.35);
  font-size : 12px;
  margin : 8px 0px;
  &::before {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size :0px;
    line-height: 0px;
    margin : 0px 16px;
  };
  
  &::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size :0px;
    line-height: 0px;
    margin : 0px 16px;
  };
  `


