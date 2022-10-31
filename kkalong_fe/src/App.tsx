import React from "react";
import "./App.css";
import "./styles/common.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MainCloset from "./pages/Closet/MainCloset";
import MainCommunity from "./pages/Community/MainCommunity";
import MainBestDress from "./pages/Community/MainBestDress";
import DetailBestDress from "./pages/Community/DetailBestDress";
import AddCloset from "./pages/Closet/AddCloset";
import CodiPage from "./pages/Closet/CodiPage";
import PlusCodi from "./pages/Closet/PlusCodi";
import WeatherPage from "./pages/Closet/WeatherPage";
import DailyRecommend from "./pages/Closet/DailyRecommend";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/closet" element={<MainCloset />}></Route>
          <Route path="/addcloset" element={<AddCloset />}></Route>
          <Route path="/codi" element={<CodiPage />}></Route>
          <Route path="/pluscodi" element={<PlusCodi />}></Route>
          <Route path="/community" element={<MainCommunity />}></Route>
          <Route path="/weather" element={<WeatherPage />}></Route>
          <Route path="/daily" element={<DailyRecommend />}></Route>
          <Route
            path="/community/BestDress"
            element={<MainBestDress />}
          ></Route>
          <Route
            path="/community/BestDress/:BestDressId"
            element={<DetailBestDress />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
