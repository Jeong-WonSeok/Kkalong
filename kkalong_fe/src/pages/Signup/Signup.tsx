import React from 'react'
import styled from 'styled-components'

export default function index() {
  return (
    <SignupDiv>
      <SignupText>회원가입</SignupText>
      <SignupLine></SignupLine>
    </SignupDiv>   
  )
}

//회원가입 Div
const SignupDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SignupLine = styled.hr`
  width:100%;
  height: 1px;
  background-color: #000000;
`

const SignupText = styled.span`
  font-family: var(--base-font-600);
  
`