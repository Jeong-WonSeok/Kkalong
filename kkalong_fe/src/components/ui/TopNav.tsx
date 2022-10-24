import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/icon/logo/kkalongLogo.png'

// <TopNav type={'menu'}>상단 네브바에 표시할 정보</TopNav>

// 구조 분해 할당
export default function TopNav({ children, type }: {children: any, type: string}) {
  // 왼쪽 상단에 로고가 있게 하고싶다면 type={'menu'} 를 넣어주세요
  if (type === 'menu') {
    return (
      <TopContainer>
        <LogoImg src={logo}/>
          {children}
        </TopContainer>
    )         
  } else {
    return (
      <TopContainer>
        {children}
      </TopContainer>
    )
  }
}

const TopContainer = styled.div`
    height: 40px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
`

const LogoImg = styled.img`
    width: 54px;
    height: 38px;
`