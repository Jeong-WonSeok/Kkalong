import React, {useEffect, useState} from "react";
import styled, { css, keyframes } from "styled-components";

type animationType = {
  Open: boolean
  FirstNot: number
}

export default function Search({children, Open, Search, StopSearch}: {children: any, Open:boolean,  Search: (Text: string) => Promise<void>, StopSearch: (value: React.SetStateAction<boolean>) => void}) {
  const [SearchText, setSearchText] = useState('')
  // 배경창 처음표시시 애니메이션 효과를 안받기위해서 설정하는 값
  const [FirstNot, setFirstNot] = useState(-1)

  useEffect(() => {
    const app = document.getElementById('App') as HTMLDivElement
    if (Open) {
      app.style.marginTop = '144px'
    } else {
      app.style.marginTop = '60px'
    }
    
    setFirstNot(FirstNot+1)
  
    return () => {
      setFirstNot(0)
      app.style.marginTop = '60px'
    }
  }, [Open])
  
  const InputText = (e:any) => {
    if (e.target.value === '') {
      StopSearch(false)
      setSearchText('')
    } else {
      setSearchText(e.target.value)
    }
  }

  const IfEnter = (e:any) => {
    if(e.key === "Enter") {
      SendText()
    }
  }

  const SendText = () => {
    Search(SearchText)
  }

  const Stop = () => {
    setSearchText('')
    StopSearch(false)
  }

  return (
      <SearchContainer Open={Open} FirstNot={FirstNot}>
        <TextP>{children}</TextP>
        <SearchDiv>
          <div style={{position: 'relative', width: '70%'}}>
            <SearchInput placeholder="검색어를 입력해주세요" value={SearchText} onChange={InputText} onKeyPress={IfEnter}/>
            {SearchText && <StopDiv onClick={Stop}>X</StopDiv>}
          </div>
          <SearchButton onClick={SendText}>검색</SearchButton>
        </SearchDiv>
      </SearchContainer>
  ); 
}

const EnterSearch = keyframes`
  0% {
    height: 0;
    -webkit-transform: translateY(-100px);
            transform: translateY(-100px);
    opacity: 0;
  };
  100% {
    height: auto;
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  };
`

const ExitSearch = keyframes`
  0% {
    height: auto;
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  100% {
    height: 0;
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
`

const SearchContainer = styled.div<animationType>`
  margin-bottom: 10px;
  position: fixed;
  top: 50px;
  padding: 10px 0;
  background-color: white;
  width: 100%;
  max-width: 360px;
  display: ${props => props.FirstNot ? '' : 'none'};
  animation: ${props => props.Open ? 
   css `${EnterSearch} 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both` :
   css `${ExitSearch} 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both`};
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