import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import axios from "../../api/axios";
import requests from '../../api/requests'

const GET_WEATHER_PENDING = 'Recommand/GET_WEATHER_PENDING' 
const GET_WEATHER_SUCCESS = 'Recommand/GET_WEATHER_SUCCESS' 

export interface ClothType {
  clothing_id: number,
  brand_name: string,
  code: number,
  color: string,
  fall: number,
  gender: string,
  img: string,
  main_category: number,
  name: string,
  season: string,
  spring: number,
  style: string,
  sub_category: number,
  summer: number,
  url: string,
  winter: number,
  brand_id: number
}

export interface CodyType {
  top: ClothType,
  bottom: ClothType,
  outer: ClothType
  bag: ClothType,
  hat: ClothType,
  shoes: ClothType,
}

export interface RecommandType {
  formal: CodyType,
  casual: CodyType,
  dandy: CodyType,
  hiphop: CodyType
}

export interface WeatherType {
  tomorrowAfter: string,
  tomorrowAfter_Weather: string,
  tomorrow_Weather: string,
  today_Weather: string,
  today: string,
  tomorrow: string
}

export interface WeatherRecommand {
  one: RecommandType,
  two: RecommandType,
  three: RecommandType,
  // 배열에 띄어쓰기가 있어서 어케 할 수 가 없음
  weather: WeatherType
}

export interface stateType {
  pending: boolean,
  error: boolean,
  Weather: WeatherType,
  Recommand: Array<RecommandType>
}

// 초기값 설정
const initialState: stateType = {
  pending: false,
  error: false,
  Weather: {} as WeatherType,
  Recommand: []
}

export const getWeather = (dx: number, dy: number) => async (dispatch: Dispatch) => {
  dispatch({type: GET_WEATHER_PENDING})

  const res = await axios.get(requests.weather + String(dx) +'/' + String(dy))
  dispatch({type: GET_WEATHER_SUCCESS, payload: res.data})
}

export default handleActions({
  [GET_WEATHER_PENDING]: (state, {payload}) => {
    return {
      ...state,
      pending: true,
      error: false,
    }
  },
  [GET_WEATHER_SUCCESS]: (state, {payload}) => {
    const Recommand = payload as unknown as WeatherRecommand
    const Today = Recommand.weather
    const RecommandCody =[Recommand.one, Recommand.two, Recommand.three]
    return {
      pending: true,
      error: false,
      Weather: Today,
      Recommand: RecommandCody
    }
  }
}, initialState)
