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

import codi1 from "../../img/codi1.png";
import codi2 from "../../img/codi2.png";
import codi3 from "../../img/codi3.png";
import plus from "../../assets/icon/Closet/plus.png";



type LocationType = {
  lat: number,
  lon: number,
  x: number,
  y: number
}

export default function WeatherPage() {
  let [codi, setCodi] = useState([codi1, codi2, codi3, codi1]);
  const now = new Date()
  const navigate = useNavigate();
  let location: LocationType = {
    lat: 0,
    lon: 0,
    x: 0,
    y: 0
  }
  const [nowWeather, setNowWeather] = useState<saveType>()
  const [imgWeather, setImgWeather] = useState({img: '', text: ''})
  const [message, setMessage] = useState(Array<String>)

  useEffect(()=>{
    const nowDay = String(now.getFullYear()) + String(now.getMonth() + 1) + (now.getDate() < 10 ? '0' + String(now.getDate()) : String(now.getDate()))
    const nowTime = TimeChange()

    const start = async() => {
      await getLocation()
      // env파일 안먹어서 key 그대로 올립니다
      const res = await axios.get(`/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=M/89Ftol4BdXqnIv25gXvyRHf3V6Mdon4yO0eKKSIQlhdVxg130z7c7/0Bi/i7xb3fGcn6hCDOw9f+/o2OjfyA==`, {
        params: {
          pageNo: 1,
          numOfRows: 1000,
          dataType: "JSON",
          base_date: nowDay,
          base_time: nowTime,
          nx: location.x,
          ny: location.y,
        }
      })
      console.log(res.data)
      const result = await weather(res.data.response.body.items.item)
      setNowWeather(result.SaveNow)
      
      HandleWeather(result.SaveNow, result.SaveAfter)
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
  const HandleWeather = (Now:saveType, After: saveType) => {
    const result = {
      img: '',
      text: Now.sky
    }
    const msg:string[] = []
    if (After.temp - Now.temp >= 10) {
      msg.push('일교차가 커요. 여분의 옷을 입고가세요')
    }
    if (Now.rainy.includes('비') || Now.rainy.includes('빗방울')) {
      result.img = rain
      result.text = "비"
      setImgWeather(result)
      msg.push('밖에 비가 오고 있어요. 우산 챙기세요!')
    } else if (Now.rainy.includes('눈')) {
      result.img = snow
      result.text = "눈"
      setImgWeather(result)
      msg.push('눈이 오고있어요. 빙판길 조심하세요')
    } else {
      if (Now.sky === "맑음") {
        result.img = sun
        setImgWeather(result)
      } else if (Now.sky === "구름많음") {
        result.img = sunCloud
        setImgWeather(result)
      } else if (Now.sky === "흐림") {
        result.img = cloudy
        setImgWeather(result)
      }
    }

    if (Now.rainy === "없음" && (Now.rainy.includes('비') || Now.rainy.includes('빗방울'))) {
      msg.push('뒤늦게 비예보가 있어요. 우산을 챙겨가세요')
    }
    if (1.6 <= Now.wind  && Now.wind < 3.3 ) {
      msg.push('바람이 약간 부는 날씨에요')
    }  else if (3.3 <= Now.wind) {
      msg.push('바람이 많이 부는 날씨에요. 옷 단단히 입고가세요')
    }

    if (Now.temp < 25 && Now.temp > 15) {
      msg.push('포근한 날씨에요')
    } else if (10 <= Now.temp && Now.temp <= 15) {
      msg.push('쌀쌀한 날씨에요')
    }
    setMessage(msg)
  } 

  return (
    <div>
      <TopNav type={""}>
        <Logo src={logo} />
        <CategoryText1>오늘의 추천</CategoryText1>
        <div style={{ width: "30px", height: "30px" }}></div>
        <MenuIcon src={menu} />
      </TopNav>
      <DateText>{nowDate()}</DateText>
      <WeatherContainer>
      <WeatherImg src={imgWeather.img ? imgWeather.img : sun} />
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
        <WeatherContainer style={{justifyContent: 'space-between'}}>
          <WeatherInfoP>{imgWeather.text} </WeatherInfoP>
          <WeatherInfoP>{nowWeather?.temp}°C</WeatherInfoP>
        </WeatherContainer>
        {message.length > 0 && <WeatherText message={message}/>}
      </div>

      </WeatherContainer>
      

      <DailyText>오늘의 추천 코디</DailyText>
      <CodiBack>
        {codi.map(function (a, i) {
          return (
            <ClothesCodi
              onClick={() => {
                navigate("/daily", { state: { i } });
              }}
            >
              <CodiImg src={codi[i]} />
              {/* <PlusBtn>
                <Plus src={plus} />
              </PlusBtn> */}
            </ClothesCodi>
          );
        })}
      </CodiBack>
      <FooterBar />
    </div>
  );
}
const Logo = styled.img`
  width: 50px;
  height: 30px;
  margin: auto 0;
`;
const CategoryText1 = styled.p`
  line-height: 0;
  margin: auto;
  font-family: var(--base-font-400);
`;
const MenuIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0;
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

const ClothesCodi = styled.button`
  height: 150px;
  width: 150px;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  border: solid 2px #67564e;
`;

const CodiImg = styled.img`
  max-width: 130px;
  max-height: 130px;
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
