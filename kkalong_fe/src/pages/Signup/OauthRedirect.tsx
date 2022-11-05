import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { parseJwt } from "../../api/local";
import { SET_TOKEN } from "../../redux/modules/Auth";
import {
  setDupEmail,
  setEmail,
  setProvider,
} from "../../redux/modules/registerReducer";
import FadeLoader from "react-spinners/FadeLoader";
export const OauthRedirect = () => {
  let token: string = useLocation().search.split("=")[1];
  let role = parseJwt(token).roles[0].authority;
  let email = parseJwt(token).sub;
  console.log(parseJwt(token));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SET_TOKEN(token));

    if (role === "ROLE_USER") {
      // localStorage.removeItem('accessToken');
      localStorage.setItem("accessToken", token);
      window.location.href = "/";
    } else {
      navigate("/process", {
        state: token,
      });
    }

    dispatch(setEmail(email));
    dispatch(setDupEmail(true));
    // dispatch(setProvider())

    // navigate(navigate_url);
  });

  return (
    <div className="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader
          color="#C63DEE"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
    </div>
  );
};
