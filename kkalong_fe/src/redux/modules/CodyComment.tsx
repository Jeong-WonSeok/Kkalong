import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import axios from "../../api/axios";
import requests from '../../api/requests'
import dataURLtoFile from '../../hooks/Base64ToFile'

const GET_CODY_PENDING = 'Comment/GET_CODY_PENDING' 
const GET_CODY_SUCCESS = 'Comment/GET_CODY_SUCCESS' 
const CODY_DELETE = 'Comment/CODY_DELETE' 

const ADD_CODY = 'Cody/ADD_CODY'

type CodyType = {
  cody_id: number,
  cody_img: string
}

export interface stateType {
  pending: boolean,
  error: boolean,
  cody: CodyType,
  CodyImg: string
}

// 초기값 설정
const initialState: stateType = {
  pending: false,
  error: false,
  cody: {} as CodyType,
  CodyImg: '' 
}

export const MakeCody = (data: any) => async (dispatch: Dispatch) => {
  dispatch({type: GET_CODY_SUCCESS, payload: data.cody_id})
}

export const DeleteCody = () => async (dispatch: Dispatch) => {
  dispatch({type: CODY_DELETE})
}

export const AddCody = (data: string) => async (dispatch: Dispatch) => {
  const file = await dataURLtoFile(data, 'wow')
  const formdata = new FormData()
  formdata.append('cody_img', file)
  const res = await axios.post(requests.imgAdd, formdata, {headers: {'Context-type': 'multipart/form-data'}})

  dispatch({type: ADD_CODY, payload: res.data.img}) 
}

export const CodyReset = () => async (dispatch:Dispatch) => {
  dispatch({type: CODY_DELETE}) 
}

export default handleActions({
  [GET_CODY_PENDING]: (state, {payload}) => {
    return {
      ...state,
      pending: true,
      error: false,
      cody: {} as CodyType
    }
  },
  [GET_CODY_SUCCESS]: (state, {payload}) => {
    const adjust = payload as unknown as number
    return {
      ...state,
      pending: true,
      error: false,
      cody: {
        cody_id: adjust,
        cody_img: state.CodyImg
      }
    }
  },
  [CODY_DELETE]: (state) => {
    return {
      ...state,
      cody: {} as CodyType,
    }
  },
  [ADD_CODY]: (state, {payload}) => {
    return {
      ...state,
      CodyImg: payload as unknown as string
    }
  }
}, initialState)
