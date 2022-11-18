import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import { BestDresserArticle } from "../../pages/Community/MainCommunity";
import axios from "../../api/axios";
import requests from '../../api/requests'

// Best 초반 게시글 조회
const GET_DATA_PENDING = 'Community/GET_DATA_PENDING' 
const GET_DATA_SUCCESS = 'Community/GET_DATA_SUCCESS' 
const GET_DATA_FAILURE = 'Community/GET_DATA_FAILURE' 

// Best 3 게시글 조회 
const GET_BEST_PENDING = 'Community/GET_BEST_PENDING' 
const GET_BEST_SUCCESS = 'Community/GET_BEST_SUCCESS' 
const GET_BEST_FAILURE = 'Community/GET_BEST_FAILURE' 

export interface stateType {
  pending: boolean,
  error: boolean,
  BestDress: Array<BestDresserArticle>,
  Best3: Array<BestDresserArticle>,
}

// 초기값 설정
const initialState: stateType = {
  pending: false,
  error: false,
  BestDress: [],
  Best3: []
}

// 상위 3개 게시물 표시
export const getBest3 = () => async (dispatch: Dispatch) => {
  dispatch({type: GET_BEST_PENDING})

  
  const res = await axios.get(requests.best3)
  dispatch({type: GET_BEST_SUCCESS, payload: res.data})
}

export const getBestDress = () => async (dispatch: Dispatch) => {
  dispatch({type: GET_DATA_PENDING})

  const res = await axios.get(requests.bestDress)
  dispatch({type: GET_DATA_SUCCESS, payload: res.data})
}

// 액션에 따른 state 변경 
export default handleActions({
  [GET_DATA_PENDING]: (state, action) => {
    const empty: Array<BestDresserArticle> = []
    // 반환해줄 데이터
    return {
      ...state,
      pending: true,
      error: false,
      BestDress: [],
    }
  },
  [GET_DATA_SUCCESS]: (state, {payload}) => {
    const adjust: Array<BestDresserArticle> = payload as unknown as Array<BestDresserArticle>
    return {
      ...state,
      pending: false,
      BestDress: state.BestDress.concat(adjust)
    };
  },
  [GET_DATA_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  },
  [GET_BEST_PENDING]: (state, action) => {
    const empty: Array<BestDresserArticle> = []
    // 반환해줄 데이터
    return {
      ...state,
      pending: true,
      error: false,
      Best3: [],
    }
  },
  [GET_BEST_SUCCESS]: (state, {payload}) => {
    const adjust: Array<BestDresserArticle> = payload as unknown as Array<BestDresserArticle>
    return {
      ...state,
      pending: false,
      Best3: state.Best3.concat(adjust)
    };
  },
  [GET_BEST_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  }
}, initialState)
