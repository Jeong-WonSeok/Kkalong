import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import menu from "../../assets/icon/Nav/menu.png";
import hat from "../../assets/icon/Closet/hat.png";
import list from "../../assets/icon/Closet/list.png";
import outer from "../../assets/icon/Closet/outer.png";
import pants from "../../assets/icon/Closet/pants.png";
import shoes from "../../assets/icon/Closet/shoes.png";
import shirt from "../../assets/icon/Closet/shirt.png";
import img1 from "../../img/img1.png";
import img2 from "../../img/img2.png";
import img3 from "../../img/img3.png";
import img4 from "../../img/img4.png";
import img5 from "../../img/img5.png";
import img6 from "../../img/img6.png";
import img7 from "../../img/img7.png";
import left from "../../assets/icon/Closet/arrow-left.png";
import TopNav from "../../components/ui/TopNav";
import { Category, ClothesImg, SortClothes, SortClothesContainer } from "./MainCloset";

export default function AddCloset() {
  const navigate = useNavigate();

  useEffect(()=>{
    const app = document.getElementById('App') as HTMLDivElement
    app.style.marginBottom = '0'
    
    return () => {
      app.style.marginTop = '60px'
    }
  },[])

  let [clothes, setClothes] = useState([list, shirt, hat, outer, pants, shoes]);
  let [cltext, setCltext] = useState([
    "전체",
    "상의",
    "겉옷",
    "하의",
    "신발",
    "악세서리",
  ]);
  let [sortclothes, setSortclothes] = useState([
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
  ]);
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
        <ClosetName placeholder="이름을 입력해주세요" />
        <ClosetEnter>
          <EnterText>저장</EnterText>
        </ClosetEnter>
      </TopNav>
      

    <ClosetImg src={sortclothes[0]} />

    <Category>
      {clothes.map(function (a, i) {
        return (
          <ClothesBtn>
            <img src={clothes[i]} />
            <ClothesText>{cltext[i]}</ClothesText>
          </ClothesBtn>
        );
      })}
    </Category>
    <SortClothesContainer>
      {sortclothes.map(function (a, i) {
        return (
          <SortClothes>
            <ClothesImg src={sortclothes[i]} />
          </SortClothes>
        );
      })}
    </SortClothesContainer>
    </div>
  );
}

const BackBtn = styled.button`
  height: 30px;
  width: 30px;
  padding: 0;
  border: none;
  background-color: white;
  margin: auto 0;
`;

const ClothesBtn = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: solid 1px #67564e;
  background-color: white;
`;

const ClothesText = styled.p`
  line-height: 1;
  font-family: var(--base-font-500);
  margin: 0;
  font-size: 10px;
  color: var(--primary-color-900);
`;

const ClosetImg = styled.img`
  width: 150px;
  height: 150px;
  display: flex;
  margin: 20px auto;
  border-radius: 20px;
  border: dotted 3px #e5ddce;
`;

const ClosetName = styled.input`
  height: 30px;
  width: 200px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: solid 1px;
`;

const ClosetEnter = styled.button`
  height: 30px;
  width: 60px;
  background-color: var(--primary-color-400);
  border: none;
  border-radius: 30px;
  position: relative;
  top: 3px;
`;

const EnterText = styled.span`
  color: white;
`;
