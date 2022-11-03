import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled from 'styled-components';

export default function WeatherText({message} : {message:String[]}) {
  console.log(message)
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
  };
  return (
    <Container>
        <StyledSlider {...settings}>
          {message.map(msg => {
            return (
              <TextContainer>
                <TextP>{msg}</TextP>
              </TextContainer>
            )
          })}
        </StyledSlider>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const StyledSlider = styled(Slider)`
  .slick-list {
    width: 220px;
    height: 30px;
    padding: 0 10px;
  }
  .slick-slide {
    width: 200px;
  }
  .slick-track {
    overflow-x: hidden;
  }
`

const TextContainer = styled.div`
  width: 200px !important;
  padding: 5px 10px;
  height: 20px;
  background-color: var(--primary-color-100);
  border-radius: 30px;
`

const TextP = styled.p`
  font-family: var(--base-font-400);
  font-size: 14px;
  margin: 0;
`
