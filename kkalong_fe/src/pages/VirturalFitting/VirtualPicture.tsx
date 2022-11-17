import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import FooterBar from '../../components/ui/FooterBar';
import TopNav from '../../components/ui/TopNav';
import { CategoryText } from '../Community/MainCommunity';

import File from '../../assets/icon/Virtual/folder.png'
import DefaultImg from '../../assets/icon/Virtual/image.png'
import Close from '../../assets/icon/Nav/close.png'

import axios from '../../api/axios'
import requests from '../../api/requests'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { ChangeBody } from '../../redux/modules/User';


export default function VirtualPicture() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { User } = useAppSelector(state => state.User)
  const [url, setUrl] = useState<string | ''>('');
  const [IsSelect, setIsSelect] = useState('')
  const [SendFile, setSendFile] = useState<File>()

  useEffect(()=>{
    if (IsSelect === 'Picture' && !url) {
      const app = document.getElementById('App') as HTMLDivElement
      app.style.margin = '0'
      if ( !User.body_img ) {
        const fileBtn = document.getElementById('fileBtn') as HTMLDivElement
        fileBtn.style.opacity = '0.7'
      }
    } 
    
    return () => {
      const app = document.getElementById('App') as HTMLDivElement
      app.style.marginTop = '60px'
      const fileBtn = document.getElementById('fileBtn') as HTMLDivElement
      fileBtn.style.opacity = '1'
    }
  },[IsSelect, url])

  const useDefault = () => {
    if (User.body_img) {
      navigate('VirtualBrandChoice')
    } else {
      alert('기본으로 설정된 이미지가 없습니다. 파일을 등록해주세요')
    }
    
  }

  // 파일선택
  const SelectFile = () => {
    const Input = document.getElementById('SelectFile') as HTMLInputElement
    Input.click()
  }

  const ChangeFile = (e:any) => {
    setUrl(URL.createObjectURL(e.target.files[0]))
    setSendFile(e.target.files[0])
  }

  // 제출
  const Submit = async () => {
    const formdata = new FormData()
    formdata.append('bodyImg', SendFile as File)

    await dispatch(ChangeBody(formdata, User.user_id))    
    navigate('VirtualBrandChoice/')
  }


  
  return (
    <div>
    {!IsSelect && 
      <div>
      <TopNav type={'menu'}>
        <CategoryText>가상피팅</CategoryText>
        <div style={{width: '56px', height: '36px'}}></div>
      </TopNav>
      <Container>
        <BtnDiv id="fileBtn" onClick={useDefault}>
          <Img><SelectImg style={{position: 'absolute', left: '-5px', top: '-5px'}}src={DefaultImg}/></Img>
          <SelectP>이전 이미지를 사용</SelectP>
        </BtnDiv>
        <BtnDiv onClick={SelectFile}>
          <SelectImg src={File}/>
          <SelectP>파일에서 선택 {'&'} 촬영 </SelectP>
        </BtnDiv>
        <FileSelect id="SelectFile" type="file" accept='image/*' onChange={ChangeFile}/>
        {/* <BtnDiv onClick={()=>{setIsSelect("Picture"); startVideo()}}>
          <SelectImg style={{width :'35px', height: '30px', margin: '0 2.5px'}} src={Picture}/>
          <SelectP>촬영하기</SelectP>
        </BtnDiv> */}
      </Container>
      <FooterBar/>
      {url && 
        <ModalContainer>
          <ContentDiv>
          <Container style={{minHeight: '300px', margin: '7px 0'}}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'start'}}>
              <MenuImg src={Close} style={{width: '40px', height: '40px', marginLeft: '5px'}} onClick={()=>setUrl('')}/>
            </div>
            <PreviewImg src={url}/>
            <BtnContainer>
              <Button style={{backgroundColor: 'var(--primary-color-500)'}} onClick={()=>{SelectFile()}}>재선택</Button>
              <Button style={{backgroundColor: 'var(--primary-color-900)', color: 'white'}} onClick={Submit}>완료</Button>
            </BtnContainer>
          </Container>
          </ContentDiv>
        </ModalContainer>}
      </div>
    }
    </div>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 360px;
  min-height: 400px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  width: 85%;
  max-width: 260px;
  height: 60px;
  margin-bottom: 30px;
  background-color: var(--primary-color-200);
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
`

const Img = styled.div`
  position: relative;
  background-color: white;
  width: 28px;
  height: 28px;
  margin: 0 6px;
`

const SelectImg = styled.img`
  width: 40px;
  height: 40px;
`

const SelectP = styled.p`
  margin: 0 10px;
  font-family: var(--base-font-300);
  font-size: 1rem;
`

const FileSelect = styled.input`  
  display: none;
`

const ChangeDisplay = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 25px;
  background-color: var(--primary-color-900);
  right: 20px;
  bottom: 10px;
`

const PreviewImg = styled.img`
  max-width: 300px;
  width: 85%;
  border-radius: 20px;
`

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0;

`

const Button = styled.button`
  border: none;
  width: 140px;
  height: 35px;
  border-radius: 10px;
  font-family: var(--base-font-400);
  font-size: 1rem;
`

const MenuImg = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0;
`

const ModalContainer = styled.div`
  background-color: rgba(0,0,0, 0.2);
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
`

const ContentDiv = styled.div`
  width: 80%;
  max-width: 300px;
  min-height: 300px;
  border-radius: 20px;
  background-color: white;
  border: 2px solid var(--primary-color-500);
`

const Cam = styled.video`
  width: 100vw;
  max-width: 360px;
  height: 100vh;
`