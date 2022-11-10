import React, {useState} from "react";
import styled from "styled-components";


//placeholder 설정 해야됨
export default function Search({children, Search, StopSearch}: {children: any, Search: (Text: string) => Promise<void>, StopSearch: (value: React.SetStateAction<boolean>) => void}) {
  const [SearchText, setSearchText] = useState('')

  const IfEnter = (e:any) => {
    if(e.target.value === "Enter") {
      SendText()
    }
  }

  const SendText = () => {
    Search(SearchText)
  }

  const Stop = () => {
    console.log()
    setSearchText('')
    StopSearch(false)
  }

  return (
      <SearchContainer>
        <TextP>{children}</TextP>
        <SearchDiv>
          <div style={{position: 'relative', width: '70%'}}>
            <SearchInput placeholder="검색어를 입력해주세요" value={SearchText} onChange={(e:any)=>setSearchText(e.target.value)} onKeyUp={IfEnter}/>
            {SearchText && <StopDiv onClick={Stop}>X</StopDiv>}
          </div>
          <SearchButton onClick={SendText}>검색</SearchButton>
        </SearchDiv>
      </SearchContainer>
  ); 
}

const SearchContainer = styled.div`
  margin-bottom: 10px;
`

const TextP = styled.p`
  font-size: 1.2rem;
  font-family: var(--base-font-400);
  margin: 3px;
`

const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`


//검색 input
const SearchInput = styled.input`
  border : none;
  background-color: #FFF8F4 ;
  font-size: 0.9rem;
  font-family: var(--base-font-300);
  width : 100%;
  border-radius: 10px;
  text-indent: 5px;
  padding: 5px;
`

//검색 버튼
const SearchButton = styled.button`
  border : none;
  background-color: #CBA171;
  font-size: 0.9rem;
  width: 40px;
  border-radius: 10px;
  padding: 3px 7px;
  font-family: var(--base-font-300);
  text-align: center;
`

const StopDiv = styled.div`
  position: absolute;
  top: 5px;
  right: -3px;
  width: 20px;
  height: 20px;
  background-color: var(--primary-color-900);
  border-radius: 15px;
  text-align: center;
  color: white;
  font-family: var(--base-font-300);
`