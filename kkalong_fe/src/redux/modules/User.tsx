import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import axios from "../../api/axios";
import requests from '../../api/requests'
import { UserType } from "../../pages/MyPage/MyPage";

// User 정보 조회
const GET_LOGIN_PENDING = 'Community/GET_LOGIN_PENDING' 
const GET_LOGIN_SUCCESS = 'Community/GET_LOGIN_SUCCESS' 
const GET_LOGIN_FAILURE = 'Community/GET_LOGIN_FAILURE' 

export interface stateType {
  pending: boolean,
  error: boolean,
  User: UserType
}

// 초기값 설정
const initialState: stateType = {
  pending: false,
  error: false,
  User: {} as UserType
}

// 상위 3개 게시물 표시
export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  dispatch({type: GET_LOGIN_PENDING})

  const data = {
    email: email,
    password: password
  }
  await axios.post(requests.login, data)
    .then(res => {
      const token = res.data.result;
      localStorage.setItem("token", JSON.stringify(token.token));
      localStorage.setItem("userProfile", JSON.stringify(token.user));
      dispatch({type:GET_LOGIN_SUCCESS, payload: token.user})
    }).catch(err => {
      dispatch({type:GET_LOGIN_FAILURE})
    })
}

// 액션에 따른 state 변경 
export default handleActions({
  [GET_LOGIN_PENDING]: (state, action) => {
    // 반환해줄 데이터
    return {
      ...state,
      pending: true,
      error: false,
    }
  },
  [GET_LOGIN_SUCCESS]: (state, {payload}) => {
    const adjust: UserType = payload as unknown as UserType
    return {
      ...state,
      pending: false,
      User: adjust
    };
  },
  [GET_LOGIN_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  }
}, initialState)
