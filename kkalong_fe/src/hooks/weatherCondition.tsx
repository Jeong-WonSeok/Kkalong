interface weatherType {
  baseDate: string,
  baseTime: string,
  category: string,
  fcstDate: string,
  fcsttime: string,
  fcstValue: string,
  nx: number,
  ny: number
}

export interface saveType {
  temp: number,
  hourRain: number,
  sky: string,
  wet: number,
  rainy: string,
  wind: number
}

export default async function weather (weatherArray: Array<weatherType>) {
  let nowWeather = []
  let after6Weather = []
  const skyCode = ['', '맑음', '', '구름많음' , '흐림']
  const rainCode = ['없음', '비', '비/눈', '눈', '', '빗방울', '빗방울/눈날림', '눈날림']

  for (let i=0; i<10; i++) {
    nowWeather.push(weatherArray[i*6])
    after6Weather.push(weatherArray[i*6+5])
  }
  
  // 기온, 1시간 강우량, 하늘 상태, 습도, 강수형태, 풍속
  const Category = ["T1H", "RN1", "SKY", "REH", "PTY", "WSD"]
  nowWeather = nowWeather.filter(weather => {
    return Category.includes(weather.category)
  })

  after6Weather = after6Weather.filter(weather => {
    return Category.includes(weather.category)
  })

  let SaveNow = {} as saveType
  let SaveAfter = {} as saveType

  const type = (weather: weatherType, saveObject:saveType) => {
    switch (weather.category) {
      case "T1H":
        saveObject.temp = Number(weather.fcstValue)
        break;
      case "RN1":
        saveObject.hourRain = weather.fcstValue === "강수없음" ? 0 : Number(weather.fcstValue)
        break;
      case "REH":
        saveObject.wet = Number(weather.fcstValue)
        break;
      case "WSD":
        saveObject.wind = Number(weather.fcstValue)
        break;
      case "SKY":
        saveObject.sky = skyCode[Number(weather.fcstValue)]
        break;
      case "PTY":
        saveObject.rainy = rainCode[Number(weather.fcstValue)]
        break;
      default:
        break;
    }
    return saveObject
  }

  for (let i=0; i<6; i++) {
    SaveNow = type(nowWeather[i], SaveNow)
    SaveAfter = type(after6Weather[i], SaveAfter)
  }

  return {SaveNow, SaveAfter}
}
