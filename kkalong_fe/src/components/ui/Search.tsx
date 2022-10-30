import React from "react";
import styled from "styled-components";


//placeholder 설정 해야됨
export default function Search() {
    // let ph = JSON.stringify(props.props);
    // const text = ph.substr(ph.length-(ph.length-1), ph.length-2)
    return (
        <SearchDiv>
            <SearchInput  ></SearchInput>
            <SearchButton>검색</SearchButton>
            
        </SearchDiv>
    );
}

const SearchDiv = styled.div`
    display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`


//검색 input
const SearchInput = styled.input`
  border : none;
  background-color: #FFF8F4 ;
  width : 70%;
  border-radius: 5px;
`

//검색 버튼
const SearchButton = styled.button`
  border : none;
  background-color: #CBA171;
  border-radius: 5px;

  
`