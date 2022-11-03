import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import left from "../../assets/icon/Closet/arrow-left.png";
import TopNav from "../../components/ui/TopNav";
import add_codi from "../../assets/icon/Closet/add_codi.png";
import codi1 from "../../img/codi1.png";
import codi2 from "../../img/codi2.png";
import codi3 from "../../img/codi3.png";
import FooterBar from "../../components/ui/FooterBar";
import { useState } from "react";

export default function DailyRecommend() {
  const location = useLocation();
  const i = location.state.i;
  console.log(i);
  let [codi, setCodi] = useState([codi1, codi2, codi3, codi1]);
  const navigate = useNavigate();
  return (
    <div>
      <TopNav type={""}>
        <BackBtn
          onClick={() => {
            navigate("/closet");
          }}
        >
          <img src={left}></img>
        </BackBtn>
        <DateText>오늘의 추천 코디</DateText>
      </TopNav>

      <Codi src={codi[i]} />
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
`;
const DateText = styled.p`
  /* line-height: 0; */
  margin: auto;
  font-family: var(--base-font-400);
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
