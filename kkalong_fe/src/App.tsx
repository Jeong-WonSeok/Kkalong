import React, { useEffect } from "react";
import "./App.css";
import "./styles/common.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getWeather } from "./redux/modules/Recommend";
import styled from "styled-components";
import FooterBar from "./components/ui/FooterBar";
// Login
import StartPage from "./pages/StartPage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

// Closet
import MainCloset from "./pages/Closet/MainCloset";
import AddCloset from "./pages/Closet/AddCloset";
import CodiPage from "./pages/Closet/CodiPage";
import PlusCodi from "./pages/Closet/PlusCodi";
import PlusCodi2 from "./pages/Closet/PlusCodi2";
import AddClothes from "./pages/Closet/AddClothes";
import CodiEdit from "./components/closet/CodiEdit";
import ClosetAsset from "./components/closet/ClosetAsset";
import { OauthRedirect } from "./pages/Signup/OauthRedirect";
import ClothesDetail from "./pages/Closet/ClothesDetail";
import ThreeTest from "./pages/Closet/ThreeTest";

// Community
import MainCommunity from "./pages/Community/MainCommunity";
import MainBestDress from "./pages/Community/MainBestDress";
import DetailBestDress from "./pages/Community/DetailBestDress";
import AddBestDress from "./pages/Community/AddBestDress";
import MainHelpCodi from "./pages/Community/MainHelpCodi";
import DetailHelpCodi from "./pages/Community/DetailHelpCodi";
import AddSelectHelpCodi from "./pages/Community/AddSelectHelpCodi";
import AddHelpCodi from "./pages/Community/AddHelpCodi";
// Recommand
import WeatherPage from "./pages/Recommend/WeatherPage";
import DailyRecommend from "./pages/Recommend/DailyRecommend";
// AIFitting
import VirtualPicture from "./pages/VirturalFitting/VirtualPicture";
import VirtualBrandChoice from "./pages/VirturalFitting/VirtualBrandChoice";
import VirtualBrand from "./pages/VirturalFitting/VirtualBrand";
import VirtualBrandProduct from "./pages/VirturalFitting/VirtualBrandProduct";
// MyPage
import MyPage from "./pages/MyPage/MyPage";
import MyPageFriend from "./pages/MyPage/MyPageFriend";
import MyPageUpdate from "./pages/MyPage/MyPageUpdate";
import MyPageArticle from "./pages/MyPage/MyPageArticle";
import PersonalInfo from "./pages/PersonalInfo";
import MyFollow from "./pages/MyPage/MyFollow";
import PersonalColor from "./pages/Recommend/PersonalColor";
import PersonalColorRecommend from "./pages/Recommend/PersonalColorRecommend";
import { useAppDispatch } from "./hooks/reduxHook";
import dfs_xy_conv from "./hooks/chagneLatLon";

type LocationType = {
  lat: number,
  lon: number,
  x: number,
  y: number
}


function App() {
  const dispatch = useAppDispatch()
  let location: LocationType = {
    lat: 0,
    lon: 0,
    x: 0,
    y: 0
  }
  // 사용자의 화면에 맞춰서 크기조절
  useEffect(() => {
    const windowHeight = window.innerHeight;
    const app = document.getElementById("App") as HTMLDivElement;
    app.style.minHeight = `${windowHeight - 130}px`;

    const start = async() => {
      await getLocation()
      await dispatch(getWeather(location.x, location.y)) 
    }
  start()
  }, []);

  const getLocation = async () => {
    if (navigator.geolocation) { // GPS를 지원하면
      // 이것으로 현재 위치를 가져온다.
      var getPosition = function () {
        return new Promise(function (reslove, reject) {
          navigator.geolocation.getCurrentPosition(reslove, reject)
        })
      }
      
      // 위치 변환
      return await getPosition()
        .then(async (position: any) => {
          const result  = new Promise((reslove, reject) => {
            reslove(dfs_xy_conv('toXY', position.coords.latitude , position.coords.longitude))
          })
          
          await result.then((res: any) => {
            location = res
            return res
          })
        })
        .catch((error) => {
          console.error(error.message)
        });
    } else {
      alert('GPS 정보를 불러드리지 못했습니다.\n 새로고침을 해주세요');
    }
  }
  
  return (
    <div id="container">
      <div id="App">
        <Router>
          <Routes>
            <Route path="/" element={<StartPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>

            {/* 출시를 위한 개인정보 처리방침 url */}
            <Route path="/PersonalInfo" element={<PersonalInfo />}></Route>
            {/* 커뮤니티 */}
            <Route path="/community" element={<MainCommunity />}></Route>
            <Route path="/community/BestDress" element={<MainBestDress />}></Route>
            <Route path="/community/BestDress/Add/" element={<AddBestDress />}></Route>
            <Route path="/community/BestDress/Add/:BestDressId" element={<AddBestDress />}></Route>
            <Route path="/community/BestDress/:IsAdd/:BestDressId" element={<DetailBestDress />}></Route>
            <Route path="/community/HelpCodi" element={<MainHelpCodi />}></Route>
            <Route path="/community/HelpCodi/Add" element={<AddSelectHelpCodi />}></Route>
            <Route path="/community/HelpCodi/Add/:Category/" element={<AddHelpCodi />}></Route>
            <Route path="/community/HelpCodi/Add/:Category/:HelpCodiId" element={<AddHelpCodi />}></Route>
            <Route path="/community/HelpCodi/:IsAdd/:HelpCodiId" element={<DetailHelpCodi />}></Route>
            {/* 옷장 */}
            <Route path="/closet" element={<MainCloset />}></Route>
            <Route path="/closet/Add" element={<AddClothes />}></Route>
            <Route path="/closet/:userId" element={<MainCloset />}></Route>
            <Route path="/closet/:HelpCodiId/:userId" element={<MainCloset />}></Route>
            <Route path="/closet/:userId/pluscodi" element={<PlusCodi />}></Route>
            <Route path="/closet/:HelpCodiId/:userId/pluscodi" element={<PlusCodi />}></Route>
            <Route path="/addcloset" element={<AddCloset />}></Route>
            <Route path="/codi" element={<CodiPage />}></Route>
            <Route path="/pluscodi" element={<PlusCodi />}></Route>
            <Route path="/pluscodi2" element={<PlusCodi2 />}></Route>
            <Route path="/pluscodi/:Category" element={<PlusCodi />}></Route>
            <Route path="/codiedit" element={<CodiEdit />}></Route>
            <Route path="/closetasset" element={<ClosetAsset />}></Route>
            <Route path="/threetest" element={<ThreeTest />}></Route>
            <Route path="/oauth2/redirect" element={<OauthRedirect />} />
            <Route path="/recommend/weather" element={<WeatherPage />}></Route>
            <Route path="/recommend/personal" element={<PersonalColor />}></Route>
            <Route path="/recommend/personal/Color" element={<PersonalColorRecommend />}></Route>
            <Route path="/recommend/daily" element={<DailyRecommend />}></Route>
            <Route path="/clothes/detail" element={<ClothesDetail />}></Route>
            {/* 마이페이지 */}
            <Route path="/myPage" element={<MyPage />}></Route>
            <Route path="/myPage/Friend/" element={<MyPageFriend />}></Route>
            <Route path="/myPage/Update/" element={<MyPageUpdate />}></Route>
            <Route path="/myPage/Article/" element={<MyPageArticle />}></Route>
            <Route path="/myPage/Follow" element={<MyFollow />}></Route>
            <Route path="/myPage/Following" element={<MyFollow />}></Route>
            <Route path="/myPage/:userId" element={<MyPage />}></Route>
            <Route path="/myPage/:userId/Follow" element={<MyFollow />}></Route>
            <Route
              path="/myPage/:userId/Following"
              element={<MyFollow />}
            ></Route>
            <Route
              path="/myPage/:userId/Article/"
              element={<MyPageArticle />}
            ></Route>
            {/* 가상피팅 */}
            <Route path="/VirtualFitting/" element={<VirtualPicture />}></Route>
            <Route
              path="/VirtualFitting/VirtualBrandChoice/"
              element={<VirtualBrandChoice />}
            ></Route>
            <Route
              path="/VirtualFitting/VirtualBrandChoice/:brand_id"
              element={<VirtualBrand />}
            ></Route>
            <Route
              path="/VirtualFitting/VirtualBrandChoice/:brand_id/:clothes_id"
              element={<VirtualBrandProduct />}
            ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
