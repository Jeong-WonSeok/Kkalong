import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import AgeIcon from '../../assets/icon/User/age.png'
import HeightIcon from '../../assets/icon/User/height.png'
import WeightIcon from '../../assets/icon/User/weight.png'
import NicknameIcon from '../../assets/icon/User/nickname.png'
import backArrow from '../../assets/icon/Nav/BackArrow.png';

import TopNav from "../../components/ui/TopNav";
import FooterBar from "../../components/ui/FooterBar";

import { UserType } from "./MyPage";
import { NickNameP } from "../Signup/Signup";
import axios from '../../api/axios'
import requests from '../../api/requests'
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { ChangeProfile } from "../../redux/modules/User";

export default function MyPageUpdate() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { User } = useAppSelector(state => state.User)
  const [isClick, setIsClick] = useState(false)
  const [isNickName, setIsNickName] = useState(false)
  const [ ChangeUser, setChangeUser ] = useState<UserType>()

  useEffect(()=>{
    setChangeUser(User)
  },[])

  const CheckNinkname = async () => {
    setIsClick(true);
    const res = await axios.post(requests.nickname, {
      value: User?.nickname,
    });
    setIsNickName(res.data.usable);
  }

  const Submit = async() => {
    dispatch(ChangeProfile(ChangeUser as UserType))
    alert('회원정보가 변경되었습니다.') 
    
    navigate('/myPage')
  }

  return (
    <div>
      <TopNav type={""}>
        <div style={{width:"50px"}}>
          <img src={backArrow} style={{width:"30px", height:"30px", paddingRight: "20px"}} onClick={()=>navigate(-1)}/>
        </div>
        <SignupText>회원정보 수정</SignupText>
        <SubmitBtn onClick={Submit}>수정</SubmitBtn>
      </TopNav>

      <SignupDiv>
          <SignupInputText>닉네임</SignupInputText>
          <RowContainer>   
            <SignupNicknameDiv>
              <SignupNicknameInput placeholder={User?.nickname} onChange={(e:any)=>setChangeUser((currnet) => ({...currnet as UserType, nickname: e.target.value}))}/>
              <SignupAgeIcon src={NicknameIcon}/>
            </SignupNicknameDiv>
            <SignupNicknameCheck onClick={CheckNinkname}>중복확인</SignupNicknameCheck>
          </RowContainer>
          {isClick && (
            <NickNameP IsNickName>
              {isNickName
                ? "사용가능한 닉네임입니다"
                : "이미 사용중인 닉네임 입니다."}
            </NickNameP>
          )}

        <SignupInputText>나이</SignupInputText>
        <SignupNicknameDiv>
          <SignupNumberInput value={User?.age} onChange={(e:any)=>setChangeUser((currnet) => ({...currnet as UserType, age: e.target.value}))}/>
          <SignupAgeIcon src={AgeIcon}></SignupAgeIcon>
        </SignupNicknameDiv>

      <SignupInputDiv>
        <ColumnDiv>
        <SignupInputText>키</SignupInputText>
        <div>
          <SignupNumberInput value={User?.height} onChange={(e:any)=>setChangeUser((currnet) => ({...currnet as UserType, height: e.target.value}))}/>
          <SignupInfoIcon src={HeightIcon}/>
          <SpanTag>cm</SpanTag>
        </div>
        </ColumnDiv>
        <ColumnDiv>
        <SignupInputText>몸무게</SignupInputText>
        <div>
          <SignupNumberInput value={User?.weight}  onChange={(e:any)=>setChangeUser((currnet) => ({...currnet as UserType, weight: e.target.value}))}/>
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

const SubmitBtn = styled.button`
  border: none;
  background: var(--primary-color-400);
  width: 50px;
  height: 30px;
  font-family: var(--base-font-400);
  font-size : 0.9rem;
  color: white;
  border-radius: 10px;
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