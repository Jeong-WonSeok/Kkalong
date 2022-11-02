import React from "react";
import styled from "styled-components";
import AgeIcon from '../../assets/icon/User/age.png'
import HeightIcon from '../../assets/icon/User/height.png'
import WeightIcon from '../../assets/icon/User/weight.png'
import NicknameIcon from '../../assets/icon/User/nickname.png'
import FooterBar from "../../components/ui/FooterBar";
import backArrow from '../../assets/icon/Nav/BackArrow.png';
import TopNav from "../../components/ui/TopNav";
import { useNavigate } from "react-router-dom";

export default function MyPageUpdate() {

  const navigate = useNavigate();

  return (
    <SignupDiv>
      <TopNav type={""}>
        <img src={backArrow} style={{width:"30px", height:"30px"}} onClick={()=>navigate(-1)}></img>
        <SignupText>회원가입</SignupText>
        <div style={{width:"30px", height:"30px"}}></div>

      </TopNav>
      <SignupInputText>닉네임</SignupInputText>
      <SignupNicknameDiv>
        <SignupNicknameInput ></SignupNicknameInput>
        <SignupNicknameCheck>중복확인</SignupNicknameCheck>
        <SignupNicknameIcon src={NicknameIcon}></SignupNicknameIcon>
      </SignupNicknameDiv>
      <SignupInputText>나이</SignupInputText>
      <SignupInputDiv>
        <SignupAgeInput />
        <SignupAgeIcon src={AgeIcon}></SignupAgeIcon>
      </SignupInputDiv>
      <HeightWeightDiv>
        <SignupInputText>키</SignupInputText>
        <SignupInputText>몸무게</SignupInputText>
      </HeightWeightDiv>
      <SignupInputDiv>
        <SignupBodyInfoInput ></SignupBodyInfoInput>
        <SignupHeightIcon src={HeightIcon}></SignupHeightIcon>
        <SignupBodyInfoInput ></SignupBodyInfoInput>
        <SignupWeightIcon src={WeightIcon}></SignupWeightIcon>
      </SignupInputDiv>
      <FooterBar/>
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

//각 인풋 위에 text
const SignupInputText = styled.span`
  font-family: var(--base-font-400);
  margin : auto 50px;
  
`

//닉네임 input, button 담는 div
const SignupNicknameDiv = styled.div`
  position : relative;
`
//닉네임 input
const SignupNicknameInput = styled.input`
  border:none;
  border-radius: 10px;
  margin-bottom : 20px;
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
  top : 3px;
  left : 3px;
`

//input 담을 div
const SignupInputDiv = styled.div`
  margin-bottom : 20px;
  width : 67%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position : relative;
  
`

// 키 몸무메 나눌 div
const HeightWeightDiv = styled.div`
  display : flex;
  flex-direction: row;
  justify-content: space-between;
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