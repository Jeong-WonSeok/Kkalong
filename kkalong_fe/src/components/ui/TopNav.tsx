import React from "react";
import styled from "styled-components";
import logo from "../../assets/icon/logo/kkalongLogo.png";

// <TopNav type={'menu'}>상단 네브바에 표시할 정보</TopNav>
type styledprops = {
  type: string
}

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
      <TopContainer type={type}>
        <InnerContainer>
          <LogoImg src={logo} />
          {children}
        </InnerContainer>
      </TopContainer>
    );
  } else {
    return (
      <TopContainer type={type}>
        <InnerContainer>{children}</InnerContainer>
      </TopContainer>
    );
  }
}

const TopContainer = styled.div<styledprops>`
  width: 100%;
  max-width: 360px;
  height: 45px;
  padding-top: 5px;
  position: fixed;
  left: auto;
  top: 0;
  font-family: var(--base-font-400);
  font-size: 20px;
  background-color: white;
  border-bottom: ${props => props.type === "Line" ? "1px solid black" : ""};
  z-index: 9999;
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
