import React from 'react'
import styled from 'styled-components'
import EmailIcon from '../../assets/icon/User/mail.png'
import AgeIcon from '../../assets/icon/User/age.png'
import HeightIcon from '../../assets/icon/User/height.png'
import WeightIcon from '../../assets/icon/User/weight.png'


export default function SignupNext() {
  return (
    <SignupDiv>
      <SignupText>회원가입</SignupText>
      <SignupLine></SignupLine>
      <SignupNicknameDiv>
        <SignupNicknameInput placeholder='닉네임'></SignupNicknameInput>
        <SignupNicknameCheck>중복확인</SignupNicknameCheck>
        <SignupNicknameIcon src={EmailIcon}></SignupNicknameIcon>
      </SignupNicknameDiv>
      <SignupInputDiv>
        <SignupAgeInput placeholder='나이'/>
        <SignupAgeIcon src={AgeIcon}></SignupAgeIcon>
      </SignupInputDiv>
      <SignupInputDiv>
        <SignupBodyInfoInput placeholder='키'></SignupBodyInfoInput>
        <SignupHeightIcon src={HeightIcon}></SignupHeightIcon>
        <SignupBodyInfoInput placeholder='몸무게'></SignupBodyInfoInput>
        <SignupWeightIcon src={WeightIcon}></SignupWeightIcon>

      </SignupInputDiv>



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

//닉네임 input, button 담는 div
const SignupNicknameDiv = styled.div`
  position : relative;
`
//이메일 input
const SignupNicknameInput = styled.input`
  border:none;
  border-radius: 10px;
  margin-top : 20px;
  margin-right: 15px;
  padding : 5px;
  background-color: #F0F0F0;
  text-indent: 20px;
  font-family: var(--base-font-400);
`

//닉네임 중복 확인 버튼
const SignupNicknameCheck = styled.button`
  border : none;
  padding : 5px 7px;
  border-radius: 10px;
  background-color: #CBA171;
  color : #FFFFFF;
  font-family: var(--base-font-300);
 
`

//닉네임 아이콘
const SignupNicknameIcon = styled.img`
  position : absolute;
  top : 26px;
  left : 3px;
`

//input 담을 div
const SignupInputDiv = styled.div`
  margin-top : 20px;
  width : 67%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position : relative;
  
`

//age Input
const SignupAgeInput = styled.input`
  border : none;
  background-color: #F0F0F0;
  padding : 5px;
  border-radius : 10px;
  text-indent : 22px;
  width : 100%;
  font-family: var(--base-font-400)
`

 const SignupAgeIcon = styled.img`
  position : absolute;
  left : 7px;
  top : 5px;
 `

 //Body Info Input
const SignupBodyInfoInput = styled.input`
  width:44%;
  border : none;
  border-radius: 7px;
  background-color: #F0F0F0;
  padding : 5px;
  text-indent : 22px;
  
`

const SignupHeightIcon = styled.img`
  position : absolute;
  left : 7px;
  top : 4px;
 `

 
const SignupWeightIcon = styled.img`
  position : absolute;
  right : 100px;
  top : 4px;
 `