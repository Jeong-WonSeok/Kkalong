import React, {useState} from "react";
import styled from "styled-components";
import EmailIcon from "../../assets/icon/User/mail.png";
import AgeIcon from '../../assets/icon/User/age.png'
import HeightIcon from '../../assets/icon/User/height.png'
import WeightIcon from '../../assets/icon/User/weight.png'
import nickname from '../../assets/icon/User/nickname.png'
import PasswordIcon from "../../assets/icon/User/password.png";
import PasswordCheckIcon from "../../assets/icon/User/passwordCheck.png";
import TopNav from "../../components/ui/TopNav";
import requests from '../../api/requests'
import axios from "axios";

interface userType {
  email: string,
  password: string,
  nickname: string,
  age: number,
  weight: number,
  height: number,
  // kakao, google, kkalong 중 하나
  provider: string
}

type nickname = {
  IsNickName: boolean
}

export default function Signup() {
  const [EmailCheck, setEmailCheck] = useState({
    Input: '',
    Check: '',
  })
  const [IsClick, setIsClick] = useState(false)
  const [IsNickName, setIsNickname] = useState(false)
  const [IsEmail, setIsEmail] = useState(false)
  const [CheckPassword, setCheckPassWord] = useState('')
  const [UserInfo, setUserInfo] = useState<userType>({
    email: '',
    password: '',
    nickname: '',
    weight: 0,
    height: 0,
    age: 0,
    // kakao, google, kkalong 중 하나
    provider: 'kkalong'
  })

  // 이메일 인증
  const AproveEmail = async () => {
    const res = await axios.post(requests.email, UserInfo?.email)
    setEmailCheck((current) => ({...current, Check: res.data}))
  }

  const CheckInput = () => {
    if (EmailCheck.Check === EmailCheck.Input) {
      alert('인증되었습니다!')
      setIsEmail(true)
    } else {
      alert('인증번호를 다시 확인해주세요')
    }
  }

  const CheckNickname = async () => {
    setIsClick(true)
    const res = await axios.post(requests.nickname, UserInfo?.nickname)
    setIsNickname(res.data)
  }

  // 회원가입 axios 요청
  const SubmitSingup = async () => {
    
  }

  // 회원가입시 로그인 화면
  if (UserInfo.provider === 'kkalong') {
    return (
      <div>
        <TopNav type={"Line"}>
          <div style={{width: "30px", height: "30px"}}></div>
          <SignupText>회원가입</SignupText>
          <div style={{width: "30px", height: "30px"}}></div>
        </TopNav>
  
        <SignupDiv>
        <SignupEmailDiv>
          <div>
            <SignupEmailInput placeholder="이메일" onChange={(e: any)=> {setUserInfo((current) => ({...current, email: e.target.value}))}}/>
            <SignupIcon src={EmailIcon}/>
          </div>
          <SignupEmailCheck onClick={AproveEmail}>이메일 인증</SignupEmailCheck>
        </SignupEmailDiv>
        {EmailCheck.Check && !IsEmail &&
        <SignupEmailDiv>
          <div>
            <SignupEmailInput placeholder="인증번호" onChange={(e: any)=> {setEmailCheck((current) => ({...current, Input: e.target.value}))}}/>
            <SignupIcon src={EmailIcon}/>
          </div>
          <SignupEmailCheck onClick={CheckInput}>인증</SignupEmailCheck>
        </SignupEmailDiv>
        }
  
        <SignupInputDiv>
          <SignupPasswordInput type="password" placeholder="비밀번호" onChange={(e: any)=> {setUserInfo((current) => ({...current, password: e.target.value}))}}/>
          <SignupIcon src={PasswordIcon}/>
        </SignupInputDiv>
  
        <SignupInputDiv>
          <SignupPasswordInput type="password" placeholder="비밀번호 확인" onChange={(e: any) => {setCheckPassWord(e.target.value)}}/>
          <SignupIcon src={PasswordCheckIcon}/>
        </SignupInputDiv>
        {CheckPassword && CheckPassword !== UserInfo.password && <PassWordCheckP>비밀번호가 일치하지 않습니다</PassWordCheckP>}
  
        <SignupEmailDiv>
          <div>
            <SignupIcon src={nickname} />
            <SignupEmailInput placeholder='닉네임'/>
          </div>
          <SignupNicknameCheck onClick={CheckNickname}>중복확인</SignupNicknameCheck>
        </SignupEmailDiv>
        {IsClick && <NickNameP IsNickName>{IsNickName ? '사용가능한 닉네임입니다': '이미 사용중인 닉네임 입니다.'}</NickNameP>}
        <SignupInputDiv>
          <SignupAgeInput type="number" placeholder='나이' onChange={(e: any)=> {setUserInfo((current) => ({...current, age: e.target.value}))}} />
          <SignupIcon src={AgeIcon}/>
        </SignupInputDiv>
  
        <SignupInfoDiv>
          <SignupBodyDiv>
            <SignupBodyInfoInput type="number" placeholder='키' onChange={(e: any)=> {setUserInfo((current) => ({...current, heihgt: e.target.value}))}} />
            <SignupIcon src={HeightIcon}/>
            <InfoSpan>cm</InfoSpan>
          </SignupBodyDiv>
          <SignupBodyDiv>
            <SignupBodyInfoInput type="number" placeholder='몸무게' onChange={(e: any)=> {setUserInfo((current) => ({...current, weight: e.target.value}))}} />
            <SignupIcon src={WeightIcon}/>
            <InfoSpan>kg</InfoSpan>
          </SignupBodyDiv>
        </SignupInfoDiv>
        {IsNickName && CheckPassword === UserInfo.password && IsEmail && UserInfo.age && UserInfo.height && UserInfo.weight &&
        <SubmitButton onClick={SubmitSingup}>회원가입</SubmitButton>}
        </SignupDiv>
      </div>
    );
    // 소셜로그인 시 보이는 화면
  } else {
    return (
      <div>
      <TopNav type={"Line"}>
          <div style={{width: "30px", height: "30px"}}></div>
          <SignupText>회원가입</SignupText>
          <div style={{width: "30px", height: "30px"}}></div>
        </TopNav>

      <SignupDiv>
        <SignupEmailDiv>
        <div>
          <SignupIcon src={nickname} />
          <SignupEmailInput placeholder='닉네임'/>
        </div>
        <SignupNicknameCheck onClick={CheckNickname}>중복확인</SignupNicknameCheck>
      </SignupEmailDiv>
      {IsClick && <NickNameP IsNickName>{IsNickName ? '사용가능한 닉네임입니다': '이미 사용중인 닉네임 입니다.'}</NickNameP>}
      <SignupInputDiv>
        <SignupAgeInput type="number" placeholder='나이' onChange={(e: any)=> {setUserInfo((current) => ({...current, age: e.target.value}))}} />
        <SignupIcon src={AgeIcon}/>
      </SignupInputDiv>

      <SignupInfoDiv>
        <SignupBodyDiv>
          <SignupBodyInfoInput type="number" placeholder='키' onChange={(e: any)=> {setUserInfo((current) => ({...current, heihgt: e.target.value}))}} />
          <SignupIcon src={HeightIcon}/>
          <InfoSpan>cm</InfoSpan>
        </SignupBodyDiv>
        <SignupBodyDiv>
          <SignupBodyInfoInput type="number" placeholder='몸무게' onChange={(e: any)=> {setUserInfo((current) => ({...current, weight: e.target.value}))}} />
          <SignupIcon src={WeightIcon}/>
          <InfoSpan>kg</InfoSpan>
        </SignupBodyDiv>
      </SignupInfoDiv>
      {IsNickName && CheckPassword === UserInfo.password && IsEmail && UserInfo.age && UserInfo.height && UserInfo.weight &&
      <SubmitButton onClick={SubmitSingup}>회원가입</SubmitButton>}
    </SignupDiv>
    </div>
    )
  }
  
}

//회원가입 Div
const SignupDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupText = styled.span`
  font-family: var(--base-font-600);
  line-height: 2;
`;

const SignupIcon = styled.img`
  position: absolute;
  left: 7px;
  top: 5px;
`

//이메일 input, button 담는 div
const SignupEmailDiv = styled.div`
  width: 80%;
  max-width: 300px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

//이메일 input
const SignupEmailInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 5px;
  background-color: #f0f0f0;
  text-indent: 24px;
  font-family: var(--base-font-400);
`;

//이메일 인증 버튼
const SignupEmailCheck = styled.button`
  border: none;
  padding: 5px 7px;
  border-radius: 10px;
  background-color: var(--primary-color-500);;
  color: #ffffff;
  font-family: var(--base-font-300);
`;

//input 담을 div
const SignupInputDiv = styled.div`
  margin-top: 20px;
  width: 80%;
  max-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
`;

//Password Input
const SignupPasswordInput = styled.input` 
  border: none;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 10px;
  text-indent: 22px;
  width: 100%;
  font-family: var(--base-font-400);
`;

const PassWordCheckP = styled.p`
  width: 80%;
  max-width: 280px;
  margin: 10px 0 0 0 ;
  font-family: var(--base-font-400);
  color: red;
  text-align: start;
`

const NickNameP = styled(PassWordCheckP)<nickname>`
  color: ${props => props.IsNickName ? 'blue' : 'red'};
`

//닉네임 중복 확인 버튼
const SignupNicknameCheck = styled.button`
  border : none;
  padding : 5px 10px;
  border-radius: 10px;
  background-color: var(--primary-color-500);;
  color : #FFFFFF;
  font-family: var(--base-font-300);
 
`

//age Input
const SignupAgeInput = styled.input`
  border : none;
  background-color: #F0F0F0;
  padding : 5px;
  border-radius : 10px;
  text-indent : 26px;
  width : 100%;
  font-family: var(--base-font-400);
`

  const SignupInfoDiv = styled.div`
  max-width: 288px;
  margin-top: 20px;
  width: 80%;
  max-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  `

 const SignupBodyDiv = styled.div`
  position: relative;
  width: 45%;
  max-width: 130px;
 `

 //Body Info Input
const SignupBodyInfoInput = styled.input`
  width: 100%;
  max-width: 130px;
  border : none;
  border-radius: 7px;
  background-color: #F0F0F0;
  padding : 5px;
  text-indent : 25px;
  font-family: var(--base-font-400);
`

const InfoSpan = styled.span`
  position: absolute;
  font-family: var(--base-font-400);
  top: 5px;
  right: 0; 
`

const SubmitButton = styled.button`
  margin-top: 20px;
  border: 0;
  width: 80%;
  background-color: var(--primary-color-500);
  font-size: 15px;
  color: white;
  height: 30px;
  border-radius: 20px;
  padding: 5px;
`