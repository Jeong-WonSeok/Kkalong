import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import left from "../../assets/icon/Closet/arrow-left.png";
import codi2 from "../../img/codi2.png";
import add_codi from "../../assets/icon/Closet/add_codi.png";
import FooterBar from "../../components/ui/FooterBar";
export default function DailyRecommend() {
  const navigate = useNavigate();
  return (
    <div>
      <BackBtn
        onClick={() => {
          navigate("/closet");
        }}
      >
        <img src={left}></img>
      </BackBtn>
      <DateText>오늘의 추천 코디</DateText>
      <Codi src={codi2} />
      <PlusBtn>
        <PlusImg src={add_codi} />
        <BtnText>내 옷장에 추가</BtnText>
      </PlusBtn>
      <FooterBar />
    </div>
  );
}
const BackBtn = styled.button`
  height: 30px;
  width: 40px;
  position: absolute;
  border: none;
  background-color: white;
  margin-left: 10px;
`;
const DateText = styled.p`
  font-family: var(--base-font-400);
  font-size: 20px;
  text-align: center;
`;
const Codi = styled.img`
  width: 300px;
  height: 250px;
  display: flex;
  margin: 70px auto;
  border-radius: 20px;
  border: solid #67564e 3px;
`;
const BtnText = styled.span`
  font-size: 15px;
  color: white;
  display: flex;
  margin: auto;
  font-family: var(--base-font-400);
`;
const PlusImg = styled.img`
  margin-left: 20px;
  margin-top: 10px;
  width: 25px;
  height: 25px;
`;
const PlusBtn = styled.button`
  width: 190px;
  height: 43px;
  display: flex;
  margin: auto;
  border: none;
  border-radius: 20px;
  background-color: var(--primary-color-500);
`;
