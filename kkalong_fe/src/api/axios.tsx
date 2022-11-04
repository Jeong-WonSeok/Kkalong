import axios from "axios";

const instance = axios.create({
  // 배포용
  baseURL: "http://k7b302.p.ssafy.io/api/v1",
  // baseURL: "http://localhost:8080/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")!,
  },
});

export default instance;
