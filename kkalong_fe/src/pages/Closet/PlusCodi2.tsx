import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import TopNav from "../../components/ui/TopNav";
import FooterBar from "../../components/ui/FooterBar";

import Close from "../../assets/icon/Nav/close.png";

import axios from "../../api/axios";
import requests from "../../api/requests";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { MakeCody } from "../../redux/modules/CodyComment";


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

export default function AddClothes() {
  const location = useLocation();
  const params = useParams();
  const dispatch = useAppDispatch()
  const closetId = location.state.closetId;
  const clothings = location.state.SelectClothes;
  const { CodyImg } = useAppSelector(state => state.CodyComment)
  const { User } = useAppSelector(state => state.User)
  const navigate = useNavigate();
  const seasons = ["봄", "여름", "가을", "겨울"];
  let styleList = ["casual", "dandy", "street", "formal"];
  let style = "";
  let seasonsBoolean = [ false,false,false,false ]
  let [input, setInput] = useState("");
  const onChangeInput = (e: any) => {
    setInput(e.target.value);
  };
  const onSubmit = async () => {
    const data = {
      user_id: params.userId ? Number(params.userId) : User.user_id,
      creater_id: User.user_id,
      closet_id: closetId,
      name: input,
      style: style,
      spring: seasonsBoolean[0],
      summer: seasonsBoolean[1],
      fall: seasonsBoolean[2],
      winter: seasonsBoolean[3],
      img: CodyImg,
      clothings: clothings,
    }
    console.log(data)
    const res = await axios.post(requests.codi, data)

    if (params.HelpCodiId) {
      dispatch(MakeCody(res.data))
      navigate(`/community/HelpCodi/true/${params.HelpCodiId}`)
    } else {
      navigate("/codi");
    }
    
  };

  const ChangeSelect = () => {
    const styleBtn = document.getElementsByClassName('Style') as HTMLCollectionOf<HTMLButtonElement>
    styleBtn[0].style.backgroundColor = ''
    styleBtn[1].style.backgroundColor = ''
    styleBtn[2].style.backgroundColor = ''
    styleBtn[3].style.backgroundColor = ''

    const selectBtn = document.getElementById(style) as HTMLButtonElement
    selectBtn.style.backgroundColor = 'var(--primary-color-500)'
  }

  const ChangeSeason = () => {
    seasonsBoolean.map((season, idx) => {
      const btn = document.getElementById(String(idx)) as HTMLButtonElement
      if (season) {
        btn.style.backgroundColor = 'var(--primary-color-500)'
      } else {
        btn.style.backgroundColor = 'var(--primary-color-100)'
      }
    })
  }

  return (
    <div>
      <>
        <TopNav type={""}>
          <CloseImg src={Close} onClick={() => navigate("/closet")} />
          <ClosetName onChange={onChangeInput} placeholder="이름을 입력해주세요"/>
          <SubmitBtn onClick={() => {onSubmit();}}>추가</SubmitBtn>
        </TopNav>

        <Container>
          <ImgContainer>
            <ImagePreview src={CodyImg} />
          </ImgContainer>
        </Container>
        <SeasonCategory>
          <SeasonP>스타일</SeasonP>
          <CheckboxContainer>
            {styleList.map((a, index) => {
              return (
                <div key={index}>
                  <SeasonBtn id={styleList[index]} className="Style"
                    onClick={() => {
                      style = styleList[index];
                      ChangeSelect();
                    }}
                  >
                    {styleList[index]}
                  </SeasonBtn>
                </div>
              );
            })}
          </CheckboxContainer>
        </SeasonCategory>
        <SeasonCategory>
          <SeasonP>계절</SeasonP>
          <CheckboxContainer>
            {seasons.map((season, index) => {
              return (
                <div key={index}>
                  <SeasonBtn id={String(index)}
                    onClick={() => {
                      let seasonB = [...seasonsBoolean];
                      seasonB[index] = !seasonsBoolean[index];
                      seasonsBoolean = [...seasonB];
                      ChangeSeason();
                    }}
                  >
                    {seasons[index]}
                  </SeasonBtn>
                </div>
              );
            })}
          </CheckboxContainer>
        </SeasonCategory>
      </>
      <FooterBar/>
    </div>
  );
}

const SeasonBtn = styled.button`
  border: none;
  display: block;
  background-color: var(--primary-color-100);
  font-family: var(--base-font-400);
  font-size: 14px;
  margin: 0 5px;
  min-width: 50px;
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
  width: 250px;
  height: 250px;
  padding: 0 10px;
  margin: 20px auto;
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


const ClosetName = styled.input`
  height: 30px;
  width: 230px;
  border: none;
  border-bottom: solid 1px;
`;
