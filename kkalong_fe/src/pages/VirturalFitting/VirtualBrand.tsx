import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import clothes1 from "../../assets/icon/Clothes/clothes1.png";
import clothes2 from "../../assets/icon/Clothes/clothes2.png";
import clothes3 from "../../assets/icon/Clothes/clothes3.png";
import clothes4 from "../../assets/icon/Clothes/clothes4.png";
import clothes5 from "../../assets/icon/Clothes/clothes5.png";
import clothes6 from "../../assets/icon/Clothes/clothes6.png";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";
import backArrow from "../../assets/icon/Nav/BackArrow.png";

import axios from '../../api/axios'
import requests from '../../api/requests'
import { NoData } from "./VirtualBrandChoice";

interface BrnadClothesType {
  clothes_id: {img: string}
}

export default function VirtualBrand() {
  const navigate = useNavigate();
  const logo = useLocation();
  const params = useParams()

  const [BrnadClothes, setBrandClothes] = useState(Array<BrnadClothesType>);

  useEffect(() => {
    axios.get(requests.brand + params.brand_id)
      .then(res => {
        setBrandClothes(res.data.brand_id)
      })
      .catch(err => {
        console.error(err)
      })
  }, []);
  return (
    <VirtualBrandDiv>
        <TopNav type={""}>
            <VirtualBrandBackArrow src={backArrow} onClick={()=>navigate(-1)}></VirtualBrandBackArrow>
            <VirtualBrandLogo src={logo.state.img}></VirtualBrandLogo>
            <div style={{width:"30px", height:"30px"}}></div>
        </TopNav>
      <VirtualBrandProductDiv>
        {BrnadClothes.length ? BrnadClothes.map((clothes, idx) => {
          return (
            <VirtualBrandProduct
              key={idx}
              src={clothes.clothes_id.img}
              onClick={() =>
                navigate(`${idx}`)
              }
            ></VirtualBrandProduct>
          );
        }) :
        <NoData>게시된 상품이 없습니다</NoData>}
      </VirtualBrandProductDiv>
      <FooterBar/>
    </VirtualBrandDiv>
  );
}

//전체 div
const VirtualBrandDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

//브랜드 선택
const VirtualBrandText = styled.text`
  font-family: var(--base-font-600);
  margin: 15px 5px;
`;

//로고 담은 div
const VirtualBrandLogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

//뒤로가기
const VirtualBrandBackArrow = styled.img`
    width : 30px;
    height : 30px;
`

//가운데 로고
const VirtualBrandLogo = styled.img`
  width: 60px;
  height: 30px;
`;

// 각 상품(옷) 담은 div
const VirtualBrandProductDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

//각 상품
const VirtualBrandProduct = styled.img`
  width: 30%;
  margin-top: 10px;
`;
