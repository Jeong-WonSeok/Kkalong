import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styled from "styled-components";
import "./styles.css";
import SwiperCore from "swiper";
// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import { ClothesProps } from "../../pages/Closet/MainCloset";
import add_closet from "../../assets/icon/Closet/add_closet.png";

export default function Carousel({ sortclothes }: ClothesProps) {
  const navigate = useNavigate();
  const [closetId, setClosetId] = useState(0);
  const [swiper, setSwiper] = useState<SwiperCore>();
  // Swiper.on("transitionEnd", function () {
  //   console.log("now index :::", Swiper.realIndex);
  // });
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        onSwiper={(swiper) => console.log(swiper)}
        // pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <SlideButton
            onClick={() => {
              setClosetId(1);
            }}
          >
            <img src={sortclothes[0]} />
          </SlideButton>
          <SwiperText>여름 데일리</SwiperText>
        </SwiperSlide>
        <SwiperSlide>
          <SlideButton>
            <img src={sortclothes[1]} />
          </SlideButton>
          <SwiperText>가을 데일리</SwiperText>
        </SwiperSlide>
        <SwiperSlide>
          <SlideButton>
            <img src={sortclothes[2]} />
          </SlideButton>
          <SwiperText>자주 입는 옷</SwiperText>
        </SwiperSlide>

        {/* <SliderBorder> */}
        <SwiperSlide>
          <SlideButton2
            onClick={() => {
              navigate("/addcloset");
            }}
          >
            <ClosetIcon>
              <img src={add_closet} />
            </ClosetIcon>
            <BtnText>옷장 추가 하기</BtnText>
          </SlideButton2>
        </SwiperSlide>
        {/* </SliderBorder> */}
      </Swiper>
    </>
  );
}

let SwiperText = styled.p`
  color: black;
  display: flex;
  margin-left: 40px;
  font-family: var(--base-font-400);
  font-size: 18px;
`;

// let SliderBorder = styled.button`
//   height: 250px;
//   width: 250px;
//   border: #e5ddce 4px solid;
// `;
let SlideButton = styled.button`
  height: 150px;
  width: 150px;
  border: #e5ddce 4px solid;
  border-radius: 20px;
  background-color: white;
`;

let SlideButton2 = styled.button`
  height: 150px;
  width: 150px;
  border: #e5ddce 4px dotted;
  border-radius: 20px;
  background-color: white;
`;

let BtnText = styled.p`
  margin-top: 20px;
  color: #e5ddce;
`;

const ClosetIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  margin: auto;
`;
