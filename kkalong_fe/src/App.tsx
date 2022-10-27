import React from "react";
import "./App.css";
import "./styles/common.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MainCloset from "./pages/Closet/MainCloset";
import MainCommunity from "./pages/Community/MainCommunity";
import MainBestDress from "./pages/Community/MainBestDress";
import DetailBestDress from "./pages/Community/DetailBestDress";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/closet" element={<MainCloset />}></Route>

          <Route path="/community" element={<MainCommunity />}></Route>
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
