import { createSlice } from '@reduxjs/toolkit';

const registerReducer = createSlice({
  name: 'registerReducer',
  initialState: {
    dupEmail: false,
    dupNickname: false,
    email: '',
    nickname: '',
    password: '',
    musicGenre: '',
    musicTaste: '',
    provider: '',
  },
  reducers: {
    setDupEmail(state, { payload: dupEmail }) {
      return { ...state, dupEmail: dupEmail };
    },
    setDupNickname(state, { payload: dupNickname }) {
      return { ...state, dupNickname: dupNickname };
    },
    setEmail(state, { payload: email }) {
      return { ...state, email: email };
    },
    setNickname(state, { payload: nickname }) {
      return { ...state, nickname: nickname };
    },
    setPassword(state, { payload: password }) {
      return { ...state, password: password };
    },
    setMusicGenre(state, { payload: musicGenre }) {
      return { ...state, musicGenre: musicGenre };
    },
    setMusicTaste(state, { payload: musicTaste }) {
      return { ...state, musicTaste: musicTaste };
    },
    setProvider(state, { payload: provider }) {
      return { ...state, provider: provider };
    },
  },
});

export const {
  setDupEmail,
  setDupNickname,
  setEmail,
  setNickname,
  setPassword,
  setMusicGenre,
  setMusicTaste,
  setProvider,
} = registerReducer.actions;
export default registerReducer.reducer;
