import axios from "axios";

const token = JSON.parse(localStorage?.getItem('token') as string)
const instance = axios.create({
  // 배포용
  baseURL: "http://k7b302.p.ssafy.io/api/v1",
  // baseURL: "http://localhost:8080/",
  headers: {
    Authorization: `Bearer ${token}`
  },
});

export default instance;
