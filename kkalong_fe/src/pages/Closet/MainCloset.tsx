import React, { useRef, useEffect, useState, useCallback } from "react";
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
import FormDataChange from "../../hooks/FormDataChange";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../../components/closet/Carousel";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import { EffectCoverflow, Pagination } from "swiper";
import SwiperCore from "swiper";

// import required modules
import add_closet from "../../assets/icon/Closet/add_closet.png";
import { loadSVGFromString } from "fabric/fabric-impl";

export interface ClothesProps {
  sortclothes: string[];
}

interface SendType {
  img: File;
}

  
interface imgSetType {
  color: string;
  img: string;
}

interface imgType {
  img: File;
}

interface dataType {
  closet_id: number;
  clothings: any[];
  codies: any[];
  name: string;
}

export default function MainCloset() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { User } = useAppSelector(state => state.User);
  const navigate = useNavigate();
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
  };
  let [clothes, setClothes] = useState([
    list,
    shirt,
    pants,
    outer,
    shoes,
    hat,
    hat,
  ]);
  let [cltext, setCltext] = useState([
    "전체",
    "상의",
    "하의",
    "아우터",
    "신발",
    "가방",
    "모자",
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
  let [closet, setCloset] = useState(Array<dataType>);
  const [SendData, setSendData] = useState<SendType>();
  let [sls, setSls] = useState("");
  let userProfile: any = localStorage.getItem("userProfile");
  userProfile = JSON.parse(userProfile);
  let userId = userProfile.user_id;
  let [clothings, setClothings] = useState<any[]>([]);
  const [clothesData, setClothesData] = useState<ClothesProps[]>([]);
  const navigate = useNavigate();
  const [closetId, setClosetId] = useState<number>();
  let [clothing, setClothing] = useState<imgSetType>();
  const [swiper, setSwiper] = useState<SwiperCore>();
  let [clothingId, setClothingId] = useState("");
  // console.log(userId);
  const inputRef = useRef<HTMLInputElement | null>(null);
  let [loading, setLoading] = useState(true);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      const formData = new FormData();
      formData.append("img", e.target.files[0]);
      console.log(formData);
      axios
        .post(requests.removeBackground, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setClothing(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    []
  );
  useEffect(() => {
    axios.get("closet/clothings/" + closetId).then((res) => {
      setClothings(res.data.clothings);
    });
  }, [closetId]);

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const GoCody = () => {
    // 추후 다른유저가 누를시는 바로 코디 제작 페이지로 넘어가게 할 예정
    if ((User.user_id === Number(params.userId)) || !params.userId) {
      navigate("/codi");
    } else if (User.loving && User.lover_id === Number(params.userId)) {
      navigate("/codi");
    } else {
      navigate('/pluscodi')
    }
  };
  const ChangePicture = (e: any) => {
    setSendData((state) => {
      return {
        // undefined 타입 지정 오류 처리
        ...(state as SendType),
        post_img: e.target.files[0],
      };
    });

    const Picture = document.getElementById("SelectPicture") as HTMLDivElement;
    // 위에 레이어 모두 삭제후
    Picture.replaceChildren();
    const ImgUrl = URL.createObjectURL(e.target.files[0]);
    Picture.style.backgroundImage = `url(${ImgUrl})`;
    Picture.style.backgroundPosition = "center";
    Picture.style.width = "auto";
  };
  const Submit = async () => {
    const result = FormDataChange(SendData);
    console.log(result);
    result.get("img");
    await axios
      .post(requests.removeBackground, result, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        navigate(`/`);
      })
      .catch((err) => console.error(err));
  };

  let [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(requests.closet + User.user_id)
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

  console.log(clothings);
  console.log(clothingId);
  return (
    <div>
      {loading ? 
        <>loading...</>
       : 
        <div>
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
                      <img src={closet[i].clothings[0]?.img} alt="no" />
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
            {cltext.map(function (a, i) {
              return (
                <ClothesBtn>
                  <img src={clothes[i]} />
                  <ClothesText>{cltext[i]}</ClothesText>
                </ClothesBtn>
              );
            })}
          </Category>
          <SortClothesContainer>
            {clothings.map(function (a, i) {
              return (
                <SortClothes
                  onClick={() => {
                    clothingId = clothings[i].clothing_id;
                    navigate("/clothes/detail", {
                      state: { closetId, clothingId },
                    });
                    axios
                      .get(
                        requests.addClothes + "/" + [clothings[i].clothing_id]
                      )
                      .then((res) => {
                        console.log(res);
                      });
                  }}
                >
                  <ClothesImg src={clothings[i]?.img} />
                </SortClothes>
              );
            })}
          </SortClothesContainer>
          <AddClothesContainer>
            <AddClothes
              onClick={() =>
                navigate("/closet/add", { state: { closetId, clothing } })
              }
            >
              <img src={camera} width="50px" />
            </AddClothes>
          </AddClothesContainer>
          <FooterBar />
        </div>
      )}
    </>
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

export const Category = styled.div`
  margin-top: 20px;
  width: 100%;
  /* max-width: 360px; */
  display: flex;
  flex-direction: row;

  overflow-x: auto;
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
  margin-left: 5px;
  border: solid 1px #67564e;
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

const CameraImg = styled.img`
  height: 40px;
  width: 45px;
  margin: 10px 1.5px;
`
