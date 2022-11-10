import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SpaoIcon from "../../assets/icon/Brand/spao.png";
import HnMIcon from "../../assets/icon/Brand/h&m.png";
import EightSecondsIcon from "../../assets/icon/Brand/eight.png";
import ZaraIcon from "../../assets/icon/Brand/zara.png";

import Search from "../../components/ui/Search";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";

import axios from '../../api/axios'
import requests from '../../api/requests'

interface BrandType {
  img: string;
  name: string;
  brand_id: number;
}

export default function VirtualBrandChoice() {
  const navigate = useNavigate();
  const [Brand, setBrand] = useState(Array<BrandType>);
  const [SearchBrandList, setSearchBrandList] = useState(Array<BrandType>)
  const [IsSearch, setIsSearch] = useState(false)


  useEffect(() => {
    // axios.get(requests.brand)
    //   .then(res => {
    //     setBrand(res.data)
    //   })
    //   .catch(err => console.error(err))
    setBrand([
      {
        img: SpaoIcon,
        name: "spao",
        brand_id: 1,
      },
      {
        img: HnMIcon,
        name: "HnM",
        brand_id: 2,
      },
      {
        img: ZaraIcon,
        name: "Zara",
        brand_id: 3,
      },
      {
        img: EightSecondsIcon,
        name: "EightSeconds",
        brand_id: 4,
      },
      {
        img: SpaoIcon,
        name: "spao",
        brand_id: 1,
      },
      {
        img: HnMIcon,
        name: "HnM",
        brand_id: 2,
      },
      {
        img: ZaraIcon,
        name: "Zara",
        brand_id: 3,
      },
      {
        img: EightSecondsIcon,
        name: "EightSeconds",
        brand_id: 4,
      },
    ]);
  }, []);

  // filter 로 구현할 예정임
  const SearchBrand = async(Text: string) => {
    const list = Brand.filter(brand => {
      return brand.name.includes(Text)
    })
    setSearchBrandList(list)
    setIsSearch(true)
  }

  return (
    <VirtualBrandChoiceDiv>
      <TopNav type={"menu"}>
        <VirtualBrandChoiceText>브랜드 선택</VirtualBrandChoiceText>
        <div style={{width:"54px", height:"38px"}}></div>
      </TopNav>
      <Search Search={SearchBrand} StopSearch={()=>setIsSearch(false)}>브랜드 검색</Search>
      <VirtualLine></VirtualLine>
      <VirtualBrandButtonDiv>
        {/* 검색중이 아닐때 나옴 */}
        {!IsSearch && Brand.length && Brand.map((logo) => {
          return (
            <VirtualBrandButton
              src={logo.img}
              onClick={() => navigate(`${logo.brand_id}`, { state: logo })}
            ></VirtualBrandButton>
          );
        })}
        
        {/* 검색중 */}
        {IsSearch && SearchBrandList.length &&
          Brand.map((logo) => {
            return (
              <VirtualBrandButton
                src={logo.img}
                onClick={() => navigate(`${logo.brand_id}`, { state: logo })}
              ></VirtualBrandButton>
            )
          })}

        {IsSearch && !SearchBrandList.length && <NoData>검색 결과가 없습니다</NoData>}


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

const VirtualBrandChoiceText = styled.span`
  font-family: var(--base-font-600);
`;

const VirtualUserSearch = styled.text`
  margin-left: 10px;
`;

const VirtualLine = styled.hr`
  width: 100%;
  border: 1px solid var(--primary-color-300);
  margin-top: 15px;
`;

const VirtualBrandButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const VirtualBrandButton = styled.img`
  width: 100px;
  height: 40px;
  margin: 9px;
  border: 1px solid var(--primary-color-900);
  border-radius: 50px;
`;

export const NoData = styled.div`
  font-family: var(--base-font-300);
  font-size: 1rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 5px;
`