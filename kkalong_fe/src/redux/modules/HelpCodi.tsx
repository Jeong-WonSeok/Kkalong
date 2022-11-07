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
  const HelpCodi = res.data

  // const HelpCodi: Array<HelpCodiArticle> = [
  //   {
  //     help_id: 1,
  //     help_img: 'https://i3.codibook.net/files/1978121543118/a553319d9394abde/70936325.jpg?class=big',
  //     user_id: {
  //       nickname: 'infp2',
  //       profile: ''
  //     },
  //     help_title: '20대 남자인데 데이트 코디 어떤가요?'
  //   },
  //   {
  //     help_id: 2,
  //     help_img: 'https://i.pinimg.com/474x/85/06/4d/85064decf478772d1659c1aec4afd4b5.jpg',
  //     user_id: {
  //       nickname: 'poni',
  //       profile: ''
  //     },
  //     help_title: '새내기 코디 어때요?'
  //   },
  //   {
  //     help_id: 3,
  //     help_img: 'https://i.pinimg.com/originals/94/8a/22/948a22cfbdd4554d964e7c4b84cc9a50.jpg',
  //     user_id: {
  //       nickname: 'Rabbit13',
  //       profile: ''
  //     },
  //     help_title: '친구랑 홍대갈 예정인데 이 정도면 평타?'
  //   },
  //   {
  //     help_id: 4,
  //     help_img: 'https://i.pinimg.com/originals/4a/22/8b/4a228b0859fc11f0c28525d7cd0c059a.jpg',
  //     user_id: {
  //       nickname: 'loki535',
  //       profile: ''
  //     },
  //     help_title: '겨울 데이트룩 괜찮은가요?'
  //   },
  // ]
  

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
