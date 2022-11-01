import styled from "styled-components";
import { BackArrow } from "../Community/MainBestDress";
import backArrow from "../../assets/icon/Nav/BackArrow.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";

export default function VirtualBrandProduct() {
  const clothes = useLocation();

    const navigate = useNavigate();



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

const BrandProductName = styled.text`
  font-family: var(--base-font-500);
  margin: 30px 30px;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 50px 30px;
`;

const BrandProductBuy = styled.button`
  border: none;
  background-color: #cba171;
  margin: auto 20px;
  width: 30%;
  font-family: var(--base-font-400);
  border-radius: 10px;
`;

const BrandProductFitting = styled.button`
  border: none;
  background-color: #aa8b77;
  margin: auto 20px;
  width: 30%;
  font-family: var(--base-font-400);
  border-radius: 10px;
`;
