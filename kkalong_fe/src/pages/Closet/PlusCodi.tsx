import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
export default function PlusCodi() {
  const navigate = useNavigate();
  let [modal, setModal] = useState(false);
  const modalClose = () => {
    setModal(!modal);
  };
  let [sortclothes, setSortclothes] = useState([
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
  ]);
  return (
    <div>
      <div>
        <TopNav type={""}>
          <BackBtn
            onClick={() => {
              navigate("/closet");
            }}
          >
            <img src={left}></img>
          </BackBtn>

          <ClosetName placeholder="이름을 입력해주세요" />
          <ClosetEnter>
            <EnterText>저장</EnterText>
          </ClosetEnter>
        </TopNav>
      </div>
      <CodiEdit />
      {/* <Codi /> */}
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
                  <SortClothes>
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
  height: 250px;
  display: flex;
  margin: 70px auto;
  border-radius: 20px;
  border: solid #67564e 2px;
`;

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
