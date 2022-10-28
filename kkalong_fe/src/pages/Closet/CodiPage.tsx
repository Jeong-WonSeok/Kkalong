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

export default function CodiPage() {
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
  let [codi, setCodi] = useState([codi1, codi2, codi3, codi1]);
  useEffect(() => {}, []);

  return (
    <div>
      <TopNav type={""}>
        <Logo src={logo} />
        <CategoryText1>코디</CategoryText1>
        <div style={{ width: "30px", height: "30px" }}></div>
        <MenuIcon src={menu} />
      </TopNav>
      <Slider {...settings}>
        <div>
          <img src={camera} alt="no" />
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
      <>
        <SelectBtn1>
          <SelectColor1 />
          <SelectText1>옷장</SelectText1>
        </SelectBtn1>
        <img src={Bar} />
        <SelectBtn2>
          <SelectColor2 />
          <SelectText2>코디</SelectText2>
        </SelectBtn2>
      </>
      {/* {clothes.map(function (a, i) {
        return (
          <ClothesBtn>
            <img src={clothes[i]} />
            <ClothesText>{cltext[i]}</ClothesText>
          </ClothesBtn>
        );
      })} */}
      <>
        {codi.map(function (a, i) {
          return (
            <ClothesCodi>
              <img src={codi[i]} />
            </ClothesCodi>
          );
        })}
        <CodiPlus>
          <img src={add_codi} />
        </CodiPlus>
        <FooterBar />
      </>
    </div>
  );
}

const Logo = styled.img`
  width: 50px;
  height: 30px;
  margin: auto 0;
`;

const CategoryText1 = styled.p`
  line-height: 0;
  margin: auto;
  font-family: var(--base-font-400);
`;

const SelectText1 = styled.p`
  line-height: 0;
  margin-top: 10px;
  font-size: 15px;
  font-family: var(--base-font-400);
  color: #6b6060;
`;

const SelectText2 = styled.p`
  line-height: 0;
  margin-top: 10px;
  font-size: 15px;
  font-family: var(--base-font-400);
  color: #6b6060;
`;

const MenuIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0;
`;

const SelectBtn1 = styled.button`
  margin-top: 300px;
  width: 190px;
  height: 30px;
  border-radius: 10px 10px 0px 0px;
  background-color: white;
  border: none;
  margin-right: 10px;
`;
const SelectColor1 = styled.div`
  height: 12px;
  width: 190px;
  background-color: var(--primary-color-500);
  border-radius: 10px 10px 0px 0px;
  margin-left: 0px;
  padding: 0px;
`;
const SelectColor2 = styled.div`
  height: 12px;
  width: 190px;
  background-color: var(--primary-color-800);
  border-radius: 10px 10px 0px 0px;
`;
const SelectBtn2 = styled.button`
  margin-top: 300px;
  width: 190px;
  height: 30px;
  border-radius: 10px 10px 0px 0px;
  background-color: white;
  margin-left: 5px;
  border: none;
`;

//코디 버튼
const ClothesCodi = styled.button`
  height: 150px;
  width: 150px;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: auto;
  background-color: white;
  border-radius: 20px;
  border: solid 1px #e5ddce;
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
  height: 150px;
  width: 150px;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: auto;
  background-color: white;
  border-radius: 20px;
  border: dotted 1px #e5ddce;
`;
