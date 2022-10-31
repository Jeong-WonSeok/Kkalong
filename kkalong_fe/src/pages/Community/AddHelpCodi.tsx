import { useState } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'

import FooterBar from '../../components/ui/FooterBar'
import TopNav from '../../components/ui/TopNav'
import { Container } from './MainCommunity'
import { BackArrow, CategoryText } from './MainBestDress'
import { CodiBackground, SelectContainer, ImgContainer,SelectImg, SelectSpan } from './AddSelectHelpCodi'

import backArrow from '../../assets/icon/Nav/BackArrow.png'
import AddCodi from '../../assets/icon/Community/addCodi.png'
import { SubmitBtn } from './AddBestDress'

interface SendType {
  Picture: File,
  Title: string,
  context: string,
  open: boolean
}


export default function AddHelpCodi() {
  const params = useParams()
  const navigate = useNavigate()
  const [SendData, setSendData]= useState<SendType>()
  const SelectOptions = ['친구', '전체']

  const SelectFile = (e:any) => {
    const input = document.getElementById('SelectCodi') as HTMLInputElement
    input.click()
  }

  const resize = (e: any) => {
    setSendData((prevState: any) => ({
      ...prevState,
      "context": e.target.value
    }))
    const textEle = document.getElementById('Context') as HTMLTextAreaElement
    textEle.style.height = '1px';
    textEle.style.height = e.target.scrollHeight + 'px';
  }

  const HandleTitle = (e: any) => {
    setSendData((current) => {
      return({
        ...current as SendType,
        itle: e.target.value
      })
    })
  }

  const HandleOpen = (e:any) => {
    setSendData((state) => {
      return {
        // undefined 타입 지정 오류 처리
        ...state as SendType,
        open: e.target.value == "친구" ? false : true
      }
    })
  }

  const ChangePicture = (e: any) => {
    setSendData((state) => {
      return {
        // undefined 타입 지정 오류 처리
        ...state as SendType,
        Picture: e.target.files[0]
      }
    })
    const Picture = document.getElementById("SelectPicture") as HTMLDivElement
    // 위에 레이어 모두 삭제후
    Picture.replaceChildren()
    const ImgUrl = URL.createObjectURL(e.target.files[0])
    Picture.style.backgroundImage=`url(${ImgUrl})`
    Picture.style.backgroundPosition="center"
    Picture.style.width="auto"
  }

  return (
    <div>
      <TopNav type={''}>
        <div style={{width: '60px'}}>
        <AdjustBackArrow src={backArrow} onClick={()=>navigate('/community/HelpCodi/Add')}/>
        </div>
        <CategoryText>도와주세요 패알못😂</CategoryText>
        <SubmitBtn>작성</SubmitBtn>
      </TopNav>

      <AddContainer>
        {/* 코디 추가 시 */}
        {params.Category === "Codi" && 
        <CodiBackground id="SelectPicture" onClick={SelectFile}>
        <SelectContainer>
          <ImgContainer>
            <SelectImg src={AddCodi}/>
            <SelectSpan>코디 추가</SelectSpan>
          </ImgContainer>
        </SelectContainer>
      <CodiInput id="SelectCodi" type="file" onChange={ChangePicture} accept="image/*" required/>
      </CodiBackground>
      }

      <TitleInput placeholder="제목을 입력해주세요" type="text" value={SendData?.Title} onChange={HandleTitle}/>
      <ContextArea placeholder='내용을 입력해주세요' value={SendData?.context} onChange={resize}></ContextArea>

      <LabelContainer>
        <Label>옷장 공개 범위</Label>
        <SelectOpen onChange={HandleOpen}>
          {SelectOptions.map((Option, idx) => {
            return (
              <SelectOption value={Option} key={idx} >
                {Option}
              </SelectOption>
            )
          })}
        </SelectOpen>
      </LabelContainer>

      </AddContainer>

      <FooterBar/>
    </div>
  )
}

const AddContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const AdjustBackArrow = styled(BackArrow)`
  padding: 5px 30px 5px 0px;
`

const CodiInput = styled.input`
  display: none;
` 

const TitleInput = styled.input`
  margin-top: 10px;
  border: none;
  padding: 5px 10px;
  width: 90%;
  font-size: 16px;
  font-family: var(--base-font-300);
  border-radius: 10px;
  background-color: var(--primary-color-100);
`

const ContextArea = styled.textarea`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  border: none;
  font-family: var(--base-font-300);
  background-color: var(--primary-color-100);
  width: 90%;
`

const LabelContainer = styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Label = styled.label`
  margin-left: 10px;
  font-size: 16px;
  font-family: var(--base-font-300);
`

const SelectOpen = styled.select`
  margin-right: 10px;
  background-color: var(--primary-color-100);
  width: 120px;
  height: 30px;
  font-size: 16px;
  font-family: var(--base-font-300);
  border: none;
  text-align: center;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`

const SelectOption = styled.option`
  text-indent: 40%;
  background-color: var(--primary-color-100);
  &:hover {
    background-color: var(--primary-color-200);
  }
`