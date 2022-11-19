import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import BestDress, {stateType} from "./modules/BestDress";
import HelpCodi from './modules/HelpCodi'
import User from './modules/User'
import Brand from './modules/Brand'
import CodyComment from './modules/CodyComment'
import Weather from './modules/Weather'

// 타입 오류를 위해서 state의 타입을 가져온다.
export interface rootState {
  BestDress: stateType;
}

// redux 스토어 등록
const rootReducer = combineReducers({
    BestDress,
    HelpCodi,
    User,
    Brand,
    CodyComment,
    Weather
})

const persistConfig = {
  key: 'root',
  storage,
};

// 리덕스에서 관리하는 상태에 대한 타입
export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
})

// usedispatch 사용시 에러 발생을 잡아주기 위한 타입 설정
export default store;
export type AppDispatch = typeof store.dispatch;