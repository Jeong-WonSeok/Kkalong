import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SpaoIcon from "../../assets/icon/Brand/spao.png";
import HnMIcon from "../../assets/icon/Brand/h&m.png";
import EightSecondsIcon from "../../assets/icon/Brand/eight.png";
import ZaraIcon from "../../assets/icon/Brand/zara.png";
import backArrow from "../../assets/icon/Nav/BackArrow.png"

import Search from "../../components/ui/Search";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";

import axios from '../../api/axios'
import requests from '../../api/requests'

interface BrandType {
  img: string;
  brand_id: number;
}

export default function VirtualBrandChoice() {
  const navigate = useNavigate();
  const [Brand, setBrand] = useState(Array<BrandType>);


  useEffect(() => {
    setBrand([
      {
        img: SpaoIcon,
        brand_id: 1,
      },
      {
        img: HnMIcon,
        brand_id: 2,
      },
      {
        img: ZaraIcon,
        brand_id: 3,
      },
      {
        img: EightSecondsIcon,
        brand_id: 4,
      },
      {
        img: SpaoIcon,
        brand_id: 1,
      },
      {
        img: HnMIcon,
        brand_id: 2,
      },
      {
        img: ZaraIcon,
        brand_id: 3,
      },
      {
        img: EightSecondsIcon,
        brand_id: 4,
      },
    ]);
  }, []);

  // filter 로 구현할 예정임
  const SearchBrand = async(Text: string) => {
    
  }

  return (
    <VirtualBrandChoiceDiv>
      <TopNav type={"menu"}>
        <VirtualBrandChoiceText>브랜드 선택</VirtualBrandChoiceText>
        <div style={{width:"54px", height:"38px"}}></div>
      </TopNav>
      <Search Search={SearchBrand}>브랜드 검색</Search>
      <VirtualLine></VirtualLine>
      <VirtualBrandButtonDiv>
        {Brand.map((logo) => {
          return (
            <VirtualBrandButton
              src={logo.img}
              onClick={() => navigate(`${logo.brand_id}`, { state: logo })}
            ></VirtualBrandButton>
          );
        })}
      </VirtualBrandButtonDiv>
      <FooterBar/>
    </VirtualBrandChoiceDiv>
  );
}

//가상피팅 브랜드 선택 div
const VirtualBrandChoiceDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`;

//뒤로가기
const VirtualBrandChoiceBackArrow = styled.img`
  width : 30px;
  height : 30px;
`


const VirtualBrandChoiceText = styled.text`
  font-family: var(--base-font-600);
`;
const VirtualUserSearch = styled.text`
  margin-left: 10px;
`;

const VirtualLine = styled.hr`
  width: 90%;
  border: 1px solid #ded6c6;
  margin-top: 15px;
`;

const VirtualBrandButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const VirtualBrandButton = styled.img`
  width: 20%;
  height: 30px;
  padding: 3px;
  margin: 3px;
  border: 1px solid #000000;
  border-radius: 50px;
`;
