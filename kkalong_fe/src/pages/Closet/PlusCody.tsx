import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import left from "../../assets/icon/Closet/arrow-left.png";
import TopNav from "../../components/ui/TopNav";

import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import axios from "../../api/axios";
import requests from "../../api/requests";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import Slider from "../../components/ui/Slider";
import { AddCody } from "../../redux/modules/CodyComment";
import FooterBar from "../../components/ui/FooterBar";
import { CategoryText } from "../Community/MainCommunity";

interface ClothType {
  brand_id: number,
  closet_id: number,
  clothing_id: number,
  color: string,
  gender: string,
  img: string,
  mainCategory: number,
  subCategory: number,
  personal_color: string,
  style: string,
  season: Array<string>,
  url: null | string
}

export default function PlusCody() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch()
  const { User } = useAppSelector(state => state.User)

  const [canvas, setCanvas] = useState({} as fabric.Canvas);
  const [ClothList, setClothList] = useState(Array<ClothType>);
  const [IsModal, setIsModal] = useState(false);
  const [SelectClothes, setSelectClothes] = useState(Array<number>)
  
  const sort = ["전체", "상의", "하의", "아우터", "신발", "악세서리"]

  const closetId = location.state.closetId

  // 캔버스 설정

  useEffect(()=>{
    readImages();
    setCanvas(initCanvas())
  },[])

  const initCanvas = () => (
    new fabric.Canvas('canvas', { 
      height: 500,
      width: 350,
     })
  )

  const readImages = async () => {
    if (params.userId) {
      await axios
      .get(requests.closet + params.userId)
      .then((response) => {
        setClothList(response.data.closets[0].clothings);
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
    await axios
      .get(requests.closet + User.user_id)
      .then((response) => {
        setClothList(response.data.closets[0].clothings);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const onUploadImage = (i: number) => {
    var imgObj = new Image();

    imgObj.crossOrigin = "*";
    imgObj.src = ClothList[i].img

    imgObj.onload = function () {
      imgObj.width = 100
      imgObj.height = 100

      var image = new fabric.Image(imgObj);
      image.set({
          top: 0,
          left: 0 ,
          padding: 10,
          selectable: true,
      });

      canvas.add(image);
    }
  };

  const downloadImage = async () => {
    const base64 = canvas.toDataURL({
      format: "png",
      enableRetinaScaling: true,
    });
    console.log(base64)
    await dispatch(AddCody(base64))
  };


  const removeObjectFromCanvas = () => {
    canvas.remove(canvas.getActiveObject());
  };

  const NextPage = () => {
    if (params.HelpCodiId) {
      navigate(`/pluscodi2/${params.HelpCodiId}/${params.userId}/`, { state: { closetId , SelectClothes,  } });
    } else if (params.userId) {
      navigate(`/pluscodi2/${params.userId}`, { state: { closetId , SelectClothes,  } });
    } else {
      navigate(`/pluscodi2`, { state: { closetId , SelectClothes } });
    }
  }


  return (
    <div>
          <div>
            <TopNav type={""}>
              <BackBtn onClick={() => {navigate(-1);}}>
                <img src={left}/>
              </BackBtn>
              <CategoryText>코디 만들기</CategoryText>
              <ClosetEnter
                onClick={() => {
                  downloadImage();
                  NextPage();
                }}
              >
                <EnterText>다음</EnterText>
              </ClosetEnter>
            </TopNav>
          </div>
          {/* <input type="file" multiple onChange={onUploadImage} /> */}
          <button onClick={removeObjectFromCanvas}>Remove</button>
          <CanvasDiv id="canvas"/>
          <br />
          <br /> 
          <PlusBtn onClick={()=> setIsModal(!IsModal)}>
            <BtnText>코디 추가하기</BtnText>
          </PlusBtn>
          
          {IsModal && 
              <Slider>
                <SortDiv>
                  {sort.map(function (a, i) {
                    return (
                      <Sortbtn>
                        <SortTxt>{a}</SortTxt>
                      </Sortbtn>
                    );
                  })}
                </SortDiv>
                <SortBorder>
                  {ClothList.map(function (cloth, i) {
                    return (
                      <SortClothes
                        onClick={() => {
                          onUploadImage(i);
                          setSelectClothes([...SelectClothes, cloth.clothing_id])
                        }}
                      >
                        <SortClothesImg src={cloth.img} alt="no" />
                      </SortClothes>
                    );
                  })}
                </SortBorder>
                </Slider>}
      <FooterBar/>
  </div>
  )
}

const CanvasDiv = styled.canvas`
  border: 3px solid var(--primary-color-900);
  border-radius: 10px;
  margin: 0 auto;
`

const BackBtn = styled.button`
  height: 30px;
  width: 40px;
  margin-top: 10px;
  border: none;
  background-color: white;
`;

const ClosetEnter = styled.button`
  margin-top: 5px;
  height: 30px;
  width: 60px;
  background-color: #67564e;
  border: none;
  border-radius: 30px;
  position: relative;
  top: 3px;
`;
const EnterText = styled.span`
  color: white;
`;


const ModalBar = styled.div`
  width: 60px;
  height: 10px;
  position: absolute;
  display: flex;
  margin-left: 140px;
  background-color: #67564e;
  /* border: solid 2px black; */
  border-radius: 20px;
  background-image: url("../../assets/icon/Closet/modalBar.png");
`;

const SelectBtn = styled.button`
  display: flex;
  background: #67564e;
  border-radius: 30px;
  border: none;
  position: absolute;
  bottom: 10px;
  left: 130px;
  right: auto;
  font-size: 13px;
  font-weight: 900;
  padding: 15px 40px;
  color: white;
`;
const PlusBtn = styled.button`
  width: 150px;
  height: 40px;
  display: flex;
  margin: auto;
  border: none;
  border-radius: 20px;
  background-color: #67564e;
`;
const BtnText = styled.span`
  font-size: 15px;
  color: white;
  display: flex;
  margin: auto;
  font-family: var(--base-font-300);
`;

const SortBorder = styled.div`
  width: 360px;
  overflow-y: auto;
  padding-top: 50px;
`;

const SortDiv = styled.div`
  width: 360px;
  height: 60px;
  margin-top: 0px;
  top: 30px;
  position: absolute;
  overflow-x: auto;
  white-space: nowrap;
`;
const Sortbtn = styled.button`
  height: 30px;
  width: 60px;
  border: solid #67564e 1px;
  border-top: none;
  border-bottom: solid #67564e 1px;
  border-left: none;
  border-right: none;
  /* margin-top: 3px; */
  background-color: white;
  display: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;
const SortTxt = styled.p`
  font-size: 15px;
  font-weight: 800;
  color: #67564e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;
const SortClothes = styled.button`
  height: 100px;
  width: 100px;
  background-color: white;
  border: solid 0.1px #aeabab;
  /* border: solid 2px #67564e; */
`;
const SortClothesImg = styled.img`
  height: 70px;
  width: 70px;
  background-color: white;
`;

const ClosetName = styled.input`
  height: 30px;
  width: 230px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: solid 1px;
  margin-left: 50px;
  margin-top: 10px;
`
