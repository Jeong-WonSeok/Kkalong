import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios'
import requsests from '../../api/requests'

import TopNav from '../../components/ui/TopNav'
import { Container } from './MainCommunity'

import AddPictureIcon from '../../assets/icon/Community/pictureAdd.png'
import BackArrow from '../../assets/icon/Nav/BackArrow.png'
import AddExample from '../../assets/icon/Community/AddExample.png'
import FooterBar from '../../components/ui/FooterBar'
import {ArticleType} from '../../pages/Community/DetailBestDress'
import FormDataChange from '../../hooks/FormDataChange'

interface SendType {
  post_img: File | String,
  content: string
}

export default function AddBestDress() {
  const params = useParams()
  const [ SendData, setSendData ] = useState<SendType>()
  const navigate = useNavigate()

  // 만약 Edit 상태라면 미리 데이터를 받아온다.
  useEffect(()=>{
    const Edit = async () => {
      if (params.BestDressId) {
        const res = await axios.get(requsests.detailBestDress + params.BestDressId)
        const BestDress = res.data as ArticleType
        setSendData({
          post_img: BestDress.Best.img,
          content: BestDress.Best.content 
        })
        const Picture = document.getElementById("SelectPicture") as HTMLDivElement
        // 위에 레이어 모두 삭제후
        Picture.replaceChildren()
        Picture.style.backgroundImage=`url(${SendData?.post_img})`
        Picture.style.backgroundPosition="center"
        Picture.style.width="auto"
      }
    }
    Edit()
  }, [])

  const SelectPicture = () => {
    document.getElementById("file")?.click()
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

  const ChangePicture = (e: any) => {
    setSendData((state) => {
      return {
        // undefined 타입 지정 오류 처리
        ...state as SendType,
        post_img: e.target.files[0]
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
    const result = FormDataChange(SendData)
    result.get('post_img')
    // FormData의 value 확인
    if (params.BestDressId) {
      await axios.put(requsests.detailBestDress + params.Id, result,{headers: {'Content-Type': 'multipart/form-data'}})
      navigate(`/community/BestDress/${params.Id}`)
    } else {
      await axios.post(requsests.bestDress, result, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
        console.log(res)
        navigate(`/community/BestDress/${res.data.Best.id}`)
      })
      .catch(err => console.error(err))
    }
  }

  return (
    <div>
      <TopNav type={""}>
        <div style={{width: '60px', height: '40px'}}>
        <MenuImg src={BackArrow} onClick={()=>navigate(-1)}/>
        </div>
        <CategoryText>도전! 베스트 드레서✨</CategoryText>
        <SubmitBtn onClick={Submit}>작성</SubmitBtn>
      </TopNav>
      <AddContainer>
        <PictureDiv>
          <AddPicture id="SelectPicture" onClick={SelectPicture}>
            <AddLayer>
              <AddIcon src={AddPictureIcon}/>
              <AddText>사진추가</AddText>
            </AddLayer>
          </AddPicture>
          <PictureInput type="file" id="file" onChange={ChangePicture} accept="image/*" required/>
        </PictureDiv>

        <LineDiv></LineDiv>

        <PictureDiv>
          <ContextArea id="Context" placeholder='내용을 입력해주세요' onChange={resize}>{SendData?.content}</ContextArea>
        </PictureDiv>
        
        <FooterBar/>
      </AddContainer>
    </div>
    
  )
}

const AddContainer = styled(Container)`

`

const MenuImg = styled.img`
  width: 30px;
  height: 30px;
  padding-right: 30px;
  margin: 5px 0;
`

export const SubmitBtn = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: var(--primary-color-500);
  margin: 5px 0;
  font-family: var(--base-font-600);
  &:hover {
    background-color: var(--primary-color-700);
    color: white;
  }
`

const CategoryText = styled.p `
  font-size: 20px;
  font-family: var(--base-font-600);
  margin: 0;
  line-height: 40px;
  height: 40px;
`

const PictureDiv = styled.div`
  width: 100%;
`

const AddPicture = styled.div`
  background-image: url(${AddExample});
  position: relative;
  max-width: 340px;
  width: 140px;
  height: 200px;
  background-size: cover;
  overflow: hidden;
  border-radius: 20px;
  margin: 0 auto;
`

const AddLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: rgba(38,38,38,0.74);
  z-index: 1;
`

const AddIcon = styled.img`
  width: 30px;
  height: 30px;
  z-index: 2;
  position: relative;
  top: 85px;
  left: 55px;
`

const AddText = styled.span`
  font-size: 12px;
  font-family: var(--base-font-200);
  color: white;
  margin: 0;
  z-index: 2;
  position: relative;
  top: 105px;
  left: 20px;
`

const PictureInput = styled.input`
  display: none;
`

const ContextArea = styled.textarea`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-radius: 20px;
  padding: 10px;
  border: 2px solid var(--primary-color-300);
  width: 90%;
`

const LineDiv = styled.div`
  position: relative;
  left: -10px;
  background-color: var(--primary-color-700);
  width: 100vw;
  max-width: 360px;
  margin: 10px 0; 
  height: 2px;
`