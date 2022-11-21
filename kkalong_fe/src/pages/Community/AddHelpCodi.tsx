import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
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
import { useAppSelector } from '../../hooks/reduxHook'
import Slider from '../../components/ui/Slider'


interface SendType {
  img: String,
  title: string,
  content: string,
  range: string,
  open: boolean
}

interface CodyType {
  img: string,
  name: string,
  creater: number,
  open: boolean
}

export default function AddHelpCodi() {
  const params = useParams()
  const navigate = useNavigate()
  const { User } = useAppSelector(state => state.User)
  const [SendData, setSendData]= useState<SendType>({
    img: '',
    title: '',
    content: '',
    open: false,
    range: "모두",
  })
  const [CodyList ,setCodyList] = useState(Array<CodyType>)
  const [IsSelectCody, setIsSelectCody] = useState(false)
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
    const res = await axios.get(requests.closet + User.user_id)
    if (!res.data.closets.length) {
      setCodyList([])
    } else if (!res.data.closets[0].codies.length) {
      setCodyList([])
    } else {
      setCodyList(res.data.closets[0].codies)
    }
    
    setIsSelectCody(true)
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

  const ChangePicture = (idx: any) => {
    setSendData((state) => {
      return {
        // undefined 타입 지정 오류 처리
        ...state as SendType,
        img: CodyList[idx].img
      }
    })
    const Picture = document.getElementById("SelectPicture") as HTMLDivElement
    // 위에 레이어 모두 삭제후
    Picture.replaceChildren()
    Picture.style.backgroundImage=`url(${CodyList[idx].img})`
    Picture.style.backgroundPosition="center"
    Picture.style.width="210px"

    setIsSelectCody(false)
  }
  
  const Submit = async () => {
    // 코디 피드백
    if (params.Category === "Codi") {
      const res = await axios.post(requests.helpCodi, SendData)
      console.log(res)
      navigate(`/community/HelpCodi/true/${res.data.Help.help_id}`)
    // 코디 추천
    } else {
      if (params.HelpCodiId) {
        await axios.put(requests.detailHelpCodi + params.HelpCodiId, SendData)
        navigate(`/community/HelpCodi/true/${params.HelpCodiId}`)
      } else {
        const res = await axios.post(requests.helpCodi, SendData)
        console.log(res)
        navigate(`/community/HelpCodi/true/${res.data.Help.help_id}`)
      } 
    }
  }

  let posY = 0;
  let originalY = 0;

  const dragStartHandler = (e:any) => {
    const CodyDiv = document.getElementById('move') as HTMLDivElement
    // 현재 y의 위치
    posY = e.clientY ? e.clientY : e.changedTouches[0].clientY
    originalY = CodyDiv.offsetTop
  };

  const dragHandler = (e:any) => {
    const CodyDiv = document.getElementById('move') as HTMLDivElement
    const moveY = e.clientY ? e.clientY : e.changedTouches[0].clientY
    CodyDiv.style.top = `${CodyDiv.offsetTop + moveY - posY}px`;
    if (Number(CodyDiv.style.top) < 240) {
      CodyDiv.style.height = `740 - ${CodyDiv.style.top}`
    } else {
      CodyDiv.style.height = '500px'
    }
    posY = moveY
  };

  const dragEndHandler = (e:any) => {
    const moveY = e.clientY ? e.clientY : e.changedTouches[0].clientY
    const CodyDiv = document.getElementById('move') as HTMLDivElement
    if (originalY < moveY) {
      CodyDiv.style.top = ''
      CodyDiv.style.bottom = '-380px'
    } else if (originalY > posY) {
      CodyDiv.style.top = ''
      CodyDiv.style.bottom = '0px'
    }
  };

  return (
    <div>
      <TopNav type={''}>
        <div style={{width: '60px'}}>
        <AdjustBackArrow src={backArrow} onClick={()=>navigate(-1)}/>
        </div>
        <CategoryText>도와주세요 패알못😂</CategoryText>
        <SubmitBtn onClick={Submit}>작성</SubmitBtn>
      </TopNav>

      <AddContainer id="Container">
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

      {/* 코디 선택 창 */}
      {IsSelectCody &&
        <Slider>
          <CodyListContainer>
            {CodyList.length && CodyList.map((Cody, idx) => {
              if (Cody.open) {
                return(
                  <CodyInfoContainer key={idx} onClick={()=>ChangePicture(idx)}>
                    <CodyImg src={Cody.img}/>
                    <CodyP>{Cody.name}</CodyP>
                  </CodyInfoContainer>
                  )
              } else { return ()}
              
              
            })}
            {!CodyList.length && 
              <CodyNone>
                <CodyNoneP>등록된 코디가 없어요</CodyNoneP>
                <CodyMakeBtn onClick={()=> navigate('/pluscodi/Codi')}>코디 만들기</CodyMakeBtn>
              </CodyNone>
            }
          </CodyListContainer>
        </Slider>
      }

      <TitleInput placeholder="제목을 입력해주세요" type="text" value={SendData?.title} onChange={HandleTitle}/>
      <ContextArea id="Context" placeholder='내용을 입력해주세요' value={SendData?.content} onChange={resize}>{SendData?.content}</ContextArea>

      {params.Category === "Closet" && <LabelContainer>
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
      </LabelContainer>}

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
  z-index: 0;
`

const AdjustBackArrow = styled(BackArrow)`
  padding: 5px 30px 5px 0px;
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

const SliderOpenEvent = keyframes`
  0% {
    -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`

const CodyContainer = styled.div`
  border-radius: 20px 20px 0 0;
  border-top: 3px solid var(--primary-color-900);
  position: fixed;
  bottom: 0px;
  left: auto;
  background-color: white;
  height: 500px;
  width: 100%;
  max-width: 360px;
  animation: ${SliderOpenEvent} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  /* 선택하다가 푸터바를 건들이지 않기 위한 z-index */
  z-index: 5;
`

const TopSlider = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 360px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TopSliderButton = styled.div`
  width: 60px;
  height: 7px;
  background-color: var(--primary-color-900);
  border-radius: 5px;
`

const CodyListContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 360px;
  margin-top: 40px;
`

const CodyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  border-radius: 5px;
  border: 1px solid var(--primary-color-500);
`

const CodyImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 5px;
`

const CodyP = styled.p`
  font-family: var(--base-font-400);
  font-size: 14px;
  margin: 5px;
  text-align: center;
`

const CodyNone = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CodyNoneP = styled.p`
  font-family: var(--base-font-300);
  font-size: 1.1rem;
  margin: 0 0 15px;
`

const CodyMakeBtn = styled.button`
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  font-size: 1rem;
  color: white;
  font-family: var(--base-font-300);
  background-color: var(--primary-color-500);
`