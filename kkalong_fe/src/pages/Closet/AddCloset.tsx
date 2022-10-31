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

export default function AddCloset() {
  const navigate = useNavigate();
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
      <ClosetImg />
      {clothes.map(function (a, i) {
        return (
          <ClothesBtn>
            <img src={clothes[i]} />
            <ClothesText>{cltext[i]}</ClothesText>
          </ClothesBtn>
        );
      })}
      {sortclothes.map(function (a, i) {
        return (
          <SortClothes>
            <img src={sortclothes[i]} />
          </SortClothes>
        );
      })}
    </div>
  );
}
const BackBtn = styled.button`
  height: 30px;
  width: 40px;
  position: absolute;
  border: none;
  background-color: white;
  margin-top: 10px;
`;
const ClothesBtn = styled.button`
  margin-top: 20px;
  margin-left: 10px;
  height: 55px;
  width: 55px;
  border-radius: 50px;
  border: solid 1px #67564e;
  background-color: white;
`;

const ClothesText = styled.p`
  line-height: 0;
  margin: auto;
  font-family: var(--base-font-500);
  margin-top: 5px;
  font-size: 10px;
  color: var(--primary-color-900);
`;
const SortClothes = styled.button`
  height: 100px;
  width: 100px;
  margin-top: 20px;
  margin-left: 25px;
  margin-right: auto;
  background-color: white;
  border-radius: 20px;
  border: solid 1px #e5ddce;
`;
const ClosetImg = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  margin: 20px auto;
  border-radius: 20px;
  border: dotted 3px #e5ddce;
`;

const ClosetName = styled.input`
  height: 30px;
  width: 270px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: solid 1px;
  margin-left: 45px;
  margin-top: 10px;
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
