import React from 'react'
import styled, { keyframes } from 'styled-components';

export default function Slider({children} : {children:any}) {
  let posY = 0;
  let originalY = 0;

  const dragStartHandler = (e:any) => {
    const CodyDiv = document.getElementById('move') as HTMLDivElement
    // 현재 y의 위치
    posY = e.clientY ? e.clientY : e.changedTouches[0].clientY
    originalY = CodyDiv.offsetTop
  };

  const dragHandler = (e:any) => {
    const CodyDiv = document.getElementById('move') as HTMLDivElement
    const moveY = e.clientY ? e.clientY : e.changedTouches[0].clientY
    CodyDiv.style.top = `${CodyDiv.offsetTop + moveY - posY}px`;
    if (Number(CodyDiv.style.top) < 240) {
      CodyDiv.style.height = `740 - ${CodyDiv.style.top}`
    } else {
      CodyDiv.style.height = '500px'
    }
    posY = moveY
  };

  const dragEndHandler = (e:any) => {
    const moveY = e.clientY ? e.clientY : e.changedTouches[0].clientY
    const CodyDiv = document.getElementById('move') as HTMLDivElement
    if (originalY < moveY) {
      CodyDiv.style.top = ''
      CodyDiv.style.bottom = '-380px'
    } else if (originalY > posY) {
      CodyDiv.style.top = ''
      CodyDiv.style.bottom = '0px'
    }
  };
  
  return (
    <CodyContainer id="move">
      <TopSlider
        onDragStart={dragStartHandler} 
        onTouchStart={dragStartHandler}
        onDrag={dragHandler} 
        onTouchMove={dragHandler}
        onDragEnd={dragEndHandler}
        onTouchEnd={dragEndHandler}>
        <TopSliderButton></TopSliderButton>
      </TopSlider>
      {children}
  </CodyContainer>
  )
}


const SliderOpenEvent = keyframes`
  0% {
    -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`

const CodyContainer = styled.div`
  border-radius: 20px 20px 0 0;
  border-top: 3px solid var(--primary-color-900);
  position: fixed;
  bottom: 0px;
  left: auto;
  background-color: white;
  height: 500px;
  width: 100%;
  max-width: 360px;
  animation: ${SliderOpenEvent} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  /* 선택하다가 푸터바를 건들이지 않기 위한 z-index */
  z-index: 5;
`

const TopSlider = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 360px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TopSliderButton = styled.div`
  width: 60px;
  height: 7px;
  background-color: var(--primary-color-900);
  border-radius: 5px;
`