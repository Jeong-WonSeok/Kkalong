import {useEffect, useState} from 'react'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import styled from 'styled-components';

import TopNav from '../../components/ui/TopNav';

import Close from '../../assets/icon/Nav/close.png'
import { useNavigate } from 'react-router-dom';

export default function AddClothes() {
  const navigate = useNavigate()
  const seasons = ['봄', '여름', '가을', '겨울']
  useEffect(()=>{
    const app = document.getElementById('App') as HTMLDivElement
    app.style.margin = '0'
  },[])

  const [dataUri, setDataUri] = useState('');

  const handleTakePhotoAnimationDone = (dataUri: string) => {
    setDataUri(dataUri);
    //axios 요청 보내기
    const app = document.getElementById('App') as HTMLDivElement
    app.style.marginTop = '60px'
  }

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

  return (
    <div>
      {
        (dataUri)
          ? 
          <div>
            <TopNav type={''}>
              <CloseImg src={Close} onClick={()=> navigate(-1)}/>
              <NavText>옷 추가</NavText>
              <SubmitBtn>추가</SubmitBtn>
            </TopNav>

            <Container>
              <ImgContainer>
                <ImagePreview src={dataUri}/>
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

          : <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={false}
          />
      }
    </div>
  );
}

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