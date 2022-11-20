import React from "react";
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
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";

import axios from '../../api/axios'
import requests from './../../api/requests';

export default function PlusCodi() {
  const navigate = useNavigate();
  const location = useLocation();
  const closetId = location.state.closetId;
  console.log(closetId);
  const params = useParams();
  let [closet, setCloset] = useState(Array);
  let userProfile = localStorage.getItem("userProfile");
  userProfile = JSON.parse(userProfile);
  let userId = userProfile.user_id;
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

  const { editor, onReady } = useFabricJSEditor();
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
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
  let [img, setImg] = useState([img1, img2, img3, img4]);

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

    // var canvas = document.getElementsById("canvas");
    // img.crossOrigin = "*";
    // img.src = editor.canvas.toDataURL("image/png");
    // const imgUrl = editor.canvas.toDataURL("image/png");
    // const img = new Image();
    // img.crossOrigin = "Anonymous";

    // img.src = imgUrl;
    // imgUrl.crossOrigin = "Anonymous";
    // var decodImg = window.atob(imgUrl.split(",")[1]);
    // let array = [];
    // for (let i = 0; i < decodImg.length; i++) {
    //   array.push(decodImg.charCodeAt(i));
    // }

    // const myBlob = new Blob([new ArrayBuffer(array)], { type: "image/jpeg" });
    // var file = new File([myBlob], "blobtofile.png");
    // console.log(file);
    // let formData = new FormData();
    // formData.append("img", file);
    // axios.post(requests.imgAdd, formData, {
    //   headers: {
    //     processData: false,
    //     contentType: false,
    //   },
    // });
    // console.log(imgUrl);
    // dataURLtoFile(imgUrl);
    // console.log(imgUrl);
    // const base64 = editor.canvas.toDataURL({
    //   format: ext,
    //   enableRetinaScaling: true,
    // });

    // console.log(base64);
    // const link = document.createElement("a");
    // link.href = base64;
    // link.download = `eraser_example.${ext}`;
    // console.log(link);
    // img = link;
    // console.log(img);
    // link.click();
    // console.log(link);
  };
  function dataURLtoFile(dataurl) {
    const blobBin = atob(dataurl.split(",")[1]); // base64 데이터 디코딩
    const array = [];
    for (let i = 0; i < blobBin.length; i += 1) {
      array.push(blobBin.charCodeAt(i)); //인코드된 문자들을 0번째부터 끝까지 해독하여 유니코드 값을 array 에 저장한다.
    }

    const u8arr = new Uint8Array(array); //8비트의 형식화 배열을 생성한다.
    const file = new Blob([u8arr], { type: "image/png" }); // Blob 생성
    const formdata = new FormData(); // formData 생성
    formdata.append("img", file); // file data 추가
    console.log(formdata);
    for (let key of formdata.keys()) {
      console.log(key);
    }

    /* value 확인하기 */
    for (let value of formdata.values()) {
      console.log(value);
    }
    // axios 로 서버에 img 파일 보내기

    axios.post(requests.imgAdd, formdata, {
      headers: { "content-Type": "multipart/form-data" },
    });
  }
  let [num, setNum] = useState("");
  let [sortclothes, setSortclothes] = useState();

  const [sort, setSort] = useState([
    "전체",
    "상의",
    "하의",
    "아우터",
    "신발",
    "악세서리",
  ]);
  let [clothesId, setClothesId] = useState("");
  const onUploadImage = (i) => {
    console.log(i);
    // const image = closet[clothesId].clothings[clothesId].img;
    // console.log(image);
    // console.log(e.target.files[0]);

    fabric.Image.fromURL(closet[0].clothings[i].img, (oImg) => {
      oImg.crossOrigin = "Anonymous";
      oImg.scaleToWidth(130);
      oImg.scaleToHeight(130);
      editor.canvas.add(oImg);
    });
    // const imgElement = document.getElementById("my-image");
    // var imgInstatnce = new fabric.Image(imgElement, {
    //   left: 0,
    //   top: 20,
    //   scale: 0.25,
    // });
    // editor.canvas.add(imgInstatnce);
    //   fabric.Image.fromURL(URL.createObjectURL(image), (img) => {
    //     var oImg = img.set({ left: 0, top: 0 }).scale(0.25);
    //     console.log(oImg);
    //     editor.canvas.add(oImg);
    //     editor.canvas.renderAll();
    //   });
    // };
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
  // fabric.Image.fromURL("../../img/codi1.png", function (img) {
  //   var oImg = img.set({ left: 0, top: 0 }).scale(0.3);
  //   canvas.add(oImg);
  // });
  return (
    <>
      {loading ? (
        <>loading...</>
      ) : (
        <div>
          <div>
            {/* <TopNav type={""}>
              <BackBtn
                onClick={() => {
                  navigate(-1);
                }}
              >
                <img src={left}></img>
              </BackBtn>

              <ClosetName placeholder="이름을 입력해주세요" />
              <ClosetEnter
                onClick={() => {
                  navigate("/pluscodi2", { state: { closetId } });
                }}
              >
                <EnterText>저장</EnterText>
              </ClosetEnter>
            </TopNav> */}
          </div>
          <input type="file" multiple onChange={onUploadImage} />
          <button onClick={removeObjectFromCanvas}>Remove</button>
          <button onClick={downloadImage}>to Image</button>
          <br />
          <br />{" "}
          <FabricJSCanvas
            className="sample-canvas"
            onReady={onReady}
            id="canvas"
          />
          {/* <CodiEdit /> */}
          {/* <Codi /> */}
          <PlusBtn onClick={modalClose}>
            <BtnText>코디 추가하기</BtnText>
          </PlusBtn>
          {/* <img
        src={
          "https://firebasestorage.googleapis.com/v0/b/kkalong-b4cec.appspot.com/o/clothing_bg_1.png?alt=media"
        }
        id="my-image"
      /> */}
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
                  {closet[0].closet_id === closetId &&
                    closet[0].clothings.map(function (a, i) {
                      return (
                        <SortClothes
                          onClick={() => {
                            onUploadImage(i);
                            console.log(i);
                            setClothesId(i);
                          }}
                        >
                          {closet[0].clothings ? (
                            <SortClothesImg
                              src={closet[0].clothings[i].img}
                              alt="no"
                            />
                          ) : null}
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
