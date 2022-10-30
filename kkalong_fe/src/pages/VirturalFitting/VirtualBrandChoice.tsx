import React from 'react'
import styled from 'styled-components'
import Search from '../../components/ui/Search';
import SpaoIcon from '../../assets/icon/Brand/spao.png'
import HnMIcon from '../../assets/icon/Brand/h&m.png'
import EightSecondsIcon from '../../assets/icon/Brand/eight.png'
import ZaraIcon from '../../assets/icon/Brand/zara.png'



export default function VirtualBrandChoice() {
  return (
    <VirtualBrandChoiceDiv>
      <VirtualBrandChoiceText>브랜드 선택</VirtualBrandChoiceText>
      <VirtualUserSearch>유저검색</VirtualUserSearch>
      <Search></Search>
      <VirtualLine></VirtualLine>
      <VirtualBrandButtonDiv></VirtualBrandButtonDiv>
    </VirtualBrandChoiceDiv>
    );
}


//가상피팅 브랜드 선택 div
const VirtualBrandChoiceDiv = styled.div`
  display: flex;
  flex-direction: column;
`


const VirtualBrandChoiceText = styled.text`
  font-family: var(--base-font-600);
  margin: 15px 5px;
`
const VirtualUserSearch = styled.text`
  margin-left: 10px;
`

const VirtualLine = styled.hr`
  width : 90%;
  border : 1px solid #DED6C6;
  margin-top : 15px;
`


const VirtualBrandButtonDiv = styled.div`
  
`