import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import modalBar from "../../assets/icon/Closet/modalBar.png";
import img1 from "../../img/img1.png";
import img2 from "../../img/img2.png";
import img3 from "../../img/img3.png";
import img4 from "../../img/img4.png";
import img5 from "../../img/img5.png";
import img6 from "../../img/img6.png";
import img7 from "../../img/img7.png";
import left from "../../assets/icon/Closet/arrow-left.png";
import TopNav from "../../components/ui/TopNav";
import CodiEdit from "../../components/closet/CodiEdit";
import CanvasDraw from "react-canvas-draw";

import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";

import axios from '../../api/axios'
import requests from './../../api/requests';

export default function PlusCodi() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch()
  const { User } = useAppSelector(state => state.User)
  let [modal, setModal] = useState(false);

  const modalClose = () => {
    setModal(!modal);
  };
  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 300,
      width: 300,
    });

  const { editor, onReady } = useFabricJSEditor();
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const downloadImage = () => {
    const ext = "png";
    const base64 = editor.canvas.toDataURL({
      format: ext,
      enableRetinaScaling: true,
    });
    const link = document.createElement("a");
    link.href = base64;
    link.download = `eraser_example.${ext}`;
    link.click();
  };
  const [num, setNum] = useState("");
  const [sortclothes, setSortclothes] = useState([
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
  ]);

  const [sort, setSort] = useState([
    "전체",
    "상의",
    "하의",
    "아우터",
    "신발",
    "악세서리",
  ]);

  const onUploadImage = (e) => {
    console.log(e);
    const image = e.target.files[0];
    console.log(e.target.files[0]);
    fabric.Image.fromURL(URL.createObjectURL(image), (img) => {
      var oImg = img.set({ left: 0, top: 0 }).scale(0.25);
      editor.canvas.add(oImg);
      editor.canvas.renderAll();
    });
  };

  const removeObjectFromCanvas = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  // fabric.Image.fromURL(
  //   "http://k7b302.p.ssafy.io/api/v1/user/social/login",
  //   function (img) {
  //     var oImg = img.set({ left: 0, top: 0 }).scale(0.3);
  //     canvas.add(oImg);
  //   }
  // );

  fabric.Image.fromURL("../../img/codi1.png", function (img) {
    var oImg = img.set({ left: 0, top: 0 }).scale(0.3);
    canvas.add(oImg);
  });

  const SaveCodi = async () => {
    const res = await axios.post(requests.codl)
    // 만약 타인의 옷장이고 커플이 아니라면
    if (params.userId && !User.loving) {
      dispatch(res)
      // 다시 작성된 페이지로 이동
      navigate(`/community/HelpCodi/${params.HelpCodiId}`)
    // 타인의 옷장이지만 커플이라면
    } else if (Number(params.userId) === User.lover_id && User.loving) {
      navigate(`/community/HelpCodi/${params.HelpCodiId}`)
    // 자신의 옷장
    } else {
      
    }
  }
  
  return (
    <div>
      <div>
        <TopNav type={""}>
          <BackBtn
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={left}></img>
          </BackBtn>

          <ClosetName placeholder="이름을 입력해주세요" />
          <ClosetEnter>
            <EnterText onClick={SaveCodi}>저장</EnterText>
          </ClosetEnter>
        </TopNav>
      </div>
      <input type="file" multiple onChange={onUploadImage} />
      <button onClick={removeObjectFromCanvas}>Remove</button>
      <button onClick={downloadImage}>to Image</button>
      <br />
      <br /> <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      {/* <CodiEdit /> */}
      {/* <Codi /> */}
      <PlusBtn onClick={modalClose}>
        <BtnText>코디 추가하기</BtnText>
      </PlusBtn>
      {modal === true ? (
        <>
          <Modal>
            {/* <ClosetTitle>옷장 이름</ClosetTitle> */}
            <SortDiv>
              {sort.map(function (a, i) {
                return (
                  <Sortbtn>
                    <SortTxt>{a}</SortTxt>
                  </Sortbtn>
                );
              })}
            </SortDiv>
            <ModalBar />
            <SortBorder>
              {sortclothes.map(function (a, i) {
                return (
                  <SortClothes>
                    <SortClothesImg src={sortclothes[i]} />
                  </SortClothes>
                );
              })}
            </SortBorder>
          </Modal>

          {/* <SelectBtn onClick={modalClose}>확인</SelectBtn> */}
        </>
      ) : null}
    </div>
  );
}

const BackBtn = styled.button`
  height: 30px;
  width: 40px;
  position: absolute;
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

const Codi = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  margin: 30px auto 10px auto;
  border-radius: 20px;
  border: solid #67564e 2px;
`;

const Modal = styled.div`
  background: white;
  height: 160px;
  width: 320px;
  margin-top: 300px;
  padding: 20px;
  text-align: center;
  position: absolute;
  bottom: 0px;
  display: flex;
  margin: auto;
  border: solid 3px #67564e;
  border-radius: 30px 30px 0px 0px;
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
const ClosetTitle = styled.p`
  font-size: 15px;
  position: absolute;
  bottom: 160px;
`;
const SortDiv = styled.div`
  width: 320px;
  height: 60px;
  margin-top: 0px;
  position: absolute;
  overflow-x: auto;
  white-space: nowrap;
`;
const Sortbtn = styled.button`
  height: 50px;
  width: 80px;
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
`;
