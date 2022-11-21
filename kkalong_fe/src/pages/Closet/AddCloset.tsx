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

import axios from "../../api/axios";
import requests from "../../api/requests";

import {
  Category,
  ClothesImg,
  SortClothes,
  SortClothesContainer,
} from "./MainCloset";

export default function AddCloset() {
  const navigate = useNavigate();

  useEffect(() => {
    const app = document.getElementById("App") as HTMLDivElement;
    app.style.marginBottom = "0";

    return () => {
      app.style.marginBottom = "70px";
    };
  }, []);

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
  let [input, setInput] = useState("");
  const onChangeInput = (e: any) => {
    setInput(e.target.value);
  };
  const onSubmit = (e: any) => {
    console.log(input);
    axios.post(requests.closetAdd, { value: input }).then((res) => {
      console.log(res);
      navigate("/closet");
    });
  };
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
      </TopNav>
      <Modal>
        <ClosetName
          onChange={onChangeInput}
          placeholder="옷장 제목을 입력해주세요"
        />
        <ClosetEnter onClick={onSubmit}>
          <EnterText>저장</EnterText>
        </ClosetEnter>
      </Modal>
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
  margin-top: 50px;
  margin-left: 25px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: solid 1px;
  &:active, // &는 this를 의미한다
  &:focus {
    outline: none;
  }
  &::placeholder {
    left: 20px;
  }
`;

const ClosetEnter = styled.button`
  height: 40px;
  width: 250px;
  background-color: #67564e;
  border: none;
  border-radius: 0px 0px 30px 30px;
  margin-top: 70px;
`;

const EnterText = styled.span`
  color: white;
`;

const Modal = styled.div`
  width: 250px;
  height: 180px;
  border: solid 1px #67564e;
  display: row;
  margin: 100px auto;
  border-radius: 30px;
`;
