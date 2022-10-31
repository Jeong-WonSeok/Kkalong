import styled from 'styled-components';

export default function VirtualBrand() {
    return(
        <VirtualBrandDiv>
            <VirtualBrandText>브랜드 선택</VirtualBrandText>
        </VirtualBrandDiv>
        )
}

const VirtualBrandDiv = styled.div`
    
`

const VirtualBrandText = styled.text`
  font-family: var(--base-font-600);
  margin: 15px 5px;
`