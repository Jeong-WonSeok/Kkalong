import axios from 'axios';

const instance = axios.create({
  // 배포용
  // baseURL: "https://j7b102.p.ssafy.io/",
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')!
  },  
});

export default instance;