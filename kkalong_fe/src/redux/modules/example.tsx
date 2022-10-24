import axios from "../../api/axios";
import requests from "../../api/requests";
import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';

// 액션 타입 지정/ 데이터 전송, 성공, 실패
const GET_DATA_PENDING = 'mainData/GET_DATA_PENDING';
const GET_DATA_SUCCESS = 'mainData/GET_DATA_SUCCESS';
const GET_DATA_FAILURE = 'mainData/GET_DATA_FAILURE';
const SEARCH_DATA_PENDING = 'mainData/SEARCH_DATA_PENDING';
const SEARCH_DATA_SUCCESS = 'mainData/SEARCH_DATA_SUCCESS';
const SEARCH_DATA_FAILURE = 'mainData/SEARCH_DATA_FAILURE';
const SEARCH_STOP = 'mainData/SEARCH_STOP';

// 액션 생성 함수
export const getData = (category: string, lat: number, lon: number) => async (dispatch: Dispatch) => {
  // 요청을 시작했다는 것을 알림
  dispatch({type: GET_DATA_PENDING, payload: category})

  // 요청을 시작한다.
//   return await getDataAPI(category, lat, lon).then(
//     res => {
//       // 요청을 성곻했을 때, 응답내용을 payload로 보낸다.
//       dispatch({
//         type: GET_DATA_SUCCESS,
//         payload: res,
//       })
//     }
//   ).catch(err => {
//     dispatch({
//       type: GET_DATA_FAILURE,
//       payload: err
//     });
//     // 이 함수가 실행 된 다음에 다시한번 catch 할 수 있도록 한다.
//     throw(err);
//   })
}

// 초기값 타입 설정
export interface initialStateType {
  pending: Boolean,
  error: Boolean,
  search: Boolean,
  category: string,
  data: Array<Object>,
  search_data: Array<Object>,
}

// 초기값 설정
const initialState:initialStateType = {
  pending: false,
  error: false,
  search: false,
  category: "",
  data: [],
  search_data: []
}

// 액션에 따른 state 변경 
export default handleActions({
  [GET_DATA_PENDING]: (state, action) => {
    // 반환해줄 데이터
    return {
      ...state,
      pending: true,
      error: false,
      data: [],
      category: String(action.payload)
    }
  },
  [GET_DATA_SUCCESS]: (state, action) => {
    return {
      ...state,
      pending: false,
      data: state.data.concat(action.payload)
    };
  },
  [GET_DATA_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  }
}, initialState)

