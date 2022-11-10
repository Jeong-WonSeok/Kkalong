import React, {useEffect, useState, useRef, useCallback} from 'react'
import Webcam from "react-webcam";
import {CamDiv, ButtonContainer, CaptureButton, ChildCaptureButton} from '../Closet/AddClothes'
import axios from '../../api/axios'
import requests from '../../api/requests'

export default function VirtualPicture() {
  const webcam = useRef<Webcam>(null)
  const [url, setUrl] = useState<string | ''>('');

  useEffect(()=>{
    const app = document.getElementById('App') as HTMLDivElement
    app.style.margin = '0'
  },[])

  const videoConstraints = {
    width: 1024,
    height: 768,
    facingMode: "user"
  };

  const capture = useCallback(async () => {
    const imageSrc = webcam.current?.getScreenshot();
    if (imageSrc) {
      // base64 코드를 File로 변환
      const byteCharacters = URL.createObjectURL(new Blob([imageSrc] , {type:'text/plain'}));
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      let image = new Blob([byteArray], { type: 'image/jpeg' });
      setUrl(imageSrc);
      // 이대로 넘겨주는게 맞나?
      const res = await axios.post(requests.removeBackground, image)
    }
  }, [webcam]); 
  
  return (
    <CamDiv>
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
    </ButtonContainer>
  </CamDiv>
  )
}
