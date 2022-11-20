import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import axios from "../../api/axios";
import requests from '../../api/requests'

const GET_CODY_PENDING = 'Comment/GET_CODY_PENDING' 
const GET_CODY_SUCCESS = 'Comment/GET_CODY_SUCCESS' 
const CODY_DELETE = 'Comment/CODY_DELETE' 

type CodyType = {
  cody_id: number,
  cody_img: string
}

export interface stateType {
  pending: boolean,
  error: boolean,
  cody: CodyType
}

// 초기값 설정
const initialState: stateType = {
  pending: false,
  error: false,
  cody: {} as CodyType
}

export const MakeCody = () => async (dispatch: Dispatch) => {
  dispatch({type: GET_CODY_PENDING})

  const res = await axios.post(requests.codi)
  dispatch({type: GET_CODY_SUCCESS, payload: res.data.cody})
}

export const DeleteCody = () => async (dispatch: Dispatch) => {
  dispatch({type: CODY_DELETE})
}

export default handleActions({
  [GET_CODY_PENDING]: (state, {payload}) => {
    return {
      pending: true,
      error: false,
      cody: {} as CodyType
    }
  },
  [GET_CODY_SUCCESS]: (state, {payload}) => {
    const adjust = payload as unknown as CodyType
    return {
      pending: true,
      error: false,
      cody: adjust
    }
  },
  [CODY_DELETE]: (state) => {
    return {
      ...state,
      cody: {} as CodyType
    }
  }
}, initialState)
