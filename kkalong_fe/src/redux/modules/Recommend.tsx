import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import axios from "../../api/axios";
import requests from '../../api/requests'

const GET_WEATHER_PENDING = 'Recommand/GET_WEATHER_PENDING' 
const GET_WEATHER_SUCCESS = 'Recommand/GET_WEATHER_SUCCESS' 

const GET_COLOR_PENDING = 'Recommand/GET_COLOR_PENDING' 
const GET_COLOR_SUCCESS = 'Recommand/GET_COLOR_SUCCESS' 

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
  top: Array<ClothType>,
  bottom: Array<ClothType>,
  outer: Array<ClothType>
  bag: Array<ClothType>,
  hat: Array<ClothType>,
  shoes: Array<ClothType>,
}

export interface RecommandType {
  formal: CodyType,
  casual: CodyType,
  dandy: CodyType,
  hiphop: CodyType
}

export interface ColorRecommandType {
  formal: Array<CodyType>,
  casual: Array<CodyType>,
  dandy: Array<CodyType>,
  hiphop: Array<CodyType>
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

export interface Color extends ColorRecommandType {
  personal: string
}

export interface stateType {
  pending: boolean,
  error: boolean,
  Weather: WeatherType,
  Recommand: Array<RecommandType>,
  ColorRecommand: ColorRecommandType,
  personalColor: string,
}

// 초기값 설정
const initialState: stateType = {
  pending: false,
  error: false,
  Weather: {} as WeatherType,
  Recommand: [] as Array<RecommandType>,
  ColorRecommand: {} as ColorRecommandType,
  personalColor: '',
}

export const getWeather = (dx: number, dy: number) => async (dispatch: Dispatch) => {
  dispatch({type: GET_WEATHER_PENDING})

  const res = await axios.get(requests.weather + String(dx) +'/' + String(dy))
  console.log(res.data)
  dispatch({type: GET_WEATHER_SUCCESS, payload: res.data})
}

export const getColor = () => async (dispatch: Dispatch) => {
  dispatch({type: GET_COLOR_PENDING})

  const res = await axios.get(requests.personalColor)
  dispatch({type: GET_COLOR_SUCCESS, payload: res.data})
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
      ...state,
      pending: true,
      error: false,
      Weather: Today,
      Recommand: RecommandCody
    }
  },
  [GET_COLOR_PENDING]: (state, {payload}) => {
    return {
      ...state,
      pending: true,
      error: false,
    }
  },
  [GET_COLOR_SUCCESS]: (state, {payload}) => {
    const Recommand = payload as unknown as Color
    const personalColor = Recommand.personal
    const RecommandCody = {
      dandy: Recommand.dandy, 
      casual: Recommand.casual, 
      formal: Recommand.formal, 
      hiphop: Recommand.hiphop} as ColorRecommandType
    return {
      ...state,
      pending: true,
      error: false,
      personalColor: personalColor,
      ColorRecommand: RecommandCody
    }
  },
}, initialState)
