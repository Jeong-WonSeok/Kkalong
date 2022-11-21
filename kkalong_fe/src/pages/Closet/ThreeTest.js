import Example from "../../components/closet/Example";
import styled, { keyframes } from 'styled-components'
import BackArrow from "../../assets/icon/Login/arrow.png"
import { useNavigate } from "react-router-dom";

const ThreeTest = () => {

  const navigate = useNavigate();

  const SkipHandler = () => {
    navigate("/closet")
  }

  return (
    <>

      <Bouncediv>
        <div>
          <Bounce>가</Bounce>
          <Bounce>상</Bounce>
          <Bounce>피</Bounce>
          <Bounce>팅</Bounce>
          <Bounce> </Bounce>
          <Bounce>입</Bounce>
          <Bounce>장</Bounce>
          <Bounce>중</Bounce>
          <Bounce>.</Bounce>
          <Bounce>.</Bounce>
        </div>
        <SkipDiv onClick={SkipHandler}>
        <SkipButton>바로 입장하기</SkipButton>
        <BackArrowImg src={BackArrow}></BackArrowImg>
        </SkipDiv>
      </Bouncediv>
      <Example />
    </>
  );
};

export default ThreeTest;

const Bouncediv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
`

const BounceEffect = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;



const Bounce = styled.span`
font-family: var(--base-font-300);

&:nth-child(1) {
 animation: ${BounceEffect} 2s linear infinite
}
&:nth-child(2) {
 animation: ${BounceEffect} 2s linear infinite;
 animation-delay: 0.1s;

}
&:nth-child(3) {
 animation: ${BounceEffect} 2s linear infinite;
 animation-delay: 0.2s;
}
&:nth-child(4) {
 animation: ${BounceEffect} 2s linear infinite;
 animation-delay: 0.3s;
}
&:nth-child(5) {
 animation: ${BounceEffect} 2s linear infinite;
 animation-delay: 0.4s;
}
&:nth-child(6) {
 animation: ${BounceEffect} 2s linear infinite;
 animation-delay: 0.5s;
}
&:nth-child(7) {
 animation: ${BounceEffect} 2s linear infinite;
 animation-delay: 0.6s;
}
&:nth-child(8) {
 animation: ${BounceEffect} 2s linear infinite;
 animation-delay: 0.7s;
}
&:nth-child(9) {
 animation: ${BounceEffect} 2s linear infinite;
 animation-delay: 0.8s;
}
&:nth-child(10) {
 animation: ${BounceEffect} 2s linear infinite;
 animation-delay: 0.9s;
}
 `

const SkipButton = styled.button`
  border : none;
  border-radius: 2px;
  background-color: #FFFFFF;
  font-family: var(--base-font-300);  

`

const BackArrowImg = styled.img`
  width: 25px;
  height: 25px;
`

const SkipDiv = styled.div`
  display: flex;
  flex-direction: row;

`