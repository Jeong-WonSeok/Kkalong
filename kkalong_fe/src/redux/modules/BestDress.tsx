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
  console.log(res.data)

  const Best3: Array<BestDresserArticle> = [
    {
      post_id: 1,
      post_img: 'http://m.ippeumi.com/web/product/big/Vdaily20210410_25EA_j024.jpg',
      post_user: {
        nickname: 'loki535',
        profile: ''
      },
      post_like: 13
    },
    {
      post_id: 2,
      post_img: 'https://i.pinimg.com/474x/e3/0a/73/e30a73291a0f8c2403c95472157d4b7e.jpg',
      post_user: {
        nickname: 'hans',
        profile: ''
      },
      post_like: 10
    },
    {
      post_id: 3,
      post_img: 'https://www.ultrafashion.net/shopimages/girlsje/031001001172.jpg?1646365806',
      post_user: {
        nickname: 'jane13',
        profile: ''
      },
      post_like: 5
    },
  ]

  dispatch({type: GET_BEST_SUCCESS, payload: Best3})
}

export const getBestDress = () => async (dispatch: Dispatch) => {
  dispatch({type: GET_DATA_PENDING})

  // 
  const res = await axios.get(requests.bestDress)
  console.log(res.data)

  const BestDress: Array<BestDresserArticle> = [
    {
      post_id: 1,
      post_img: 'http://m.ippeumi.com/web/product/big/Vdaily20210410_25EA_j024.jpg',
      post_user: {
        nickname: 'loki535',
        profile: ''
      },
      post_like: 13
    },
    {
      post_id: 2,
      post_img: 'https://i.pinimg.com/474x/e3/0a/73/e30a73291a0f8c2403c95472157d4b7e.jpg',
      post_user: {
        nickname: 'hans',
        profile: ''
      },
      post_like: 10
    },
    {
      post_id: 3,
      post_img: 'https://www.ultrafashion.net/shopimages/girlsje/031001001172.jpg?1646365806',
      post_user: {
        nickname: 'jane13',
        profile: ''
      },
      post_like: 5
    },
    {
      post_id: 4,
      post_img: 'https://sitem.ssgcdn.com/21/01/16/item/1000049160121_i1_1200.jpg',
      post_user: {
        nickname: 'likeme',
        profile: ''
      },
      post_like: 2
    },
  ]

  dispatch({type: GET_DATA_SUCCESS, payload: BestDress})
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
      BestDress: empty,
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
      Best3: empty,
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
