import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import axios from  '../../api/axios'
import requests from  '../../api/requests'

import FooterBar from '../../components/ui/FooterBar'
import TopNav from '../../components/ui/TopNav'
import { Container } from './MainCommunity'
import { BackArrow, CategoryText } from './MainBestDress'
import { CodiBackground, SelectContainer, ImgContainer,SelectImg, SelectSpan } from './AddSelectHelpCodi'

import backArrow from '../../assets/icon/Nav/BackArrow.png'
import AddCodi from '../../assets/icon/Community/addCodi.png'
import { SubmitBtn } from './AddBestDress'

interface SendType {
  img: String,
  title: string,
  content: string,
  range: string,
  open: boolean
}


export default function AddHelpCodi() {
  const params = useParams()
  const navigate = useNavigate()
  const [SendData, setSendData]= useState<SendType>()
  const SelectOptions = ['친구', '모두']

  useEffect(() => {
    const Edit = async () => {
      if (params.HelpCodiId) {
        
        const res = await axios.get(requests.detailHelpCodi + params.HelpCodiId)
        setSendData({
          img: res.data.Help.help_img,
          title: res.data.Help.title,
          open: res.data.Help.open,
          content: res.data.Help.content,
          range: res.data.Help.range,
        })

        const Picture = document.getElementById("SelectPicture") as HTMLDivElement
        // 위에 레이어 모두 삭제후
        Picture.replaceChildren()
        Picture.style.backgroundImage=`url(${SendData?.img})`
        Picture.style.backgroundPosition="center"
        Picture.style.width="auto"
      }
      
      if (params.Category === "Closet") {
        setSendData((prev) => ({
          ...prev as SendType,
          img: '',
          open: true,
          range: '친구'
        }))
      }
    }

    Edit()
    
  }, [])


  // 코디 선택하는 로직, 옷장 완성되고 나서 진행
  const SelectCody = async (e:any) => {
    // const user = localStorage.getItem('useProfile')
    // const res = await axios.get(requests.closet + user.user_id)
    // res.data.closets[0].codies
  }

  const resize = (e: any) => {
    setSendData((prevState: any) => ({
      ...prevState,
      "content": e.target.value
    }))
    const textEle = document.getElementById('Context') as HTMLTextAreaElement
    textEle.style.height = '1px';
    textEle.style.height = e.target.scrollHeight + 'px';
  }

  const HandleTitle = (e: any) => {
    setSendData((current) => {
      return({
        ...current as SendType,
        title: e.target.value
      })
    })
  }

  const HandleOpen = (e:any) => {
    setSendData((state) => {
      return {
        // undefined 타입 지정 오류 처리
        ...state as SendType,
        range: e.target.value,
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
  
  const Submit = async () => {
    // 코디 피드백
    if (params.Category === "Codi") {

    // 코디 추천
    } else {
      const res = await axios.post(requests.helpCodi, SendData)
      console.log(res)
      navigate(`/community/HelpCodi/${res.data.Help.help_id}`)
    }
  }

  return (
    <div>
      <TopNav type={''}>
        <div style={{width: '60px'}}>
        <AdjustBackArrow src={backArrow} onClick={()=>navigate(-1)}/>
        </div>
        <CategoryText>도와주세요 패알못😂</CategoryText>
        <SubmitBtn onClick={Submit}>작성</SubmitBtn>
      </TopNav>

      <AddContainer>
        {/* 코디 추가 시 */}
        {params.Category === "Codi" && 
        <CodiBackground id="SelectPicture" onClick={SelectCody}>
        <SelectContainer>
          <ImgContainer>
            <SelectImg src={AddCodi}/>
            <SelectSpan>코디 추가</SelectSpan>
          </ImgContainer>
        </SelectContainer>
      </CodiBackground>
      }

      <TitleInput placeholder="제목을 입력해주세요" type="text" value={SendData?.title} onChange={HandleTitle}/>
      <ContextArea id="Context" placeholder='내용을 입력해주세요' value={SendData?.content} onChange={resize}>{SendData?.content}</ContextArea>

      <LabelContainer>
        <Label>옷장 공개 범위</Label>
        <SelectOpen onChange={HandleOpen}>
          {SelectOptions.map((Option, idx) => {
            if (SendData?.range === Option) {
              return (
                <SelectOption selected value={Option} key={idx} >
                  {Option}
                </SelectOption>
              )
            } else {
              return (
                <SelectOption value={Option} key={idx} >
                  {Option}
                </SelectOption>
              )
            }
            
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
  height: 43.992px;
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