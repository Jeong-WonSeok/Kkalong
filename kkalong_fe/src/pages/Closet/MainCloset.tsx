import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";

import styled from "styled-components";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";
import axios from "../../api/axios";
import requests from "../../api/requests";
//import png
import menu from "../../assets/icon/Nav/menu.png";
import hat from "../../assets/icon/Closet/hat.png";
import list from "../../assets/icon/Closet/list.png";
import outer from "../../assets/icon/Closet/outer.png";
import pants from "../../assets/icon/Closet/pants.png";
import shoes from "../../assets/icon/Closet/shoes.png";
import shirt from "../../assets/icon/Closet/shirt.png";
import img1 from "../../img/img1.png";
import img2 from "../../img/img2.png";
import img3 from "../../img/img3.png";
import img4 from "../../img/img4.png";
import img5 from "../../img/img5.png";
import img6 from "../../img/img6.png";
import img7 from "../../img/img7.png";
import Bar from "../../assets/icon/Closet/Bar.png";
import camera from "../../assets/icon/Closet/add_clothes.png";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../../components/closet/Carousel";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import SwiperCore from "swiper";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import add_closet from "../../assets/icon/Closet/add_closet.png";
import { loadSVGFromString } from "fabric/fabric-impl";
export interface ClothesProps {
  sortclothes: string[];
}
export default function MainCloset() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
  };
  let [clothes, setClothes] = useState([list, shirt, hat, outer, pants, shoes]);
  let [cltext, setCltext] = useState([
    "전체",
    "상의",
    "겉옷",
    "하의",
    "신발",
    "악세서리",
  ]);
  let [btn, setBtn] = useState(false);
  let [sortclothes, setSortclothes] = useState([
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
  ]);
  interface dataType {
    closet_id: number;
    clothings: any[];
    codies: any[];
    name: string;
  }
  let [closet, setCloset] = useState(Array<dataType>);

  // useEffect(() => {
  //   setCloset([

  //   ]);
  // }, []);
  let [sls, setSls] = useState("");
  let userProfile: any = localStorage.getItem("userProfile");
  userProfile = JSON.parse(userProfile);
  let userId = userProfile.user_id;

  const [clothesData, setClothesData] = useState<ClothesProps[]>([]);
  const GoCody = () => {
    navigate("/codi");
  };
  const navigate = useNavigate();
  const [closetId, setClosetId] = useState(0);
  const [swiper, setSwiper] = useState<SwiperCore>();
  // console.log(userId);

  // const start = () => {
  // axios
  //   .get(requests.closet + userId)
  //   .then((res) => {
  //     let clo = [...closet];
  //     [...closet] = res.data.closets;
  //     setCloset(clo);
  //     console.log(closet);
  //   })
  //   .catch((res) => {
  //     console.log(res);
  //   });
  // };
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios(requests.closet + userId);
      let clo = [...closet];
      [...closet] = res.data.closets;
      setCloset(clo);
      console.log(closet);
      setLoading(false);
    };
    fetchData();

    // setLoading(true)
    // const result = await axios
    //     .get(requests.closet + userId)
    //     .then((res) => {
    //       closet = res.data.closets;
    //       console.log(closet);
    //     })
    //     .catch((res) => {
    //       console.log(res);
    //     });
    //   setLoading(false);
    // };
  }, []);
  // const start = async () => {
  //   if (params.UserId) {
  //     // 타인이 볼 때
  //     const res = await axios.get(requests.closet + params.UserId);
  //   } else {
  //     // 자기자신
  //     const res = await axios.get(requests.closet + params.UserId);
  //   }
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.get(requests.closet + userId);
  //     return response.data;
  //   }
  //   fetchData().then((res) => {
  //     setCloset(res);
  //   });
  // }, []);

  return (
    <>
      {loading ? (
        <>loading...</>
      ) : (
        <div style={{ marginBottom: "70px" }}>
          <TopNav type={"menu"}>
            <CategoryText1>옷장</CategoryText1>
            <div style={{ width: "54px", height: "38px" }}>
              <MenuIcon src={menu} />
            </div>
          </TopNav>
          <>
            {/* <Carousel sortclothes={sortclothes} /> */}
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
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {closet.map((a, i) => {
                return (
                  <SwiperSlide>
                    <SlideButton
                      onClick={() => {
                        setClosetId(closet[i].closet_id);
                        console.log(closetId);
                      }}
                    >
                      <img src={sortclothes[i]} />
                    </SlideButton>
                    <SwiperText>{closet[i].name}</SwiperText>
                  </SwiperSlide>
                );
              })}

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

            <SelectBtnContainer>
              <SelectBtn
                onClick={() => {
                  navigate("/closet");
                }}
              >
                <SelectColor1 />
                <SelectText>옷장</SelectText>
              </SelectBtn>
              <img src={Bar} />
              <SelectBtn onClick={GoCody}>
                <SelectColor2 />
                <SelectText>코디</SelectText>
              </SelectBtn>
            </SelectBtnContainer>
          </>
          <Category>
            {clothes.map(function (a, i) {
              return (
                <ClothesBtn>
                  <img src={clothes[i]} />
                  <ClothesText>{cltext[i]}</ClothesText>
                </ClothesBtn>
              );
            })}
          </Category>
          <SortClothesContainer>
            {/* {closet[0].clothings.map(function (a, i) {
              return (
                <SortClothes>
                  <ClothesImg src={closet[0].clothings[i].img} />
                </SortClothes>
              );
            })} */}
          </SortClothesContainer>

          <AddClothesContainer>
            <AddClothes
              onClick={() => navigate("/closet/add", { state: { closetId } })}
            >
              <img src={camera} />
            </AddClothes>
          </AddClothesContainer>
          <FooterBar />
        </div>
      )}
    </>
  );
}

// const BestContainer = styled(Container)`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
// `;

const CategoryText1 = styled.p`
  margin: auto 0;
  font-family: var(--base-font-600);
`;

const SelectText = styled.p`
  margin: 0;
  font-size: 15px;
  font-family: var(--base-font-400);
  color: #6b6060;
`;

export const Category = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const MenuIcon = styled.img`
  width: 30px;
  height: 30px;
  padding: 4px 0;
`;

export const SelectBtnContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin-top: 10px;
  height: 30px;
  display: flex;
  flex-direction: row;
`;

const SelectBtn = styled.button`
  width: 170px;
  height: 30px;
  border-radius: 10px 10px 0px 0px;
  background-color: white;
  border: none;
  margin-right: 10px;
`;

const SelectColor1 = styled.div`
  height: 12px;
  width: 170px;
  background-color: var(--primary-color-500);
  border-radius: 10px 10px 0px 0px;
  margin-left: 0px;
  padding: 0px;
`;

const SelectColor2 = styled.div`
  height: 12px;
  width: 170px;
  background-color: var(--primary-color-800);
  border-radius: 10px 10px 0px 0px;
`;

const ClothesBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  border: solid 2px #67564e;
  background-color: white;
`;

const ClothesText = styled.p`
  width: 170px;
  line-height: 1;
  margin: 0;
  font-family: var(--base-font-500);
  font-size: 10px;
  color: var(--primary-color-900);
`;

export const SortClothesContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
`;

export const SortClothes = styled.button`
  padding: 0;
  height: 90px;
  width: 90px;
  margin: 15px;
  background-color: white;
  border-radius: 20px;
  border: solid 2px #e5ddce;
`;

export const ClothesImg = styled.img`
  max-width: 80px;
  max-height: 80px;
`;

const AddClothesContainer = styled.div`
  width: 100%;
  max-width: 360px;
  height: 70px;
  position: fixed;
  bottom: 70px;
  left: auto;
`;

const AddClothes = styled.button`
  height: 60px;
  width: 60px;
  border-radius: 50px;
  box-shadow: 2px 2px 3px 2px grey;
  position: absolute;
  right: 10px;
  border: none;
  top: 0px;
  background-color: white;
  background-size: auto;
  background-image: url("../../assets/icon/Closet/arrow-left.png");
`;

//carousel

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
