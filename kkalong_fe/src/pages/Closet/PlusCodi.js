import React, { useRef } from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
import axios from "../../api/axios";
import requests from "../../api/requests";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import html2canvas from "html2canvas";
import { useAppSelector } from "../../hooks/reduxHook";

export default function PlusCodi() {
  const navigate = useNavigate();
  const { User } = useAppSelector(state => state.User)
  const location = useLocation();
  const closetId = location.state.closetId;
  const params = useParams();
  let [closet, setCloset] = useState(Array);
  let [loading, setLoading] = useState(true);
  let [modal, setModal] = useState(false);
  const modalClose = () => {
    setModal(!modal);
  };
  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 300,
      width: 300,
    });
  const [imgList, setImgList] = useState([]);

  const { editor, onReady } = useFabricJSEditor();
  const [canvas, setCanvas] = useState("");
  let [clothesArray, setClothesArray] = useState([]);

  const sort = ["전체","상의","하의","아우터","신발", "악세서리"];
  let [clothesId, setClothesId] = useState("");
  useEffect(() => {
    readImages();
    setCanvas(initCanvas());
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

  const readImages = async () => {
    await axios
      .get("closet/clothings/" + closetId)
      .then((response) => {
        console.log("======= 이미지 목록 조회 성공 =======");
        setImgList(response.data.clothings);
        console.log(response.data.clothings);
      })
      .catch((error) => {
        console.log("======= 이미지 목록 조회 실패 =======");
        console.log(error);
      });
  };

  const downloadImage = (url) => {
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


  const onUploadImage = (i) => {
    fabric.Image.fromURL(closet[0].clothings[i].img, (oImg) => {
      oImg.scaleToWidth(130);
      oImg.scaleToHeight(130);
      editor.canvas.add(oImg);
    }, { crossOrigin: 'Anonymous' });
  };

  const removeObjectFromCanvas = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  const [downloadUrl, setDownloadUrl] = useState();
  const getDownloadUrl = () => {
    fetch(
      "https://firebasestorage.googleapis.com/v0/b/kkalong-b4cec.appspot.com/o/clothing_bg_1.png?alt=media",
      {
        method: "GET",
      }
    )
      .then((res) => {
        console.log(res);
        return res.blob();
      })
      .then((blob) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        fileReader.onload = (data) => {
          setDownloadUrl(data.target?.result);
        };
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      {loading ? (
        <>loading...</>
      ) : (
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

              <ClosetName />
              <ClosetEnter
                onClick={() => {
                  navigate("/pluscodi2", { state: { closetId, clothesArray } });
                }}
              >
                <EnterText>다음</EnterText>
              </ClosetEnter>
            </TopNav>
          </div>
          {/* <div id="captureDiv">
            <img src={imgList[0].img} crossorigin="anonymous" />
          </div> */}
          <input type="file" multiple onChange={onUploadImage} />
          <button onClick={removeObjectFromCanvas}>Remove</button>
          <button onClick={downloadImage}>to Image</button>
          <button className="downBtn" onClick={getDownloadUrl}>
            다운로드 버튼
          </button>
          <a
            href={
              "https://firebasestorage.googleapis.com/v0/b/kkalong-b4cec.appspot.com/o/clothing_bg_1.png?alt=media" +
              downloadUrl
            }
            download
          >
            다운로드
          </a>
          {/* <li ref={cardRef} className="card"> */}
          {/* <div ref={cardRef} className="card">
            <h1>카드 컴포넌트</h1> */}
          <FabricJSCanvas
            className="sample-canvas"
            onReady={onReady}
            id="canvas"
            crossorigin="anonymous"
          />
          {/* </div> */}
          {/* </li> */}
          <br />
          <br /> {/* <CodiEdit /> */}
          {/* <Codi /> */}
          <PlusBtn onClick={modalClose}>
            <BtnText>코디 추가하기</BtnText>
          </PlusBtn>
          {/* <div>
            <h2>사진 목록</h2>
            {imgList.map((item, index) => {
              return (
                <div id="captureDiv">
                  <img
                    src={imgList[index].img}
                    alt={"img" + item.pid}
                    style={{ width: "200px", height: "150px" }}
                    ref={cardRef}
                    className="card"
                  />

                  <button onClick={() => onDownloadBtn(imgList[index].img)}>
                    다운로드
                  </button>
                </div>
              );
            })}
          </div> */}
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
                  {imgList.map(function (a, i) {
                    return (
                      <SortClothes
                        onClick={() => {
                          onUploadImage(i);
                          console.log(i);
                          setClothesId(imgList[i].clothing_id);
                          let cl = [...clothesArray];
                          cl.push(imgList[i].clothing_id);
                          console.log(cl);
                          cl = new Set(cl);
                          cl = Array.from(cl);
                          setClothesArray(cl);
                        }}
                      >
                        <SortClothesImg src={imgList[i]?.img} alt="no" />
                      </SortClothes>
                    );
                  })}
                </SortBorder>
              </Modal>

              {/* <SelectBtn onClick={modalClose}>확인</SelectBtn> */}
            </>
          ) : null}
        </div>
      )}
    </>
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
