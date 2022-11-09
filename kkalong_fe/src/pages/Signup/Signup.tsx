import React, { useState } from "react";
import styled from "styled-components";

import BackArrow from "../../assets/icon/Nav/BackArrow.png";
import EmailIcon from "../../assets/icon/User/mail.png";
import AgeIcon from "../../assets/icon/User/age.png";
import HeightIcon from "../../assets/icon/User/height.png";
import WeightIcon from "../../assets/icon/User/weight.png";
import nickname from "../../assets/icon/User/nickname.png";
import PasswordIcon from "../../assets/icon/User/password.png";
import PasswordCheckIcon from "../../assets/icon/User/passwordCheck.png";
import TopNav from "../../components/ui/TopNav";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { getNameOfDeclaration } from "typescript";
import { userInfo } from "os";
import { local } from "../../api/local";

interface userType {
  email: string;
  password: string;
  nickname: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  // kakao, google, kkalong 중 하나
  provider: string;
}
interface socialuserType {
  nickname: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
}

type nickname = {
  IsNickName: boolean;
};

export default function Signup() {
  const navigate = useNavigate();
  const [EmailCheck, setEmailCheck] = useState({
    Input: "",
    Check: "",
  });
  const [IsClick, setIsClick] = useState(false);
  const [IsNickName, setIsNickName] = useState(false);
  const [IsEmail, setIsEmail] = useState(false);
  const provider: any = localStorage.getItem("provider");
  const [CheckPassword, setCheckPassWord] = useState("");
  const [UserInfo, setUserInfo] = useState<userType>({
    email: "",
    password: "",
    nickname: "",
    gender: "",
    age: 0,
    weight: 0,
    height: 0,

    // kakao, google, kkalong 중 하나
    provider: "kkalong",
  });
  const [SocialUser, setSocialUser] = useState<socialuserType>({
    nickname: "",
    age: 0,
    gender: "M",
    height: 0,
    weight: 0,
  });
  // provider 저장

  const location = useLocation();
  const token = location.state;
  const selectList = ["M", "F"];
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");

  //오류메시지
  const [emailMessage, setEmailMessage] = useState<String>("");
  const [passwordMessage, setPasswordMessage] = useState<String>("");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState<String>("");

  //유효성 검사
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isCheckPassword, setIsCheckPassword] = useState<boolean>(false);

  //이메일 체크 (백엔드에서 받아온 인증번호)
  const [emailAuth, setEmailAuth] = useState<String>("");

  //이메일 체크 (사용자가 입력한 인증번호)
  const [emailAuthInput, setEmailAuthInput] = useState<String>("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setUserInfo((current) => ({
      ...current,
      email: e.target.value,
    }));

    if (!emailRegex.test(UserInfo.email)) {
      setEmailMessage("이메일 형식을 확인해주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 형식입니다.");
      setIsEmail(true);
    }
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    setUserInfo((current) => ({
      ...current,
      password: e.target.value,
    }));

    if (!passwordRegex.test(UserInfo.password)) {
      setPasswordMessage("숫자+영문자+특수문자 조합 8자리 이상 입력해주세요.");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  };
  // 이메일 인증
  const AproveEmail = async () => {
    const res = await axios
      .post(requests.email, { value: UserInfo?.email })
      .then((res) => {
        console.log(res);
        if (res.data.provider) {
          alert("이미 존재하는 이메일입니다.");
          navigate("/login");
        } else {
          setEmailCheck((current) => ({
            ...current,
            Check: res.data.security,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CheckInput = () => {
    if (EmailCheck.Check === EmailCheck.Input) {
      alert("인증되었습니다!");
      setIsEmail(true);
    } else {
      alert("인증번호를 다시 확인해주세요");
    }
  };

  const CheckNickname = async () => {
    setIsClick(true);
    const res = await axios.post(requests.nickname, {
      value: UserInfo?.nickname,
    });
    setIsNickName(res.data.usable);
  };

  // 회원가입 axios 요청
  const onSubmit = () => {
    // 인증번호를 입력하지 않은경우
    if (EmailCheck.Input === "") {
      alert("인증번호를 입력해주세요.");
    }
    // 입력한 인증번호와 실제 인증번호가 같을 경우
    else if (EmailCheck.Check === EmailCheck.Input) {
      axios
        .post(requests.signup, UserInfo)
        .then((response) => {
          navigate("/login");
        })
        .catch((error) => {
          // console.error(error.response);
        });
      //인증번호 다른 경우
    } else {
      alert("다시 인증해주세요.");
    }
  };
  const SocialSubmit = () => {
    // 닉네임이 없는 경우 가입
    console.log(SocialUser);
    if (IsNickName === true) {
      axios
        .post("http://k7b302.p.ssafy.io/api/v1/user/signupNext", SocialUser, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")!,
          },
        })
        .then((response) => {
          navigate("/login");
        })
        .catch((error) => {});
    } else {
      console.log(IsNickName);
      alert("닉네임을 확인해주세요.");
    }
  };

  if (provider === "kakao" || provider === "google") {
    return (
      <div>
        <TopNav type={"Line"}>
          <BackArrowImg src={BackArrow} onClick={() => navigate("/login")} />
          <SignupText>회원가입</SignupText>
          <div style={{ width: "30px", height: "30px" }}></div>
        </TopNav>
        <SignupDiv>
          <SignupEmailDiv>
            <div>
              <SignupIcon src={nickname} />
              <SignupEmailInput
                placeholder="닉네임"
                onChange={(e: any) => {
                  setSocialUser((current) => ({
                    ...current,
                    nickname: e.target.value,
                  }));
                }}
              />
            </div>
            <SignupNicknameCheck onClick={CheckNickname}>
              중복확인
            </SignupNicknameCheck>
          </SignupEmailDiv>
          {IsClick && (
            <NickNameP IsNickName>
              {IsNickName
                ? "사용가능한 닉네임입니다"
                : "이미 사용중인 닉네임 입니다."}
            </NickNameP>
          )}
          <SignupInputDiv>
            <SignupAgeInput
              type="number"
              placeholder="나이"
              onChange={(e: any) => {
                setSocialUser((current) => ({
                  ...current,
                  age: e.target.value,
                }));
              }}
            />
            <SignupIcon src={AgeIcon} />
          </SignupInputDiv>

          <SignupInfoDiv>
            <SignupBodyDiv>
              <SignupBodyInfoInput
                type="number"
                placeholder="키"
                onChange={(e: any) => {
                  setSocialUser((current) => ({
                    ...current,
                    height: e.target.value,
                  }));
                }}
              />
              <SignupIcon src={HeightIcon} />
              <InfoSpan>cm</InfoSpan>
            </SignupBodyDiv>
            <SignupBodyDiv>
              <SignupBodyInfoInput
                type="number"
                placeholder="몸무게"
                onChange={(e: any) => {
                  setSocialUser((current) => ({
                    ...current,
                    weight: e.target.value,
                  }));
                }}
              />
              <SignupIcon src={WeightIcon} />
              <InfoSpan>kg</InfoSpan>
            </SignupBodyDiv>
          </SignupInfoDiv>
          {/* {IsNickName &&
            CheckPassword === UserInfo.password &&
            IsEmail &&
            UserInfo.age &&
            UserInfo.height &&
            UserInfo.weight && ( */}
          <SubmitButton onClick={SocialSubmit}>회원가입</SubmitButton>
          {/* )} */}
        </SignupDiv>
      </div>
    );
    // 소셜로그인 시 보이는 화면
  } else {
    return (
      <div>
        <TopNav type={"Line"}>
          <BackArrowImg src={BackArrow} onClick={() => navigate("/login")} />
          <SignupText>회원가입</SignupText>
          <div style={{ width: "30px", height: "30px" }}></div>
        </TopNav>

        <SignupDiv>
          <SignupEmailDiv>
            <div>
              <SignupEmailInput placeholder="이메일" onChange={onChangeEmail} />
              <SignupIcon src={EmailIcon} />
            </div>
            <SignupEmailCheck onClick={AproveEmail}>
              이메일 인증
            </SignupEmailCheck>
          </SignupEmailDiv>
          {EmailCheck.Check ? (
            <SignupEmailDiv>
              <div>
                <SignupEmailInput
                  placeholder="인증번호"
                  onChange={(e: any) => {
                    setEmailCheck((current) => ({
                      ...current,
                      Input: e.target.value,
                    }));
                  }}
                />
                <SignupIcon src={EmailIcon} />
              </div>
              <SignupEmailCheck onClick={CheckInput}>인증</SignupEmailCheck>
            </SignupEmailDiv>
          ) : null}
          <SignupInputDiv>
            <SignupPasswordInput
              type="password"
              placeholder="비밀번호"
              onChange={onChangePassword}
            />
            <SignupIcon src={PasswordIcon} />
          </SignupInputDiv>

          <SignupInputDiv>
            <SignupPasswordInput
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e: any) => {
                setCheckPassWord(e.target.value);
              }}
            />
            <SignupIcon src={PasswordCheckIcon} />
          </SignupInputDiv>
          {CheckPassword && CheckPassword !== UserInfo.password && (
            <PassWordCheckP>비밀번호가 일치하지 않습니다</PassWordCheckP>
          )}

          <SignupEmailDiv>
            <div>
              <SignupIcon src={nickname} />
              <SignupEmailInput
                placeholder="닉네임"
                onChange={(e: any) => {
                  setUserInfo((current) => ({
                    ...current,
                    nickname: e.target.value,
                  }));
                }}
              />
            </div>
            <SignupNicknameCheck onClick={CheckNickname}>
              중복확인
            </SignupNicknameCheck>
          </SignupEmailDiv>
          {IsClick && (
            <NickNameP IsNickName>
              {IsNickName
                ? "사용가능한 닉네임입니다"
                : "이미 사용중인 닉네임 입니다."}
            </NickNameP>
          )}

          <SignupInfoDiv>
            <SignupBodyDiv>
              <SignupBodyInfoInput
                type="number"
                placeholder="나이"
                min={10}
                max={100}
                onChange={(e: any) => {
                  setUserInfo((current) => ({
                    ...current,
                    age: e.target.value,
                  }));
                }}
              />
              <SignupIcon src={AgeIcon} />
              <InfoSpan>cm</InfoSpan>
            </SignupBodyDiv>
            <SignupBodyDiv>
              <SignupGenderInfoInput
                placeholder="성별"
                onChange={(e: any) => {
                  setUserInfo((current) => ({
                    ...current,
                    gender: e.target.value,
                  }));
                }}
              >
                <option value="" hidden>
                  성별
                </option>
                <option value="M">M</option>
                <option value="F">F</option>
              </SignupGenderInfoInput>
              <SignupIcon src={nickname} />
            </SignupBodyDiv>
          </SignupInfoDiv>
          <SignupInfoDiv>
            <SignupBodyDiv>
              <SignupBodyInfoInput
                type="number"
                placeholder="키"
                onChange={(e: any) => {
                  setUserInfo((current) => ({
                    ...current,
                    height: e.target.value,
                  }));
                }}
              />
              <SignupIcon src={HeightIcon} />
              <InfoSpan>cm</InfoSpan>
            </SignupBodyDiv>
            <SignupBodyDiv>
              <SignupBodyInfoInput
                type="number"
                placeholder="몸무게"
                onChange={(e: any) => {
                  setUserInfo((current) => ({
                    ...current,
                    weight: e.target.value,
                  }));
                }}
              />
              <SignupIcon src={WeightIcon} />
              <InfoSpan>kg</InfoSpan>
            </SignupBodyDiv>
          </SignupInfoDiv>
          {/* {IsNickName &&
            CheckPassword === UserInfo.password &&
            IsEmail &&
            UserInfo.age &&
            UserInfo.height &&
            UserInfo.weight && ( */}
          <SubmitButton
            onClick={() => {
              onSubmit();
            }}
          >
            회원가입
          </SubmitButton>
          {/* )} */}
        </SignupDiv>
      </div>
    );
  }
}

const BackArrowImg = styled.img`
  width: 30px;
  height: 30px;
`;

//회원가입 Div
const SignupDiv = styled.div`
  margin-top: 50px;
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
`;

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
  background-color: var(--primary-color-500);
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
  margin: 10px 0 0 0;
  font-family: var(--base-font-400);
  color: red;
  text-align: start;
`;

export const NickNameP = styled(PassWordCheckP)<nickname>`
  color: ${(props) => (props.IsNickName ? "blue" : "red")};
`;

//닉네임 중복 확인 버튼
const SignupNicknameCheck = styled.button`
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: var(--primary-color-500);
  color: #ffffff;
  font-family: var(--base-font-300);
`;

//age Input
const SignupAgeInput = styled.input`
  border: none;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 10px;
  text-indent: 26px;
  width: 100%;
  font-family: var(--base-font-400);
`;

const SignupInfoDiv = styled.div`
  max-width: 288px;
  margin-top: 20px;
  width: 80%;
  max-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

const SignupBodyDiv = styled.div`
  position: relative;
  width: 45%;
  max-width: 130px;
`;

//Body Info Input
const SignupBodyInfoInput = styled.input`
  width: 100%;
  max-width: 130px;
  border: none;
  border-radius: 7px;
  background-color: #f0f0f0;
  padding: 5px;
  text-indent: 25px;
  font-family: var(--base-font-400);
`;

const SignupGenderInfoInput = styled.select`
  width: 100%;
  max-width: 130px;
  border: none;
  border-radius: 7px;
  background-color: #f0f0f0;
  padding: 5px;
  text-indent: 25px;
  font-family: var(--base-font-400);
`;

const InfoSpan = styled.span`
  position: absolute;
  font-family: var(--base-font-400);
  top: 5px;
  right: 0;
`;

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
`;
