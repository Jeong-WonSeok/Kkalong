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

export default function CodiPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  let [cltext, setCltext] = useState(["전체","상의","겉옷","하의","신발","악세서리"]);
  let [sortclothes, setSortclothes] = useState([img1,img2,img3,img4,img5,img6,img7]);
  let [btn, setBtn] = useState(false);
  let [codi, setCodi] = useState([codi1, codi2, codi3, codi1]);
  useEffect(() => {}, []);

  return (
    <div>
      <TopNav type={"menu"}>
        <CategoryText1>코디</CategoryText1>
        <div style={{width: '54px', height: '38px'}}>
          <MenuIcon src={menu} />
        </div>  
      </TopNav>
      <Carousel sortclothes={sortclothes} />
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
      <CodiContainer>
        {codi.map(function (a, i) {
          return (
            <ClothesCodi>
              <CodiImg src={codi[i]} />
            </ClothesCodi>
          );
        })}

        <CodiPlus
          onClick={() => {
            navigate("/pluscodi");
          }}
        >
          <img src={add_codi} />
        </CodiPlus>
      </CodiContainer>

        
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
`

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
`

const BtnBar = styled.div`
  width: 1px;
  border: solid black 1px;
`;
