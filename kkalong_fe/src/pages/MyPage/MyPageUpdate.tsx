import React,{ useState, useEffect } from "react";
import styled from "styled-components";
import AgeIcon from '../../assets/icon/User/age.png'
import HeightIcon from '../../assets/icon/User/height.png'
import WeightIcon from '../../assets/icon/User/weight.png'
import NicknameIcon from '../../assets/icon/User/nickname.png'
import FooterBar from "../../components/ui/FooterBar";
import backArrow from '../../assets/icon/Nav/BackArrow.png';
import TopNav from "../../components/ui/TopNav";
import { useNavigate } from "react-router-dom";
import { UserType } from "./MyPage";

export default function MyPageUpdate() {
  const navigate = useNavigate();
  const [User, setUser] = useState<UserType>()  

  useEffect(()=>{
    setUser(JSON.parse(localStorage?.getItem('useProfile')as string))
  },[])

  const CheckNinkname = () => {

  }

  return (
    <div>
      <TopNav type={""}>
        <img src={backArrow} style={{width:"30px", height:"30px"}} onClick={()=>navigate(-1)}></img>
        <SignupText>회원정보 수정</SignupText>
        <div style={{width:"30px", height:"30px"}}></div>
      </TopNav>

      <SignupDiv>
          <SignupInputText>닉네임</SignupInputText>
          <RowContainer>   
            <SignupNicknameDiv>
              <SignupNicknameInput placeholder={User?.nickname}/>
              <SignupAgeIcon src={NicknameIcon}/>
            </SignupNicknameDiv>
            <SignupNicknameCheck onClick={CheckNinkname}>중복확인</SignupNicknameCheck>
          </RowContainer>

        <SignupInputText>나이</SignupInputText>
        <SignupNicknameDiv>
          <SignupNumberInput placeholder={{User.nickname}}/>
          <SignupAgeIcon src={AgeIcon}></SignupAgeIcon>
        </SignupNicknameDiv>

      <SignupInputDiv>
        <ColumnDiv>
        <SignupInputText>키</SignupInputText>
        <div>
          <SignupNumberInput placeholder={User?.height}/>
          <SignupInfoIcon src={HeightIcon}/>
          <SpanTag>cm</SpanTag>
        </div>
        </ColumnDiv>
        <ColumnDiv>
        <SignupInputText>몸무게</SignupInputText>
        <div>
          <SignupNumberInput placeholder={User?.weight}/>
          <SignupInfoIcon src={WeightIcon}/>
          <SpanTag>kg</SpanTag>
        </div>
        </ColumnDiv>
      </SignupInputDiv>
      <FooterBar/>
    </SignupDiv>   
    </div>
  )
}

//회원가입 Div
const SignupDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 0 auto;
`

const SignupText = styled.span`
  font-family: var(--base-font-600);
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
`

const ColumnDiv = styled.div`
  display:flex;
  flex-direction: column;
  position: relative;
  width: 45%;
`

//각 인풋 위에 text
const SignupInputText = styled.div`
  font-family: var(--base-font-400);
  font-size: 1rem;
  width: 100%;
  margin: 5px 0;
  margin-left: 5px;
`

//닉네임 input, button 담는 div
const SignupNicknameDiv = styled.div`
  position : relative;
  width: 100%;
`
//닉네임 input
const SignupNicknameInput = styled.input`
  max-width: 210px;
  border:none;
  border-radius: 10px;
  padding : 5px;
  background-color: #F0F0F0;
  text-indent: 25px;
  font-size: 1rem;
  font-family: var(--base-font-400);
  margin-right: 15px;
`

//닉네임 중복 확인 버튼
const SignupNicknameCheck = styled.button`
  border : none;
  width: 80px;
  padding : 5px 7px;
  border-radius: 10px;
  background-color: #CBA171;
  color : #FFFFFF;
  font-family: var(--base-font-300);
`

//input 담을 div
const SignupInputDiv = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position : relative;
`

//age Input
const SignupNumberInput = styled.input.attrs(({type}) => ({
  type: type || "number",
}))`
  border : none;
  background-color: #F0F0F0;
  padding : 5px;
  font-size: 1rem;
  border-radius : 10px;
  text-indent : 25px;
  width : 100%;
  font-family: var(--base-font-400);
  ::-webkit-inner-spin-button{
  -webkit-appearance: none; 
  margin: 0; 
  };
  ::-webkit-outer-spin-button{
  -webkit-appearance: none; 
  margin: 0; 
  };
`

const SignupAgeIcon = styled.img`
  position : absolute;
  left : 7px;
  top : 7px;
`

const SignupInfoIcon = styled.img`
  position : absolute;
  left : 7px;
  top : 39px;
`

const SpanTag = styled.span`
  position: absolute;
  left: 115px;
  top: 39px;
  font-size: 0.95rem;
  font-family: var(--base-font-400);
`