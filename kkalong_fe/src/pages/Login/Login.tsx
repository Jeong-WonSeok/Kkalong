import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/icon/logo/kkalongLogo.png";
import KakaoLoginLogo from "../../assets/icon/Login/SocialLogin/kakao.png";
import GoogleLoginLogo from "../../assets/icon/Login/SocialLogin/google.png";
import EmailLogo from "../../assets/icon/Login/email.png";
import PasswordLogo from "../../assets/icon/Login/password.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../api/axios";
import requests from "../../api/requests";
import jwtDecode from "jwt-decode";
export default function Login() {
  const LOGIN = "user/LOGIN";
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  // 화면의 상하단 margin 제거
  useEffect(() => {
    const app = document.getElementById("App") as HTMLDivElement;
    app.style.margin = "0";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [alert, setAlert] = useState(false);
  const dispatch = useDispatch();

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onLoginButton = (e: any) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    axios
      .post(
        requests.login,
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-type": `application/json` },
        }
      )
      .then((response) => {
        const token = response.data.result;
        console.log(response.data.result);
        localStorage.setItem("token", JSON.stringify(token.token));
        localStorage.setItem("userProfile", JSON.stringify(token.user));

        navigate("/closet");
        const decode: any = jwtDecode(token);
        const email = decode.email;
        const id = decode.id;

        // dispatch({ type: LOGIN, email: email, id: id });
      })
      .catch((error) => {
        console.log(error);
        setAlert((alert = true));
      });
  };
  return (
    <LoginDiv>
      <LogoImg src={Logo} alt="our service logo"></LogoImg>
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
        ></PasswordInput>
      </LoginInputDiv>
      {alert === false ? null : (
        <LoginAlert>
          {/* <span className={styles.login_alert_text}> */}
          회원정보를 확인해주세요
          {/* </span> */}
        </LoginAlert>
      )}

      <LoginButton onClick={onLoginButton}>로그인</LoginButton>
      <SocialLoginDiv>소셜로그인</SocialLoginDiv>
      <SocialLoginButton>
        <SocialLoginLinkTag>
          <a href="http://k7b302.p.ssafy.io:8080/api/v1/oauth2/authorization/kakao">
            <KakaoLogin src={KakaoLoginLogo}></KakaoLogin>
          </a>
        </SocialLoginLinkTag>
        <SocialLoginLinkTag>
          <a href="http://k7b302.p.ssafy.io:8080/api/v1/oauth2/authorization/google">
            <GoogleLogin src={GoogleLoginLogo}></GoogleLogin>
          </a>
        </SocialLoginLinkTag>
      </SocialLoginButton>
      <RegisterDiv>
        <RegisterSpan>아직 회원이 아니신가요?</RegisterSpan>
        <RegisterLink onClick={handleSignup}>회원가입</RegisterLink>
      </RegisterDiv>
    </LoginDiv>
  );
}

//전체 div
const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--base-font-300);
  height: 100vh;
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
  text-indent: 20px;

  border-radius: 10px;
`;

//패스워드 입력
const PasswordInput = styled.input`
  margin: 3px;
  border: none;
  background-color: #f0f0f0;
  font-family: var(--base-font-300);
  width: 100%;
  height: 30px;
  text-indent: 20px;
  border-radius: 10px;
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

//------소셜로그인-------
const SocialLoginDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 90vw;
  max-width: 324px;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  margin: 40px 0px 10px;
  &::before {
    content: "";
    flex: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 8px 16px;
  }

  &::after {
    content: "";
    flex: 1;

    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 8px 16px;
  }
`;

const SocialLoginButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

// 소셜로그인 버튼 태그
const SocialLoginLinkTag = styled.a``;

// 카카오로그인
const KakaoLogin = styled.img`
  margin: 0px 10px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 15%;
`;

// 구글로그인
const GoogleLogin = styled.img`
  margin: 0px 10px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 15%;
`;
// 회원가입 관련 div
const RegisterDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
`;

// 아직 회원이 아니신가요?
const RegisterSpan = styled.div`
  margin: 0px 5px;
  color: #b9b9b9;
`;

// 회원가입으로 가는 링크
const RegisterLink = styled.a`
  margin: 0px 5px;
  text-decoration: underline;
`;

//회원 정보가 잘 못 된 경우
const LoginAlert = styled.p`
  display: flex;
  visibility: hidden;
`;

// .log_alert_view {
//   display: flex;
// }
