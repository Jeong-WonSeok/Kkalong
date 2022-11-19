import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Webcam from "react-webcam";

import FooterBar from "../../components/ui/FooterBar";
import TopNav from "../../components/ui/TopNav";

// import {CamDiv, ButtonContainer, CaptureButton, ChildCaptureButton} from '../Closet/AddClothes'

// import {CamDiv, ButtonContainer, CaptureButton, ChildCaptureButton} from '../Closet/AddClothes'

import { CategoryText } from "../Community/MainCommunity";
import Base64ToFile from "../../hooks/Base64ToFile";

import File from "../../assets/icon/Virtual/folder.png";
import DefaultImg from "../../assets/icon/Virtual/image.png";
import Picture from "../../assets/icon/Closet/add_clothes.png";
import Change from "../../assets/icon/Virtual/exchange.png";
import BackArrow from "../../assets/icon/Nav/BackArrow.png";
import Close from "../../assets/icon/Nav/close.png";

import axios from "../../api/axios";
import requests from "../../api/requests";

type faceType = {
  exact: string;
};

type constraintType = {
  width: number;
  height: number;
  facingMode: string | faceType;
};

export default function VirtualPicture() {
  const navigate = useNavigate();
  const webcam = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | "">("");
  const [IsSelect, setIsSelect] = useState("");
  const [SendFile, setSendFile] = useState<File>();
  const [videoConstraints, setVideoConstraints] = useState<constraintType>({
    width: 1024,
    height: 768,
    facingMode: "user",
  });

  useEffect(() => {
    if (IsSelect === "Picture" && !url) {
      const app = document.getElementById("App") as HTMLDivElement;
      app.style.margin = "0";
    }

    return () => {
      const app = document.getElementById("App") as HTMLDivElement;
      app.style.marginTop = "60px";
    };
  }, [IsSelect, url]);

  // 사진찍기
  const capture = useCallback(async () => {
    const imageSrc = webcam.current?.getScreenshot() as string;
    Base64ToFile(imageSrc, "example");
    if (imageSrc) {
      // base64 코드를 File로 변환
      const byteCharacters = URL.createObjectURL(
        new Blob([imageSrc], { type: "text/plain" })
      );
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      let image = new Blob([byteArray], { type: "image/jpeg" });

      setUrl(imageSrc);
    }
  }, [webcam]);

  // 카메라 화면 전환
  const ModeChange = () => {
    if (videoConstraints.facingMode === "user") {
      setVideoConstraints((currnet) => ({
        ...currnet,
        facingMode: { exact: "environment" },
      }));
    } else {
      setVideoConstraints((currnet) => ({
        ...currnet,
        facingMode: "user",
      }));
    }
  };

  // 파일선택
  const SelectFile = () => {
    const Input = document.getElementById("SelectFile") as HTMLInputElement;
    Input.click();
  };

  const ChangeFile = (e: any) => {
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  // 제출
  const Submit = () => {};

  return (
    <div>
      {!IsSelect && (
        <div>
          <TopNav type={"menu"}>
            <CategoryText>가상피팅</CategoryText>
            <div style={{ width: "56px", height: "36px" }}></div>
          </TopNav>
          <Container>
            <BtnDiv onClick={() => navigate("VirtualBrandChoice/")}>
              <Img>
                <SelectImg
                  style={{ position: "absolute", left: "-5px", top: "-5px" }}
                  src={DefaultImg}
                />
              </Img>
              <SelectP>이전 이미지를 사용</SelectP>
            </BtnDiv>
            <BtnDiv onClick={SelectFile}>
              <SelectImg src={File} />
              <SelectP>파일에서 선택</SelectP>
            </BtnDiv>
            <FileSelect
              id="SelectFile"
              type="file"
              accept="image/*"
              onChange={ChangeFile}
            />
            <BtnDiv onClick={() => setIsSelect("Picture")}>
              <SelectImg
                style={{ width: "35px", height: "30px", margin: "0 2.5px" }}
                src={Picture}
              />
              <SelectP>촬영하기</SelectP>
            </BtnDiv>
          </Container>
          <FooterBar />
          {url && (
            <ModalContainer>
              <ContentDiv>
                <Container style={{ minHeight: "300px", margin: "7px 0" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <MenuImg
                      src={Close}
                      style={{
                        width: "40px",
                        height: "40px",
                        marginLeft: "5px",
                      }}
                      onClick={() => setUrl("")}
                    />
                  </div>
                  <PreviewImg src={url} />
                  <BtnContainer>
                    <Button
                      style={{ backgroundColor: "var(--primary-color-500)" }}
                      onClick={() => {
                        SelectFile();
                      }}
                    >
                      재선택
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "var(--primary-color-900)",
                        color: "white",
                      }}
                      onClick={Submit}
                    >
                      완료
                    </Button>
                  </BtnContainer>
                </Container>
              </ContentDiv>
            </ModalContainer>
          )}
        </div>
      )}

      {/* {IsSelect === "Picture" && !url && (
        <CamDiv>
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            ref={webcam}
            videoConstraints={videoConstraints}
            onUserMediaError={() => window.alert("cant access your camera")}
          />
          <ButtonContainer>
            <CaptureButton onClick={capture}>
              <ChildCaptureButton></ChildCaptureButton>
            </CaptureButton>
            <ChangeDisplay onClick={ModeChange}>
              <SelectImg src={Change} />
            </ChangeDisplay>
          </ButtonContainer>
        </CamDiv>
      )} */}

      {IsSelect === "Picture" && url && (
        <div>
          <TopNav type={""}>
            <MenuImg
              src={BackArrow}
              onClick={() => {
                setIsSelect("");
                setUrl("");
              }}
            />
            <CategoryText>가상피팅</CategoryText>
            <div style={{ width: "30px", height: "30px" }}></div>
          </TopNav>
          <Container>
            <PreviewImg src={url} />
            <BtnContainer>
              <Button
                style={{ backgroundColor: "var(--primary-color-500)" }}
                onClick={() => setUrl("")}
              >
                다시찍기
              </Button>
              <Button
                style={{
                  backgroundColor: "var(--primary-color-900)",
                  color: "white",
                }}
                onClick={Submit}
              >
                완료
              </Button>
            </BtnContainer>
          </Container>
          <FooterBar />
          {url && (
            <ModalContainer>
              <ContentDiv>
                <Container style={{ minHeight: "300px", margin: "7px 0" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <MenuImg
                      src={Close}
                      style={{
                        width: "40px",
                        height: "40px",
                        marginLeft: "5px",
                      }}
                      onClick={() => setUrl("")}
                    />
                  </div>
                  <PreviewImg src={url} />
                  <BtnContainer>
                    <Button
                      style={{ backgroundColor: "var(--primary-color-500)" }}
                      onClick={() => {
                        SelectFile();
                      }}
                    >
                      재선택
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "var(--primary-color-900)",
                        color: "white",
                      }}
                      onClick={Submit}
                    >
                      완료
                    </Button>
                  </BtnContainer>
                </Container>
              </ContentDiv>
            </ModalContainer>
          )}
        </div>
      )}
      {/* 
    {IsSelect === "Picture" && !url && <CamDiv>
      <Webcam 
        audio={false}
        screenshotFormat="image/jpeg"
        ref={webcam}
        videoConstraints={videoConstraints}
        onUserMediaError={() => window.alert('cant access your camera')}/>
      <ButtonContainer>
        <CaptureButton onClick={capture}>
        <ChildCaptureButton></ChildCaptureButton>
        </CaptureButton>
        <ChangeDisplay onClick={ModeChange}>
          <SelectImg src={Change}/>
        </ChangeDisplay>
      </ButtonContainer>
    </CamDiv>} */}

      {IsSelect === "Picture" && url && (
        <div>
          <TopNav type={""}>
            <MenuImg
              src={BackArrow}
              onClick={() => {
                setIsSelect("");
                setUrl("");
              }}
            />
            <CategoryText>가상피팅</CategoryText>
            <div style={{ width: "30px", height: "30px" }}></div>
          </TopNav>
          <Container>
            <PreviewImg src={url} />
            <BtnContainer>
              <Button
                style={{ backgroundColor: "var(--primary-color-500)" }}
                onClick={() => setUrl("")}
              >
                다시찍기
              </Button>
              <Button
                style={{
                  backgroundColor: "var(--primary-color-900)",
                  color: "white",
                }}
                onClick={Submit}
              >
                완료
              </Button>
            </BtnContainer>
          </Container>
        </div>
      )}
    </div>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 360px;
  min-height: 400px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  width: 85%;
  max-width: 260px;
  height: 60px;
  background-color: var(--primary-color-200);
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
`;

const Img = styled.div`
  position: relative;
  background-color: white;
  width: 28px;
  height: 28px;
  margin: 0 6px;
`;

const SelectImg = styled.img`
  width: 40px;
  height: 40px;
`;

const SelectP = styled.p`
  margin: 0 10px;
  font-family: var(--base-font-300);
  font-size: 1rem;
`;

const FileSelect = styled.input`
  display: none;
`;

const ChangeDisplay = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 25px;
  background-color: var(--primary-color-900);
  right: 20px;
  bottom: 10px;
`;

const PreviewImg = styled.img`
  max-width: 300px;
  width: 85%;
  border-radius: 20px;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0;
`;

const Button = styled.button`
  border: none;
  width: 140px;
  height: 35px;
  border-radius: 10px;
  font-family: var(--base-font-400);
  font-size: 1rem;
`;

const MenuImg = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0;
`;

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 360px;
  height: 100%;
  position: fixed;
  left: auto;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
`;

const ContentDiv = styled.div`
  width: 80%;
  max-width: 300px;
  min-height: 300px;
  border-radius: 20px;
  background-color: white;
  border: 2px solid var(--primary-color-500);
`;
