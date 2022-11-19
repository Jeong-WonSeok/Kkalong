import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import dfs_xy_conv from '../../hooks/chagneLatLon'
import {TimeChange, nowDate} from "../../hooks/TimeChange";
import weather, { saveType } from "../../hooks/weatherCondition";

import TopNav from "../../components/ui/TopNav";
import FooterBar from "../../components/ui/FooterBar";
import WeatherText from "../../components/closet/WeatherText";

import logo from "../../assets/icon/logo/kkalongLogo.png";
import menu from "../../assets/icon/Nav/menu.png";

import sun from "../../assets/icon/Closet/sun.png";
import rain from "../../assets/icon/Closet/rainy.png";
import sunCloud from "../../assets/icon/Closet/sunCloud.png";
import cloudy from "../../assets/icon/Closet/cloudy.png";
import snow from '../../assets/icon/Closet/snow.png'

import plus from "../../assets/icon/Closet/plus.png";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { getWeather } from "../../redux/modules/Weather";
import RecommandCody from "../../components/Recommand/RecommandCody";

type LocationType = {
  lat: number,
  lon: number,
  x: number,
  y: number
}

type WeatherType = {
  temp: string,
  weather: string
}

export default function WeatherPage() {
  // let [codi, setCodi] = useState([codi1, codi2, codi3, codi1]);
  const now = new Date()
  const dispatch = useAppDispatch()
  const {pending, Weather, Recommand} = useAppSelector(state => state.Weather)
  const navigate = useNavigate();
  let location: LocationType = {
    lat: 0,
    lon: 0,
    x: 0,
    y: 0
  }
  const [imgWeather, setImgWeather] = useState({img: '', text: ''})
  const [WeatherList, setWeatherList] = useState(Array<WeatherType>)
  const [Message, setMessage] = useState(Array<String>)
  useEffect(()=>{
    const nowDay = String(now.getFullYear()) + String(now.getMonth() + 1) + (now.getDate() < 10 ? '0' + String(now.getDate()) : String(now.getDate()))
    const nowTime = TimeChange()

    const start = async() => {
      await getLocation()
      // // env파일 안먹어서 key 그대로 올립니다
      // const res = await axios.get(`/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=M%2F89Ftol4BdXqnIv25gXvyRHf3V6Mdon4yO0eKKSIQlhdVxg130z7c7%2F0Bi%2Fi7xb3fGcn6hCDOw9f%2B%2Fo2OjfyA%3D%3D`, {
      //   params: {
      //     pageNo: 1,
      //     numOfRows: 1000,
      //     dataType: "JSON",
      //     base_date: nowDay,
      //     base_time: nowTime,
      //     nx: location.x,
      //     ny: location.y,
      //   }
      // })
      dispatch(getWeather(location.x, location.y)) 
      setWeatherList([
        {weather: Weather.today_Weather, temp: Weather.today},
        {weather: Weather.tomorrow_Weather, temp: Weather.tomorrow},
        {weather: Weather.tomorrowAfter_Weather, temp: Weather.tomorrowAfter}])
      HandleWeather()
    }
    start()
  },[])

  const getLocation = async () => {
    if (navigator.geolocation) { // GPS를 지원하면
      // 이것으로 현재 위치를 가져온다.
      var getPosition = function () {
        return new Promise(function (reslove, reject) {
          navigator.geolocation.getCurrentPosition(reslove, reject)
        })
      }
      
      // 위치 변환
      return await getPosition()
        .then(async (position: any) => {
          const result  = new Promise((reslove, reject) => {
            reslove(dfs_xy_conv('toXY', position.coords.latitude , position.coords.longitude))
          })
          
          await result.then((res: any) => {
            location = res
            return res
          })
        })
        .catch((error) => {
          console.error(error.message)
        });
    } else {
      alert('GPS 정보를 불러드리지 못했습니다.\n 새로고침을 해주세요');
    }
  }

  // 날씨 이미지 및 메세제 정의
  const HandleWeather = () => {
    const result = {
      img: '',
      text: Weather.today_Weather
    }
    const msg:string[] = []
    if (Weather.today_Weather === "비") {
      result.img = rain
      setImgWeather(result)
      msg.push('밖에 비가 오고 있어요. 우산 챙기세요!')
    } else if (Weather.today_Weather === "맑음") {
      result.img = sun
      setImgWeather(result)
      msg.push('오늘은 맑은 날이에요')
    } else if (Weather.today_Weather === "구름") {
      result.img = sunCloud
      setImgWeather(result)
      msg.push('오늘은 구름이 약간 껴있어요')
    } else if (Weather.today_Weather === "흐림") {
      result.img = cloudy
      setImgWeather(result)
      msg.push('오늘은 흐린날이에요')
    }

    if (Number(Weather.today) < 25 && Number(Weather.today) > 15) {
      msg.push('포근한 날씨에요')
    } else if (10 <= Number(Weather.today) && Number(Weather.today) <= 15) {
      msg.push('쌀쌀한 날씨에요')
    } else if (Number(Weather.today) < 10) {
      msg.push('날씨가 많이 추워요')
    }
    setMessage(msg)
  } 

  return (
    <div>
      <TopNav type={""}>
        <Logo src={logo} />
        <CategoryText1>오늘의 추천</CategoryText1>
        <div style={{ width: "50px", height: "30px" }}></div>
      </TopNav>
      <DateText>{nowDate(0)}</DateText>
      <WeatherContainer>
      <WeatherImg src={imgWeather.img ? imgWeather.img : sun} />
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
        <WeatherContainer style={{justifyContent: 'space-between'}}>
          <WeatherInfoP>{imgWeather.text} </WeatherInfoP>
          <WeatherInfoP>{WeatherList[0]?.temp}°C</WeatherInfoP>
        </WeatherContainer>
        {Message.length > 0 && <WeatherText message={Message}/>}
      </div>

      </WeatherContainer>

      <CodiBack>
        {Recommand.map((cody, idx) => {
          return (
            <div>
              <DailyText>{nowDate(idx)} {WeatherList[idx]?.weather} {WeatherList[idx]?.temp}°C</DailyText>
              <CodyList>
                <RecommandCody Cody={Recommand[idx].casual}/>
                <RecommandCody Cody={Recommand[idx].dandy}/>
                <RecommandCody Cody={Recommand[idx].formal}/>
                <RecommandCody Cody={Recommand[idx].hiphop}/>
              </CodyList>
            </div>
          );
        })}
      </CodiBack>
      <FooterBar />
    </div>
  )
}

const Logo = styled.img`
  width: 50px;
  height: 30px;
  margin: auto 0;
`;
const CategoryText1 = styled.p`
  line-height: 0;
  margin: auto;
  font-family: var(--base-font-600);
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`

const WeatherInfoP = styled.p`
  font-family: var(--base-font-400);
  font-size: 20px;
  margin: 0;
`

const DateText = styled.p`
  font-family: var(--base-font-400);
  font-size: 20px;
  margin: 20px 0;
  text-align: center;
`;
const WeatherImg = styled.img`
  width: 100px;
  height: 100px;
`;

const DailyText = styled.p`
  font-family: var(--base-font-400);
  color: #5e5757;
  font-size: 18px;
  margin-left: 10px;
`;

const CodiBack = styled.div`
  min-height: 400px;
  background-color: #e5ddce;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CodyList = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
`

// const PlusBtn = styled.button`
//   width: 30px;
//   height: 30px;
//   background-color: #b79b7e;
//   margin-left: 80px;
//   border: none;
//   border-radius: 50px;
// `;

// const Plus = styled.img`
//   width: 25px;
//   height: 25px;
// `;
