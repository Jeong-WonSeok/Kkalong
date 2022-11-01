import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import dfs_xy_conv from '../../hooks/chagneLatLon'

import TopNav from "../../components/ui/TopNav";
import FooterBar from "../../components/ui/FooterBar";

import logo from "../../assets/icon/logo/kkalongLogo.png";
import menu from "../../assets/icon/Nav/menu.png";
import sun from "../../assets/icon/Closet/sun.png";
import codi1 from "../../img/codi1.png";
import codi2 from "../../img/codi2.png";
import codi3 from "../../img/codi3.png";
import plus from "../../assets/icon/Closet/plus.png";

type LocationType = {
  lat: number,
  lon: number,
  x: number,
  y: number
}

export default function WeatherPage() {
  let [codi, setCodi] = useState([codi1, codi2, codi3, codi1]);
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(getLocation())
  },[])

  const getLocation = async () => {
    if (navigator.geolocation) { // GPS를 지원하면
      // 이것으로 현재 위치를 가져온다.
      var getPosition = function () {
        return new Promise(function (reslove, reject) {
          navigator.geolocation.getCurrentPosition(reslove, reject)
        })
      }
      
      // 이거 왜 안됨?
      await getPosition()
        .then(async (position: any) => {
          const result  = new Promise((reslove, reject) => {
            reslove(dfs_xy_conv('toXY', position.coords.latitude , position.coords.longitude))
          })
          
          await result.then((res) => {
            return res
          })
        })
        .catch((error) => {
          console.error(error.message)
        });
    } else {
      alert('GPS 정보를 불러드리지 못했습니다.\n 새로고침을 해주세요');
    }
  }

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
            <ClothesCodi
              onClick={() => {
                navigate("/daily", { state: { i } });
              }}
            >
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
  min-height: 400px;
  background-color: #e5ddce;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ClothesCodi = styled.button`
  height: 150px;
  width: 150px;
  margin: 10px;
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
