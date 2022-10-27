import React from "react";
import styled from "styled-components";
import logo from "../../assets/icon/logo/kkalongLogo.png";

// <TopNav type={'menu'}>상단 네브바에 표시할 정보</TopNav>

// 구조 분해 할당
export default function TopNav({
  children,
  type,
}: {
  children: any;
  type: string;
}) {
  // 왼쪽 상단에 로고가 있게 하고싶다면 type={'menu'} 를 넣어주세요
  if (type === "menu") {
    return (
      <TopContainer>
        <InnerContainer>
          <LogoImg src={logo} />
          {children}
        </InnerContainer>
      </TopContainer>
    );
  } else {
    return (
      <TopContainer>
        <InnerContainer>{children}</InnerContainer>
      </TopContainer>
    );
  }
}

const TopContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 45px;
  padding-top: 5px;
  position: fixed;
  left: auto;
  top: 0;
  font-family: var(--base-font-400);
  font-size: 20px;
  background-color: white;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  padding: 0 10px;
`;

const LogoImg = styled.img`
  width: 54px;
  height: 38px;
`;
