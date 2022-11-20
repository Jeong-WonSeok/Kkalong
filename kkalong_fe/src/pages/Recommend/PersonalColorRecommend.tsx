import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

import FooterBar from '../../components/ui/FooterBar'
import TopNav from '../../components/ui/TopNav'

import Weather from '../../assets/icon/Recommand/weather.png'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'

import { CategoryText } from '../Community/MainCommunity'
import { ChangeMode, TextP, ImgContainer } from './WeatherPage'
import { CodyType, getColor } from '../../redux/modules/Recommend'
import RecommandCody from '../../components/Recommand/RecommandCody'

type seasonType = {
  Color: string
}

export default function PersonalColorRecommend() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {User} = useAppSelector(state => state.User)
  const {personalColor, ColorRecommand} = useAppSelector(state => state.Recommend)
  const SeasonColor = {
    "spring": "#F08080",
    "btnSpring": "#e66b6b",
    "summer": "#87CEFA",
    "btnSummer": "#63b2e4",
    "fall": "#ece6cc",
    "btnFall": "#c0b88d",
    "winter": "#FFFAFA",
    "btnWinter": "#afa7a7",
  }
  const [Color, setColor] = useState("")
  const [BtnColor, setBtnColor] = useState("")
  const [Category, setCategory] = useState("casual")
  const [Recommand, setRecommand] = useState(Array<CodyType>)

  useEffect(()=>{
    dispatch(getColor())

    if (personalColor === "spring") {
      setColor(SeasonColor.spring)
      setBtnColor(SeasonColor.btnSpring)
    } else if (personalColor === "summer") {
      setColor(SeasonColor.summer)
      setBtnColor(SeasonColor.btnSummer)
    } else if (personalColor === "fall") {
      setColor(SeasonColor.fall)
      setBtnColor(SeasonColor.btnFall)
    } else if (personalColor === "winter") {
      setColor(SeasonColor.winter)
      setBtnColor(SeasonColor.btnWinter)
    }

    setRecommand(ColorRecommand.casual)
  },[])

  useEffect(()=>{
    const SelectBtn = document.getElementById(Category) as HTMLDivElement
    SelectBtn.style.opacity = '1'

    if (Category === "casual") {
      setRecommand(ColorRecommand.casual)
    } else if (Category === "dandy") {
      setRecommand(ColorRecommand.dandy)
    } else if (Category === "formal") {
      setRecommand(ColorRecommand.formal)
    } else if (Category === "hiphop") {
      setRecommand(ColorRecommand.hiphop)
    } 

    return () => {
      SelectBtn.style.opacity = ''
    }

  },[Category])

  return (
    <div>
      <TopNav type="menu">
        <CategoryText>퍼스널 컬러 코디 추천</CategoryText>
        <ImgContainer onClick={()=>navigate('/recommend/weather')}>
          <ChangeMode src={Weather}/>
          <TextP>날씨추천</TextP>
        </ImgContainer>
      </TopNav>

      <Container>
        <Info>{User.nickname}님의 퍼스널 컬러는 <PersonalColor Color={Color}>{personalColor}</PersonalColor></Info>
        <CodyContainer Color={Color}>
          <SelectBar>
            <SelectBtn id="casual" Color={BtnColor} onClick={()=>setCategory('casual')}>캐주얼</SelectBtn>
            <SelectBtn id="dandy" Color={BtnColor} onClick={()=>setCategory('dandy')}>댄디</SelectBtn>
            <SelectBtn id="formal" Color={BtnColor} onClick={()=>setCategory('formal')}>포멀</SelectBtn>
            <SelectBtn id="hiphop" Color={BtnColor} onClick={()=>setCategory('hiphop')}>힙합</SelectBtn>
          </SelectBar>

          <CodyDiv>
          {Recommand.map((Cody, idx) => {
            return(
            <div key={idx}>
              <RecommandCody Cody={Cody} />
            </div>
            )
          })}
          </CodyDiv>

        </CodyContainer>                                          
      </Container>

      <FooterBar/>
    </div>

  )
}

const Container = styled.div`
  padding:10px;
`

const Info = styled.p`
  font-size: 1.1rem;
  font-family: var(--base-font-400);
`

const PersonalColor = styled.span<seasonType>`
  font-size: 1.1rem;
  font-family: var(--base-font-500);
  color: ${props => props.Color};
  text-shadow: ${props =>props.Color === "#FFFAFA" ? css`1px 1px 4px rgba(0, 0, 0, 0,25)` : css``};
`

const CodyContainer = styled.div<seasonType>`
  background-color: ${props => props.Color};
  opacity: 0.7;
  width: 100%;
  padding: 10px 0;
  border-radius: 5px 5px 0 0;
`

const SelectBar = styled.div`
  display: flex;
  flex-direction: row;
`

const SelectBtn = styled.div<seasonType>`
  width: 80px;
  height: 30px;
  font-size: 0.9rem;
  font-family: var(--base-font-400);
  background-color: ${props => props.Color};
  border-radius: 10px;
  margin: 5px 5px;
  line-height: 30px;
  text-align: center;
  opacity: 0.6;
`

const CodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`