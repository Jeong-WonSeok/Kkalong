import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";
import logo from "../../assets/icon/logo/kkalongLogo.png";
import menu from "../../assets/icon/Nav/menu.png";
import hat from "../../assets/icon/Closet/hat.png";
import list from "../../assets/icon/Closet/list.png";
import outer from "../../assets/icon/Closet/outer.png";
import pants from "../../assets/icon/Closet/pants.png";
import shoes from "../../assets/icon/Closet/shoes.png";
import shirt from "../../assets/icon/Closet/shirt.png";
import codi1 from "../../img/codi1.png";
import codi2 from "../../img/codi2.png";
import codi3 from "../../img/codi3.png";
import add_codi from "../../assets/icon/Closet/add_codi.png";
import Bar from "../../assets/icon/Closet/Bar.png";
import camera from "../../assets/icon/Closet/add_clothes.png";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import Carousel from "../../components/closet/Carousel";
import img1 from "../../img/img1.png";
import img2 from "../../img/img2.png";
import img3 from "../../img/img3.png";
import img4 from "../../img/img4.png";
import img5 from "../../img/img5.png";
import img6 from "../../img/img6.png";
import img7 from "../../img/img7.png";
import { SelectBtnContainer } from "./MainCloset";
import add_closet from "../../assets/icon/Closet/add_closet.png";
import requests from "../../api/requests";
import axios from "../../api/axios";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import { EffectCoverflow, Pagination } from "swiper";
import SwiperCore from "swiper";

interface dataType {
  closet_id: number;
  clothings: any[];
  codies: any[];
  name: string;
}

export default function CodiPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [closetId, setClosetId] = useState(0);
  let [closet, setCloset] = useState(Array<dataType>);
  let [loading, setLoading] = useState(true);
  let userProfile: any = localStorage.getItem("userProfile");
  userProfile = JSON.parse(userProfile);
  let userId = userProfile.user_id;
  const settings = {
    className: "center",
    dots: true,
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
  let [sortclothes, setSortclothes] = useState([
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
  ]);
  let [btn, setBtn] = useState(false);
  let [codi, setCodi] = useState([codi1, codi2, codi3, codi1]);
  useEffect(() => {
    axios
      .get(requests.closet + userId)
      .then((res) => {
        closet = res.data.closets;
        setCloset(res.data.closets);
        console.log(closet);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div>
      <TopNav type={"menu"}>
        <CategoryText1>코디</CategoryText1>
        <div style={{ width: "54px", height: "38px" }}>
          <MenuIcon src={menu} />
        </div>
      </TopNav>
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
                {closet[i].codies[i] ? (
                  <img src={closet[i].codies[i].img} alt="no" />
                ) : null}
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
      <>
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

          <SelectBtn>
            <SelectColor2 />
            <SelectText>코디</SelectText>
          </SelectBtn>
        </SelectBtnContainer>
      </>
      <>
        {/* <CodiContainer>
          {closet[0].closet_id === closetId &&
            closet[0].codies.map(function (a, i) {
              return (
                <ClothesCodi>
                  {closet[i].codies[i] ? (
                    <CodiImg src={closet[i].codies[i].img} alt="no" />
                  ) : null} */}
        {/* <CodiImg src={closet[i].codies[i].img} alt="no" /> */}
        {/* </ClothesCodi>
              );
            })} */}

        <CodiPlus
          onClick={() => {
            navigate("/pluscodi", { state: { closetId } });
          }}
        >
          <img src={add_codi} />
        </CodiPlus>
        {/* </CodiContainer> */}

        <FooterBar />
      </>
    </div>
  );
}

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

const MenuIcon = styled.img`
  width: 30px;
  height: 30px;
  padding: 4px 0;
`;

const SelectBtn = styled.button`
  width: 170px;
  height: 30px;
  border-radius: 10px 10px 0px 0px;
  background-color: white;
  border: none;
  margin-right: 10px;
`;

const SelectColor2 = styled.div`
  height: 12px;
  width: 170px;
  background-color: var(--primary-color-500);
  border-radius: 10px 10px 0px 0px;
  margin-left: 0px;
  padding: 0px;
`;
const SelectColor1 = styled.div`
  height: 12px;
  width: 170px;
  background-color: var(--primary-color-800);
  border-radius: 10px 10px 0px 0px;
`;

const CodiContainer = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

//코디 버튼
const ClothesCodi = styled.button`
  height: 140px;
  width: 140px;
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  border: solid 2px #e5ddce;
  padding: 0;
`;

const AddClothes = styled.button`
  height: 70px;
  width: 70px;
  border-radius: 50px;
  box-shadow: 2px 2px 3px 2px grey;
  position: absolute;
  right: 10px;
  border: none;
  top: 850px;
  background-color: white;
  background-size: auto;
  background-image: url("../../assets/icon/Closet/arrow-left.png");
`;

const CodiPlus = styled.button`
  height: 140px;
  width: 140px;
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  border: dotted 2px #e5ddce;
`;

const CodiImg = styled.img`
  max-width: 140px;
  max-height: 140px;
`;

const BtnBar = styled.div`
  width: 1px;
  border: solid black 1px;
`;

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
