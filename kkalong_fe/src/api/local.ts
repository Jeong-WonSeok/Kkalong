import { authAxios } from "../common";
import { SET_TOKEN } from "../redux/modules/Auth";

// 로그인 작업
export const local = (
  email: string,
  password: string,
  dispatch: any,
  navigate: any
) => {
  console.log(email, password);
  authAxios
    .post("/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.data.code == 200) {
        localStorage.setItem("accessToken", res.data.result);
        // console.log('parse', parseJwt(res.data.result));
        dispatch(SET_TOKEN(res.data.result));
        // eslint-disable-next-line no-restricted-globals
        // navigate('/');
        window.location.href = "/";
      } else {
        alert("로그인 실패");
      }
    })
    .catch((err) => {
      alert("로그인 실패");
    });
};

// jwt 디코딩하는 함수
export const parseJwt = (token: any) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
