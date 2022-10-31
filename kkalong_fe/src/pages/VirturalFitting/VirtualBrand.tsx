import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clothes1 from '../../assets/icon/Clothes/clothes1.png';
import clothes2 from '../../assets/icon/Clothes/clothes2.png';
import clothes3 from '../../assets/icon/Clothes/clothes3.png';
import clothes4 from '../../assets/icon/Clothes/clothes4.png';
import clothes5 from '../../assets/icon/Clothes/clothes5.png';
import clothes6 from '../../assets/icon/Clothes/clothes6.png';


export default function VirtualBrand() {

  const logo = useLocation();

  interface BrnadClothesType {
    img: string,
    name : string, 
    clothes_id : number
  }

  const navigate = useNavigate();

  const [BrnadClothes, setBrandClothes] = useState(Array<BrnadClothesType>);


  useEffect(() => {
    setBrandClothes([{
      img: clothes1,
      name: "네이비 맨투맨",
      clothes_id : 1
    },{
      img: clothes2,
      name: "흰색 긴팔",
      clothes_id : 2
    },{
      img: clothes3,
      name: "청색 셔츠",
      clothes_id : 3
    },{
      img: clothes4,
      name: "여자옷임",
      clothes_id : 4
    },{
      img: clothes5,
      name: "우디 맨투맨",
      clothes_id : 5
    },{
      img: clothes6,
      name: "흰색 가디건",
      clothes_id : 6
    }])
  },[])
    return(
        <VirtualBrandDiv>
          <VirtualBrandText>브랜드 선택</VirtualBrandText>
          <VirtualBrandLogoDiv>
            <VirtualBrandLogo src={logo.state.img}></VirtualBrandLogo>
          </VirtualBrandLogoDiv>
        <VirtualBrandProductDiv>
          {BrnadClothes.map((clothes) => {
            return (
              <VirtualBrandProduct src={clothes.img} onClick={()=> navigate(`${clothes.clothes_id}`,{state : clothes})}></VirtualBrandProduct>
            )
          })}
        </VirtualBrandProductDiv>
        </VirtualBrandDiv>
        )
}

//전체 div
const VirtualBrandDiv = styled.div`
    display: flex;
    flex-direction: column;
`

//브랜드 선택
const VirtualBrandText = styled.text`
  font-family: var(--base-font-600);
  margin: 15px 5px;
`

//로고 담은 div
const VirtualBrandLogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content : center;
  align-items:center;
`

//가운데 로고
const VirtualBrandLogo = styled.img`
  width : 90px;
  height : 50px;
`

// 각 상품(옷) 담은 div
const VirtualBrandProductDiv = styled.div`
  display : flex;
  flex-direction: row;
  flex-wrap : wrap;
  justify-content: center;
`

//각 상품
const VirtualBrandProduct = styled.img`
  width : 30%;
  margin : 2px;
`