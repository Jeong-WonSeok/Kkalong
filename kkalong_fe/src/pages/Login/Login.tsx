import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../api/axios";
import requests from "../../api/requests";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Logo from "../../assets/icon/logo/kkalongLogo.png";
import EmailLogo from "../../assets/icon/Login/email.png";
import PasswordLogo from "../../assets/icon/Login/password.png";
import BackArrow from "../../assets/icon/Nav/BackArrow.png";

import TopNav from "../../components/ui/TopNav";
import { BackArrowImg, SignupText } from "../Signup/Signup";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { login } from "../../redux/modules/User";

export default function Login() {
  const LOGIN = "user/LOGIN";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, User } = useAppSelector((state) => state.User);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [alert, setAlert] = useState(false);

  // 화면의 상하단 margin 제거
  useEffect(() => {
    const app = document.getElementById("App") as HTMLDivElement;
    app.style.margin = "0";

    return () => {
      app.style.margin = "60px 0 70px 0";
    };
  }, []);

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onLoginButton = async (e: any) => {
    e.preventDefault();

    await dispatch(login(email, password));
    if (error) {
      setAlert(true);
    } else {
      navigate("/threetest");
    }
  };

  const EnterInput = (e: any) => {
    if (e.key === "Enter") {
      onLoginButton(e);
    }
  };

  return (
    <div>
      <TopNav type={"Line"}>
        <BackArrowImg src={BackArrow} onClick={() => navigate("/")} />
        <SignupText>로그인</SignupText>
        <div style={{ width: "30px", height: "30px" }}></div>
      </TopNav>

      <LoginDiv>
        {/* <LogoImg src={Logo} alt="our service logo"></LogoImg> */}
        <LoginInputDiv>
          <LoginInputImg src={EmailLogo} />
          <EmailInput
            placeholder="이메일"
            type="email"
            onChange={onChangeEmail}
          ></EmailInput>
        </LoginInputDiv>
        <LoginInputDiv>
          <LoginInputImg src={PasswordLogo} />
          <PasswordInput
            placeholder="비밀번호"
            type="password"
            onChange={onChangePassword}
            onKeyPress={EnterInput}
          ></PasswordInput>
        </LoginInputDiv>
        {alert === false ? null : (
          <LoginAlert>
            <LoginAlertText>회원정보를 확인해주세요</LoginAlertText>
          </LoginAlert>
        )}

        <LoginButton onClick={onLoginButton}>로그인</LoginButton>
      </LoginDiv>
    </div>
  );
}

//전체 div
const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--base-font-300);
  min-height: 600px;
  margin-top: 40%;
`;

//로고이미지
const LogoImg = styled.img`
  padding-top: 15%;
  padding-bottom: 15%;

  width: 107px;
  height: 82px;
`;

//로그인 input을 담는 div
const LoginInputDiv = styled.div`
  width: 70%;
  max-width: 260px;
  display: flex;
  flex-direction: row;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 0 6px;
  margin-bottom: 10px;
`;

const LoginInputImg = styled.img`
  width: 20px;
  height: 20px;
  margin: auto 0;
  position: relative;
`;

//이메일 입력
const EmailInput = styled.input`
  margin: 3px;
  border: none;
  background-color: #f0f0f0;
  font-family: var(--base-font-300);
  width: 100%;
  height: 30px;
  text-indent: 10px;
  border-radius: 10px;
  &:active,
  &:focus {
    outline: none;
  }
`;

//패스워드 입력
const PasswordInput = styled.input`
  margin: 3px;
  border: none;
  background-color: #f0f0f0;
  font-family: var(--base-font-300);
  width: 100%;
  height: 30px;
  text-indent: 10px;
  border-radius: 10px;
  &:active,
  &:focus {
    outline: none;
  }
`;
//로그인 버튼
const LoginButton = styled.button`
  margin: 10px;
  font-family: var(--base-font-300);
  font-size: 15px;
  color: white;
  border: none;
  background-color: #cba171;
  width: 70%;
  height: 40px;
  border-radius: 30px;
  margin-top: 5%;
  &:hover {
    background-color: #67564e;
  }
`;

//회원 정보가 잘 못 된 경우
const LoginAlertText = styled.p`
  color: red;
  font-size: 13px;
`;

const LoginAlert = styled.div`
  display: flex;
`;
