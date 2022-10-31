import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import TopNav from "../../components/ui/TopNav";
import logo from "../../assets/icon/logo/kkalongLogo.png";
import menu from "../../assets/icon/Nav/menu.png";
import sun from "../../assets/icon/Closet/sun.png";
import codi1 from "../../img/codi1.png";
import codi2 from "../../img/codi2.png";
import codi3 from "../../img/codi3.png";
import plus from "../../assets/icon/Closet/plus.png";
import FooterBar from "../../components/ui/FooterBar";

export default function WeatherPage() {
  let [codi, setCodi] = useState([codi1, codi2, codi3, codi1]);
  return (
    <div>
      <TopNav type={""}>
        <Logo src={logo} />
        <CategoryText1>오늘의 추천</CategoryText1>
        <div style={{ width: "30px", height: "30px" }}></div>
        <MenuIcon src={menu} />
      </TopNav>
      <DateText>10월 18일 화요일</DateText>
      <WeatherImg src={sun} />
      <DateText>맑음 13°C</DateText>
      <DailyText>오늘의 추천 코디</DailyText>
      <CodiBack>
        {codi.map(function (a, i) {
          return (
            <ClothesCodi>
              <img src={codi[i]} />
              {/* <PlusBtn>
                <Plus src={plus} />
              </PlusBtn> */}
            </ClothesCodi>
          );
        })}
      </CodiBack>
      <FooterBar />
    </div>
  );
}
const Logo = styled.img`
  width: 50px;
  height: 30px;
  margin: auto 0;
`;
const CategoryText1 = styled.p`
  line-height: 0;
  margin: auto;
  font-family: var(--base-font-400);
`;
const MenuIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0;
`;

const DateText = styled.p`
  font-family: var(--base-font-400);
  font-size: 20px;
  margin-top: 50px;
  margin-top: 60px auto;

  text-align: center;
`;
const WeatherImg = styled.img`
  width: 150px;
  height: 150px;
  display: flex;
  margin: auto;
`;

const DailyText = styled.p`
  font-family: var(--base-font-400);
  color: #5e5757;
  font-size: 18px;
  margin-left: 10px;
`;

const CodiBack = styled.div`
  height: 400px;
  background-color: #e5ddce;
`;
const ClothesCodi = styled.button`
  height: 150px;
  width: 150px;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: auto;
  background-color: white;
  border-radius: 20px;
  border: solid 2px #67564e;
`;

// const PlusBtn = styled.button`
//   width: 30px;
//   height: 30px;
//   background-color: #b79b7e;
//   margin-left: 80px;
//   border: none;
//   border-radius: 50px;
// `;

// const Plus = styled.img`
//   width: 25px;
//   height: 25px;
// `;
