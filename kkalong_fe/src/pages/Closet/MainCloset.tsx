import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
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
import axios from "../../api/axios";
import requests from "../../api/requests";
// import { ClothesProps } from "../../components/closet/Carousel";
export interface ClothesProps {
  sortclothes: string[];
}
export default function MainCloset() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  let [sls, setSls] = useState("");

  const [clothesData, setClothesData] = useState<ClothesProps[]>([]);
  axios
    .get(requests.Profile)
    .then((res) => {
      localStorage.setItem("userProfile", JSON.stringify(res.data.user));
      navigate("/closet");
    })
    .catch((err) => {
      console.log(err);
    });

  useEffect(() => {}, []);

  return (
    <div style={{ marginBottom: "70px" }}>
      <TopNav type={"menu"}>
        <CategoryText1>옷장</CategoryText1>
        <div style={{ width: "54px", height: "38px" }}>
          <MenuIcon src={menu} />
        </div>
      </TopNav>

      <>
        <Carousel sortclothes={sortclothes} />
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
          <SelectBtn
            onClick={() => {
              navigate("/codi");
            }}
          >
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
        {sortclothes.map(function (a, i) {
          return (
            <SortClothes>
              <ClothesImg src={sortclothes[i]} />
            </SortClothes>
          );
        })}
      </SortClothesContainer>

      <AddClothesContainer>
        <AddClothes onClick={() => navigate("/closet/add")}>
          <img src={camera} />
        </AddClothes>
      </AddClothesContainer>
      <FooterBar />
    </div>
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
