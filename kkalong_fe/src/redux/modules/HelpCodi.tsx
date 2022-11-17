import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import { HelpCodiArticle } from "../../pages/Community/MainCommunity";
import axios from "../../api/axios";
import requests from "../../api/requests";

const GET_HELP_PENDING = 'Community/GET_HELP_PENDING' 
const GET_HELP_SUCCESS = 'Community/GET_HELP_SUCCESS' 
const GET_HELP_FAILURE = 'Community/GET_HELP_FAILURE' 

interface stateType {
  pending: boolean,
  error: boolean,
  HelpCody: Array<HelpCodiArticle>,
  FriendHelp: Array<HelpCodiArticle>
}

// 초기값 설정
const initialState: stateType = {
  pending: false,
  error: false,
  HelpCody: [],
  FriendHelp: []
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
      FriendHelp: []
    }
  },
  [GET_HELP_SUCCESS]: (state, {payload}) => {
    const adjust: Array<HelpCodiArticle> = payload as unknown as Array<HelpCodiArticle>
    const Friend: Array<HelpCodiArticle> = []
    const User = JSON.parse(localStorage.getItem('userProfile') as string)

    adjust.filter(help => {
      if (help.Help.range === "친구" && (User.followings.includes(help.Help.user.user_id) || User.user_id === help.Help.user.user_id)){
        Friend.push(help)
        return false
      } else {
        return true
      }
    })
    // 상위 5개만 보여준다.
    if (Friend.length > 5) {Friend.slice(0, 4)}
    console.log(adjust, Friend)
    return {
      ...state,
      pending: false,
      HelpCody: adjust,
      FriendHelp: Friend
    };
  },
  [GET_HELP_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  },
}, initialState)
