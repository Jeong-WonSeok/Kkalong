import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import styled from "styled-components";

import TopNav from "../../components/ui/TopNav";

import Close from "../../assets/icon/Nav/close.png";
import axios from "../../api/axios";
import requests from "../../api/requests";
import { SortClothes } from "./MainCloset";
import { ObjValueTuple } from "reselect/es/types";
import { resolveTypeReferenceDirective } from "typescript";

export default function AddClothes() {
  const location = useLocation();
  const closetId = location.state.closetId;
  const clothingId = location.state.clothingId;
  console.log(clothingId);
  console.log(closetId);
  interface clothesType {
    closet_id: number;
    mainCategory: number;
    subCategory: number;
    spring: boolean;
    summer: boolean;
    fall: boolean;
    winter: boolean;
    color: string;
    img: string;
    brand_id: number;
  }
  interface subCategoryType {
    subId: number;
    name: string;
  }
  interface CategoryType {
    id: number;
    name: string;
    subcategories: subCategoryType[];
  }
  interface imgSetType {
    color?: string;
    img?: any;
  }
  let styleList = ["casual", "dandy", "street", "formal"];
  let [style, setStyle] = useState("");
  const [btn, setBtn] = useState([false, false, false, false]);
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  const [url, setUrl] = useState<string | "">("");
  const seasons = ["봄", "여름", "가을", "겨울"];
  let [category, setCategory] = useState<Array<CategoryType>>([
    {
      id: 1,
      name: "상의",
      subcategories: [
        { subId: 101, name: "민소매 티셔츠" },
        { subId: 102, name: "반소매 티셔츠" },
        { subId: 103, name: "긴소매 티셔츠" },
        { subId: 104, name: "셔츠/블라우스" },
        { subId: 105, name: "피케/카라 티셔츠" },
        { subId: 106, name: "맨투맨/스웨트 셔츠" },
        { subId: 107, name: "니트/스웨터" },
        { subId: 111, name: "미니 원피스" },
        { subId: 112, name: "미디 원피스" },
        { subId: 113, name: "맥시 원피스" },
      ],
    },
    {
      id: 2,
      name: "하의",
      subcategories: [
        { subId: 201, name: "데님 팬츠" },
        { subId: 202, name: "코튼 팬츠" },
        { subId: 203, name: "슈트 팬츠/슬랙스" },
        { subId: 204, name: "트레이닝/조거 팬츠" },
        { subId: 205, name: "숏 팬츠" },
        { subId: 206, name: "기타 바지" },
        { subId: 211, name: "미니 스커트" },
        { subId: 212, name: "미디 스커트" },
        { subId: 213, name: "롱 스커트" },
      ],
    },
    {
      id: 3,
      name: "아우터",
      subcategories: [
        { subId: 301, name: "후드 집업" },
        { subId: 302, name: "환절기 코트" },
        { subId: 303, name: "카디건" },
        { subId: 304, name: "슈트/블레이저" },
        { subId: 305, name: "재킷" },
        { subId: 306, name: "블루종/MA-1" },
        { subId: 307, name: "겨울 코트" },
        { subId: 308, name: "플리스/뽀글이" },
        { subId: 309, name: "숏패딩/숏헤비 아우터" },
        { subId: 310, name: "무스탕/퍼" },
        { subId: 311, name: "롱패딩/롱헤비 아우터" },
        { subId: 312, name: "기타 아우터" },
      ],
    },
    {
      id: 4,
      name: "신발",
      subcategories: [
        { subId: 401, name: "구두" },
        { subId: 402, name: "로퍼" },
        { subId: 403, name: "모카신/보트 슈즈" },
        { subId: 404, name: "부츠" },
        { subId: 405, name: "블로퍼" },
        { subId: 406, name: "샌들" },
        { subId: 407, name: "스니커즈" },
        { subId: 408, name: "슬리퍼" },
        { subId: 409, name: "캔버스/단화" },
        { subId: 410, name: "플랫 슈즈" },
        { subId: 411, name: "힐/펌프스" },
      ],
    },
    {
      id: 5,
      name: "가방",
      subcategories: [
        { subId: 501, name: "백팩" },
        { subId: 502, name: "브리프케이스" },
        { subId: 503, name: "숄더백" },
        { subId: 504, name: "에코백" },
        { subId: 505, name: "크로스백" },
        { subId: 506, name: "클러치백" },
        { subId: 507, name: "토트백" },
      ],
    },
    {
      id: 2,
      name: "모자",
      subcategories: [
        { subId: 601, name: "버킷/사파리햇" },
        { subId: 602, name: "비니" },
        { subId: 603, name: "캡/야구 모자" },
        { subId: 604, name: "헌팅캡/베레모" },
      ],
    },
  ]);
  const colorPalette = [
    "흰색",
    "라이트그레이",
    "회색",
    "다크 그레이",
    "검정색",
    "딥레드",
    "빨간색",
    "라즈베리",
    "네온 핑크",
    "분홍색",
    "라이트 핑크",
    "페일 핑크",
    "피치",
    "코랄",
    "라이트 오렌지",
    "네온 오렌지",
    "오렌지 핑크",
    "주황색",
    "아이보리",
    "라이트 옐로우",
    "노란색",
    "머스타드",
    "네온 그린",
    "라이트 그린",
    "민트",
    "녹색",
    "올리브 그린",
    "카키",
    "다크 그린",
    "스카이 블루",
    "네온 블루",
    "파란색",
    "네이비",
    "자주",
    "라벤더",
    "보라색",
    "버건디",
    "갈색",
    "로즈골드",
    "레드 브라운",
    "카키 베이지",
    "카멜",
    "샌드",
    "베이지색",
    "데님",
    "연청",
    "중청",
    "진청",
    "흑청",
  ];
  let [color, setColor] = useState("");
  let [subid, setSubid] = useState(0);
  let [id, setId] = useState(0);
  let [categoryBtn, setCategoryBtn] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
    false,
  ]);
  let seasonT = ["분류", "색상"];
  const [seasonsBoolean, setSeasonsBoolean] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
  ]);

  let userProfile: any = localStorage.getItem("userProfile");
  userProfile = JSON.parse(userProfile);
  let userId = userProfile.user_id;

  let [clothing, setClothing] = useState<imgSetType>();
  let [clothes, setClothes] = useState<any>("");
  console.log(url);

  useEffect(() => {
    axios.get("/closet/clothing/" + clothingId).then((res) => {
      setClothes(res.data.clothing);
      console.log(res);
    });
  }, []);
  console.log(clothes);
  const onSubmit = () => {
    axios
      .post(requests.addClothes, {
        closet_id: closetId,
        mainCategory: id,
        subCategory: subid,
        spring: seasonsBoolean[0],
        summer: seasonsBoolean[1],
        fall: seasonsBoolean[2],
        winter: seasonsBoolean[3],
        color: clothing?.color,
        img: clothing?.img,
        style,
        brand_id: 0,
      })
      .then((response) => {
        axios.get(requests.closet + userId).then((res) => {
          console.log(res);
          navigate("/closet");
        });
      })
      .catch((res) => {
        console.log(res);
        console.log({
          closet_id: closetId,
          mainCategory: id,
          subCategory: subid,
          spring: seasonsBoolean[0],
          summer: seasonsBoolean[1],
          fall: seasonsBoolean[2],
          winter: seasonsBoolean[3],
          color: clothing?.color,
          img: clothing?.img,
          style,
          brand_id: 0,
        });
      });
  };
  let Main = ["상의", "하의", "아우터", "신발", "가방", "모자"];
  return (
    <div>
      <>
        <TopNav type={""}>
          <CloseImg src={Close} onClick={() => navigate("/closet")} />
          <NavText>옷 상세 페이지</NavText>
          <div style={{ width: "30px", height: "30px" }}></div>
        </TopNav>
        <Container>
          <ImgContainer>
            <ImagePreview src={clothes?.img} />
          </ImgContainer>
        </Container>

        <SortContainer>
          <SortBtn>
            <SeasonP>{seasonT[0]}</SeasonP>
            <SeasonP>{Main[clothes.mainCategory - 1]}</SeasonP>
          </SortBtn>

          <SortButton>
            <SeasonP>{seasonT[1]}</SeasonP>
            <SeasonP>{clothes.color}</SeasonP>
          </SortButton>
        </SortContainer>
        <SeasonCategory>
          <SeasonP>스타일</SeasonP>
          <CheckboxContainer>
            <SeasonBtn>{clothes.style}</SeasonBtn>
          </CheckboxContainer>
        </SeasonCategory>
        <SeasonCategory>
          <SeasonP>계절</SeasonP>
          <CheckboxContainer>
            {seasons.map((season, index) => {
              return (
                <div key={index}>
                  <SeasonBtn
                    onClick={() => {
                      let seasonB = [...seasonsBoolean];
                      seasonB[index] = !seasonsBoolean[index];
                      setSeasonsBoolean(seasonB);
                      console.log(seasonsBoolean);
                    }}
                  >
                    {seasons[index]}
                    {/* <SeasonCheckbox
                          value={season}
                          id={season}
                          onChange={() => ChangeBackground(season)}
                        /> */}
                    {/* <SeasonLabel htmlFor={season} id={`label_${season}`}>
                        {season}
                      </SeasonLabel> */}
                  </SeasonBtn>
                </div>
              );
            })}
          </CheckboxContainer>
        </SeasonCategory>
        {/* <SeasonCategory>
              <SeasonP>구분</SeasonP>
            </SeasonCategory> */}
      </>
    </div>
  );
}

const CamDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: auto;
  width: 100%;
  height: 70px;
  max-width: 360px;
  display: flex;
  justify-content: center;
`;

const CaptureButton = styled.div`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid black;
  position: relative;
  z-index: 5;
`;

const ChildCaptureButton = styled.div`
  left: -7.5px;
  top: -7.5px;
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid black;
  z-index: 3;
`;

const SeasonBtn = styled.button`
  border: none;
  display: block;
  font-family: var(--base-font-400);
  font-size: 14px;
  margin: 0 5px;
  width: 40px;
  height: 30px;
  text-align: center;
  border-radius: 20px;
  line-height: 30px;
`;
const ImagePreview = styled.img`
  width: 100%;
  max-width: 300px;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 360px;
`;

const CloseImg = styled.img`
  width: 30px;
  height: 30px;
`;

const NavText = styled.p`
  margin: 0px;
  font-family: var(--base-font-600);
  font-size: 20px;
`;

const SubmitBtn = styled.button`
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: var(--primary-color-500);
  text-align: center;
  font-family: var(--base-font-300);
  font-size: 12px;
`;

const ImgContainer = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 0 10px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SeasonCategory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 320px;
  height: 50px;
  padding: 0 20px;
`;

const SeasonP = styled.p`
  font-family: var(--base-font-400);
  font-size: 16px;
  margin: 0;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--primary-color-100);
  border-radius: 50px;
  align-items: center;
`;

const SeasonLabel = styled.label`
  display: block;
  font-family: var(--base-font-400);
  font-size: 14px;
  margin: 0 5px;
  width: 40px;
  height: 30px;
  text-align: center;
  border-radius: 20px;
  line-height: 30px;
`;

const SeasonCheckbox = styled.input.attrs({
  type: "checkbox",
})`
  display: none;
`;

const SortTxt = styled.p`
  font-size: 12px;
`;

const SortBtn = styled.button`
  width: 360px;
  height: 50px;
  border: #221c1c solid 1px;
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: white;
  display: flex;
`;

const SortContainer = styled.div`
  width: 360px;
`;

const SortButton = styled.button`
  width: 70px;
  /* background-color: grey; */
  border: none;
  border-radius: 30px;
`;
