import React from "react";
import styled from "styled-components";
import EmailIcon from "../../assets/icon/User/mail.png";
import PasswordIcon from "../../assets/icon/User/password.png";
import PasswordCheckIcon from "../../assets/icon/User/passwordCheck.png";
import ArrowIcon from "../../assets/icon/Login/arrow.png";
import TopNav from "../../components/ui/TopNav";

export default function Signup() {
  return (
    <SignupDiv>

      <TopNav type={""}>
        <div style={{width: "30px", height: "30px"}}></div>
        <SignupText>회원가입</SignupText>
        <SignupNext src={ArrowIcon}></SignupNext>
      </TopNav>
      {/* <SignupArrowDiv>
        <SignupText>회원가입</SignupText>
        <SignupNext src={ArrowIcon}></SignupNext>
      </SignupArrowDiv> */}
      <SignupLine></SignupLine>
      <SignupEmailDiv>
        <SignupEmailInput placeholder="이메일"></SignupEmailInput>
        <SignupEmailCheck>이메일 인증</SignupEmailCheck>
        <SignupEmailIcon src={EmailIcon}></SignupEmailIcon>
      </SignupEmailDiv>
      <SignupInputDiv>
        <SignupPasswordInput placeholder="비밀번호" />
        <SignupPasswordIcon src={PasswordIcon}></SignupPasswordIcon>
      </SignupInputDiv>

      <SignupInputDiv>
        <SignupPasswordInput placeholder="비밀번호 확인" />
        <SignupPasswordIcon src={PasswordCheckIcon}></SignupPasswordIcon>
      </SignupInputDiv>
    </SignupDiv>
  );
}

//회원가입 Div
const SignupDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SignupLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #000000;
`;

//회원가입 text와 arrow를 담은 div
const SignupArrowDiv = styled.div`
  display : flex;
  flex-direction: row;
  align-items: center;
`;

const SignupText = styled.span`
  font-family: var(--base-font-600);
`;

const SignupNext = styled.img`

`;

//이메일 input, button 담는 div
const SignupEmailDiv = styled.div`
  position: relative;
`;
//이메일 input
const SignupEmailInput = styled.input`
  border: none;
  border-radius: 10px;
  margin-top: 20px;
  margin-right: 15px;
  padding: 5px;
  background-color: #f0f0f0;
  text-indent: 20px;
  font-family: var(--base-font-400);
`;

//이메일 인증 버튼
const SignupEmailCheck = styled.button`
  border: none;
  padding: 5px 7px;
  border-radius: 10px;
  background-color: #cba171;
  color: #ffffff;
  font-family: var(--base-font-300);
`;

//이메일 아이콘
const SignupEmailIcon = styled.img`
  position: absolute;
  top: 26px;
  left: 3px;
`;

//input 담을 div
const SignupInputDiv = styled.div`
  margin-top: 20px;
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
`;

//Password Input
const SignupPasswordInput = styled.input`
  border: none;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 10px;
  text-indent: 20px;
  width: 100%;
  font-family: var(--base-font-400);
`;
const SignupPasswordIcon = styled.img`
  position: absolute;
  left: 7px;
  top: 5px;
`;
