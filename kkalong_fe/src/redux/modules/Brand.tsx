import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import axios from "../../api/axios";
import requests from '../../api/requests'

const GET_BRAND_PENDING = 'Brand/GET_BRAND_PENDING' 
const GET_BRAND_SUCCESS = 'Brand/GET_BRAND_SUCCESS' 

type BrandType = {
  img: string,
  name: string
}

export interface stateType {
  pending: boolean,
  error: boolean,
  Brands: Array<BrandType>
}

// 초기값 설정
const initialState: stateType = {
  pending: false,
  error: false,
  Brands: []
}

export const getBrand = () => async (dispatch: Dispatch) => {
  dispatch({type: GET_BRAND_PENDING})

  const res = await axios.get(requests.brand)
  dispatch({type: GET_BRAND_SUCCESS, payload: res.data.brand_id})
}

export default handleActions({
  [GET_BRAND_PENDING]: (state, {payload}) => {
    return {
      ...state,
      pending: true,
      error: false,
    }
  },
  [GET_BRAND_SUCCESS]: (state, {payload}) => {
    const adjust = payload as unknown as Array<BrandType>
    return {
      pending: true,
      error: false,
      Brands: adjust
    }
  }
}, initialState)
