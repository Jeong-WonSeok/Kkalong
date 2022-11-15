import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import { HelpCodiArticle } from "../../pages/Community/MainCommunity";
import axios from "../../api/axios";
import requests from "../../api/requests";

const GET_HELP_PENDING = 'Community/GET_HELP_PENDING' 
const GET_HELP_SUCCESS = 'Community/GET_HELP_SUCCESS' 
const GET_HELP_FAILURE = 'Community/GET_HELP_FAILURE' 
const DELETE_HELP_PENDING = 'Community/DELETE_HELP_PENDING' 
const DELETE_HELP_SUCCESS = 'Community/DELETE_HELP_SUCCESS' 
const DELETE_HELP_FAILURE = 'Community/DELETE_HELP_FAILURE' 

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
  dispatch({type: GET_HELP_PENDING})

  // 아직 페이지네이션 처리가 따로 되어있지 않음
  const res = await axios.get(requests.helpCodi)
  dispatch({type: GET_HELP_SUCCESS, payload: res.data})
}

// export const deleteCodi = () => async (dispatch: Dispatch) => {
//   dispatch({type: DELETE_HELP_PENDING})

//   // 아직 페이지네이션 처리가 따로 되어있지 않음
//   const res = await axios.get(requests.helpCodi)
//   dispatch({type: DELETE_HELP_SUCCESS, payload: res.data})
// }

// 액션에 따른 state 변경 
export default handleActions({
  [GET_HELP_PENDING]: (state, action) => {
    // 반환해줄 데이터
    return {
      pending: true,
      error: false,
      HelpCody: [],
    }
  },
  [GET_HELP_SUCCESS]: (state, {payload}) => {
    const adjust: Array<HelpCodiArticle> = payload as unknown as Array<HelpCodiArticle>
    console.log('패알못 게시글', adjust)
    return {
      ...state,
      pending: false,
      HelpCody: state.HelpCody.concat(adjust)
    };
  },
  [GET_HELP_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  },
  // [DELETE_HELP_PENDING]: (state, action) => {
  //   // 반환해줄 데이터
  //   return {
  //     pending: true,
  //     error: false,
  //     HelpCody: [],
  //   }
  // },
  // [DELETE_HELP_SUCCESS]: (state, {payload}) => {
  //   const adjust: Array<HelpCodiArticle> = payload as unknown as Array<HelpCodiArticle>
  //   console.log('패알못 게시글', adjust)
  //   return {
  //     ...state,
  //     pending: false,
  //     HelpCody: state.HelpCody.concat(adjust)
  //   };
  // },
  // [DELETE_HELP_FAILURE]: (state, action) => {
  //   return {
  //     ...state,
  //     pending: false,
  //     error: true
  //   };
  // }
}, initialState)
