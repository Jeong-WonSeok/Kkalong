import React from "react";
import "./App.css";
import "./styles/common.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import FooterBar from "./components/ui/FooterBar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SignupNext from "./pages/Signup/SignupNext";
import MainCloset from "./pages/Closet/MainCloset";
import MainCommunity from "./pages/Community/MainCommunity";
import MainBestDress from "./pages/Community/MainBestDress";
import DetailBestDress from "./pages/Community/DetailBestDress";
import AddCloset from "./pages/Closet/AddCloset";
import CodiPage from "./pages/Closet/CodiPage";
import PlusCodi from "./pages/Closet/PlusCodi";
import WeatherPage from "./pages/Closet/WeatherPage";
import DailyRecommend from "./pages/Closet/DailyRecommend";
import AddBestDress from "./pages/Community/AddBestDress";
import MyPage from "./pages/MyPage/MyPage";
import MyPageFriend from "./pages/MyPage/MyPageFriend";
import MyPageUpdate from "./pages/MyPage/MyPageUpdate";
import MyPageArticle from "./pages/MyPage/MyPageArticle";
import MainHelpCodi from "./pages/Community/MainHelpCodi";
import DetailHelpCodi from "./pages/Community/DetailHelpCodi";
import AddSelectHelpCodi from "./pages/Community/AddSelectHelpCodi";
import AddHelpCodi from "./pages/Community/AddHelpCodi";
import VirtualBrandChoice from "./pages/VirturalFitting/VirtualBrandChoice";
import VirtualBrand from "./pages/VirturalFitting/VirtualBrand";
import VirtualBrandProduct from "./pages/VirturalFitting/VirtualBrandProduct";
import CodiEdit from "./components/closet/CodiEdit";
import ClosetAsset from "./components/closet/ClosetAsset";
import ThreeTest from "./pages/Closet/ThreeTest";
// import Example from "./components/closet/Example";
// import Scene from "../public/Scene";
function App() {
  return (
    <div className="container">
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signupNext" element={<SignupNext />}></Route>
            <Route path="/community" element={<MainCommunity />}></Route>
            <Route
              path="/community/BestDress"
              element={<MainBestDress />}
            ></Route>
            <Route
              path="/community/BestDress/Add/"
              element={<AddBestDress />}
            ></Route>
            <Route
              path="/community/BestDress/Add/:Id"
              element={<AddBestDress />}
            ></Route>
            <Route
              path="/community/BestDress/:BestDressId"
              element={<DetailBestDress />}
            ></Route>
            <Route
              path="/community/HelpCodi"
              element={<MainHelpCodi />}
            ></Route>
            <Route
              path="/community/HelpCodi/Add"
              element={<AddSelectHelpCodi />}
            ></Route>
            <Route
              path="/community/HelpCodi/Add/:Category/:Id"
              element={<AddHelpCodi />}
            ></Route>
            <Route
              path="/community/HelpCodi/:HelpCodiId"
              element={<DetailHelpCodi />}
            ></Route>
            <Route path="/closet" element={<MainCloset />}></Route>
            <Route path="/myPage" element={<MyPage />}></Route>
            <Route path="/myPage/Friend/" element={<MyPageFriend />}></Route>
            <Route path="/myPage/Update/" element={<MyPageUpdate />}></Route>
            <Route path="/myPage/Article/" element={<MyPageArticle />}></Route>
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
            <Route path="/addcloset" element={<AddCloset />}></Route>
            <Route path="/codi" element={<CodiPage />}></Route>
            <Route path="/pluscodi" element={<PlusCodi />}></Route>
            <Route path="/weather" element={<WeatherPage />}></Route>
            <Route path="/daily" element={<DailyRecommend />}></Route>
            <Route path="/codiedit" element={<CodiEdit />}></Route>
            <Route path="/closetasset" element={<ClosetAsset />}></Route>
            <Route path="/threetest" element={<ThreeTest />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
