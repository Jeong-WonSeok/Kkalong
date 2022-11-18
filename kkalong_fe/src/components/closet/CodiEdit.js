import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import styled from "styled-components";
import img1 from "../../img/img1.png";
import img2 from "../../img/img2.png";
import img3 from "../../img/img3.png";
import img4 from "../../img/img4.png";
import img5 from "../../img/img5.png";
import img6 from "../../img/img6.png";
import img7 from "../../img/img7.png";
export default function CodiEdit() {
  const { editor, onReady } = useFabricJSEditor();
  const [canvas, setCanvas] = useState("");
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);
  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 300,
      width: 300,
    });
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
  let [num, setNum] = useState("");

  let [sortclothes, setSortclothes] = useState([
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
  ]);
  const onUploadImage = (e) => {
    console.log(e);
    const image = e.target.files[0];
    console.log(e.target.files[0]);
    fabric.Image.fromURL(URL.createObjectURL(image), (img) => {
      editor.canvas.add(img);
      editor.canvas.renderAll();
    });
  };
  const removeObjectFromCanvas = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };
  let [modal, setModal] = useState(false);
  const modalClose = () => {
    setModal(!modal);
  };

  return (
    <div>
      <h1>코디하기</h1>
      <input type="file" multiple onChange={onUploadImage} />
      <button onClick={removeObjectFromCanvas}>Remove</button>
      <button onClick={downloadImage}>to Image</button>
      <br />
      <br /> <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      <PlusBtn onClick={modalClose}>
        <BtnText>코디 추가하기</BtnText>
      </PlusBtn>
      {modal === true ? (
        <>
          <Modal>
            <ModalBar />
            <SortBorder>
              {sortclothes.map(function (a, i) {
                return (
                  <SortClothes
                    onClick={() => {
                      setNum(i);
                    }}
                  >
                    <img src={sortclothes[i]} />
                  </SortClothes>
                );
              })}
            </SortBorder>
          </Modal>

          <SelectBtn onClick={modalClose}>확인</SelectBtn>
        </>
      ) : null}
    </div>
  );
}

const Modal = styled.div`
  background: white;
  height: 400px;
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
const SortBorder = styled.div`
  width: 360px;
  height: 300px;
`;
const SortClothes = styled.button`
  height: 80px;
  width: 85px;
  margin-top: 20px;
  margin-left: 20px;
  background-color: white;
  border-radius: 20px;
  border: solid 1px #67564e;
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
// import * as React from "react";
// import { render } from "react-dom";
// import Hello from "./Hello";
// import { CuttleCanvas } from "./cuttleCanvasDemo/index";
// import { fabricExtend } from "./cuttleCanvasDemo/fabricExtend";

// fabricExtend();

// const styles = {
//   fontFamily: "sans-serif",
// };

// const App = () => (
//   <div style={styles}>
//     <Hello name="Fabric.js Demo App" />
//     <CuttleCanvas />
//   </div>
// );

// render(<App />, document.getElementById("root"));
