import { useEffect, useState } from "react";
import styled from "styled-components";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

import backArrow from "../../assets/icon/Nav/BackArrow.png";
import { BackArrow } from "../Community/MainBestDress";

import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";

import axios from '../../api/axios'
import requests from '../../api/requests'

interface ClothType {
  clothes_id: number
  img : string
  name : string
  type : string
  url : string
}

export default function VirtualBrandProduct() {
  const clothes = useLocation();
  const navigate = useNavigate();
  const params = useParams()
  const [Clothes, setClothes] = useState<ClothType>()

  useEffect(()=>{
    axios.get(requests.brand + params.brand_id + params.clothes_id)
      .then(res => {
        setClothes(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  },[])

  return (
    <VirtualBrandProductDiv>
      <TopNav type={""}>
        <BackArrow src={backArrow} onClick={()=>{navigate(-1)}}></BackArrow>
        <div style={{width:"30px", height:"30px"}}></div>
        <div style={{width:"30px", height:"30px"}}></div>

      </TopNav>
      <BrandProductName>{clothes.state.name}</BrandProductName>
      <BrandProductImgDiv>
        <BrandProductImg src={clothes.state.img}></BrandProductImg>
      </BrandProductImgDiv>
      <BrandProductBuyDiv>
        <BrandProductBuy>구매하기</BrandProductBuy>
        <BrandProductFitting>가상피팅하기</BrandProductFitting>
      </BrandProductBuyDiv>
      <FooterBar/>
    </VirtualBrandProductDiv>
  );
}

const VirtualBrandProductDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandProductName = styled.p`
  font-size: 1.2rem;
  font-family: var(--base-font-500);
  margin: 20px 10px;
`;

const BrandProductImgDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BrandProductImg = styled.img`
  width: 200px;
  height: 230px;
`;

const BrandProductBuyDiv = styled.div`
  position: fixed;
  bottom: 70px;
  max-width: 360px;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BrandProductBuy = styled.button`
  border: none;
  background-color: var(--primary-color-300);
  margin: auto;
  height: 30px;
  width: 150px;
  font-size: 0.9rem;
  font-family: var(--base-font-400);
  border-radius: 10px;
`;

const BrandProductFitting = styled(BrandProductBuy)`
  background-color: var(--primary-color-600);
  color: white;
`;
