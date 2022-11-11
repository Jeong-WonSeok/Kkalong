import {useEffect, useState, useRef, useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import styled from 'styled-components';

import TopNav from '../../components/ui/TopNav';

import Close from '../../assets/icon/Nav/close.png'
import axios from '../../api/axios'
import requests from '../../api/requests'

export default function AddClothes() {
  const navigate = useNavigate()
  const webcam = useRef<Webcam>(null)
  const [url, setUrl] = useState<string | ''>('');
  const seasons = ['봄', '여름', '가을', '겨울']
  useEffect(()=>{
    const app = document.getElementById('App') as HTMLDivElement
    app.style.margin = '0'

    return () => {
      app.style.marginTop = '60px'
    }
  },[])


  const videoConstraints = {
    width: 1024,
    height: 768,
    facingMode: "user"
  };

  const ChangeBackground = (season: string) => {
    const check = document.getElementById(season) as HTMLInputElement
    const label = document.getElementById(`label_${season}`) as HTMLLabelElement
    if (check.checked) { 
      label.style.backgroundColor = '#b79b7e'
      label.style.color = "white"
    } else {
      label.style.backgroundColor = ''
      label.style.color = "black"
    }
    
  }

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
    <div>
      {
        (url)
          ? 
          <div>
            <TopNav type={''}>
              <CloseImg src={Close} onClick={()=> navigate(-1)}/>
              <NavText>옷 추가</NavText>
              <SubmitBtn>추가</SubmitBtn>
            </TopNav>

            <Container>
              <ImgContainer>
                <ImagePreview src={url}/>
              </ImgContainer>

              <SeasonCategory>
                <SeasonP>계절</SeasonP>
                <CheckboxContainer>
                  {seasons.map((season, index) => {
                    return (
                      <div key={index}>
                        <SeasonCheckbox value={season} id={season} onChange={() => ChangeBackground(season)}/>
                        <SeasonLabel htmlFor={season} id={`label_${season}`}>{season}</SeasonLabel>
                      </div>
                    )
                  })}
                </CheckboxContainer>
              </SeasonCategory>

              <SeasonCategory>
                <SeasonP>구분</SeasonP>
              </SeasonCategory>
            </Container>
          </div>

          : 
          // 모바일 캠 적용중
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
          
      }
    </div>
  );
}

export const CamDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: auto;
  width: 100%;
  height: 70px;
  max-width: 360px;
  display: flex;
  justify-content: center;
`

export const CaptureButton = styled.div`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid var(--primary-color-900);
  position: relative;
  z-index: 5;
`

export const ChildCaptureButton = styled.div`
  left: -8.5px;
  top: -8.5px;
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid var(--primary-color-900);
  z-index: 3;
`


const ImagePreview = styled.img`
  width: 100%;
  max-width: 300px;
  height: 100%;
`

const Container = styled.div`
  width: 100%;
  max-width: 360px;
`

const CloseImg = styled.img`
  width: 30px;
  height: 30px;
`

const NavText = styled.p`
  margin: 0;
  font-family: var(--base-font-600);
  font-size: 20px;
`

const SubmitBtn = styled.button`
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: var(--primary-color-500);
  text-align: center;
  font-family: var(--base-font-300);
  font-size: 12px;
`

const ImgContainer = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 0 10px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SeasonCategory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 320px;
  height: 50px;
  padding: 0 20px;
`

const SeasonP = styled.p`
  font-family: var(--base-font-400);
  font-size: 16px;
  margin: 0;
`

const CheckboxContainer = styled.div`
  display:flex;
  flex-direction: row;
  background-color: var(--primary-color-100);
  border-radius: 50px;
  align-items: center;
`

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
`

const SeasonCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`