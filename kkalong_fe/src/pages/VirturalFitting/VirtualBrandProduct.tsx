import styled from 'styled-components'
import { BackArrow } from '../Community/MainBestDress'
import backArrow from '../../assets/icon/Nav/BackArrow.png'
import { useLocation } from 'react-router-dom';

export default function VirtualBrandProduct() {
    
    const clothes = useLocation();
    
    
    return (
        <VirtualBrandProductDiv>
            <BackArrow src={backArrow}></BackArrow>
            <BrandProductName>{clothes.state.name}</BrandProductName>
            <BrandProductImgDiv>
                <BrandProductImg src={clothes.state.img}></BrandProductImg>
            </BrandProductImgDiv>
            <BrandProductBuyDiv>
                <BrandProductBuy>구매하기</BrandProductBuy>
                <BrandProductFitting>가상피팅하기</BrandProductFitting>
            </BrandProductBuyDiv>
        </VirtualBrandProductDiv>
        
    )
}


const VirtualBrandProductDiv = styled.div`
   display: flex;
   flex-direction: column;
`

const BrandProductName = styled.text`
  font-family: var(--base-font-500);
  margin : 30px 30px;
    
`

const BrandProductImgDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const BrandProductImg = styled.img`
    width : 200px;
    height: 230px;
`

const BrandProductBuyDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content : center;
    margin : 50px 30px;
`

const BrandProductBuy = styled.button`
    border : none;
    background-color: #CBA171;
    margin : auto 20px;
    width : 30%;
    font-family: var(--base-font-400);
    border-radius: 10px;

`

const BrandProductFitting = styled.button`
    border : none;
    background-color: #AA8B77;
    margin : auto 20px;
    width : 30%;
    font-family: var(--base-font-400);
    border-radius: 10px;

`