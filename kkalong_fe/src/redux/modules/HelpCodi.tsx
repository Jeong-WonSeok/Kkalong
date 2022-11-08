import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import { HelpCodiArticle } from "../../pages/Community/MainCommunity";
import axios from "../../api/axios";
import requests from "../../api/requests";

const GET_DATA_PENDING = 'Community/GET_DATA_PENDING' 
const GET_DATA_SUCCESS = 'Community/GET_DATA_SUCCESS' 
const GET_DATA_FAILURE = 'Community/GET_DATA_FAILURE' 

interface stateType {
  pending: boolean,
  error: boolean,
  HelpCody: Array<HelpCodiArticle>
}

// 초기값 설정
const initialState: stateType = {
  pending: false,
  error: false,
  HelpCody: [],
}

export const getHelpCodi = () => async (dispatch: Dispatch) => {
  dispatch({type: GET_DATA_PENDING})

  // 아직 페이지네이션 처리가 따로 되어있지 않음
  const res = await axios.get(requests.helpCodi)
  const HelpCodi = res.data[0].Help

  dispatch({type: GET_DATA_SUCCESS, payload: HelpCodi})
}

// 액션에 따른 state 변경 
export default handleActions({
  [GET_DATA_PENDING]: (state, action) => {
    // 반환해줄 데이터
    return {
      pending: true,
      error: false,
      HelpCody: [],
    }
  },
  [GET_DATA_SUCCESS]: (state, {payload}) => {
    const adjust: Array<HelpCodiArticle> = payload as unknown as Array<HelpCodiArticle>
    return {
      ...state,
      pending: false,
      HelpCody: state.HelpCody.concat(adjust)
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
