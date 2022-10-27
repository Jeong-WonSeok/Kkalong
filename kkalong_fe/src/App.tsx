import React from "react";
import "./App.css";
import "./styles/common.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MainCloset from "./pages/Closet/MainCloset";
import MainCommunity from "./pages/Community/MainCommunity";
import MainBestDress from "./pages/Community/MainBestDress";
import DetailBestDress from "./pages/Community/DetailBestDress";
import AddBestDress from './pages/Community/AddBestDress';
import MainHelpCodi from "./pages/Community/MainHelpCodi";
import DetailHelpCodi from "./pages/Community/DetailHelpCodi";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/community' element={<MainCommunity/>}></Route>
          <Route path='/community/BestDress' element={<MainBestDress/>}></Route>
          <Route path='/community/BestDress/Add' element={<AddBestDress/>}></Route>
          <Route path='/community/BestDress/:BestDressId' element={<DetailBestDress/>}></Route>
          <Route path='/community/HelpCodi' element={<MainHelpCodi/>}></Route>
          <Route path='/community/HelpCodi/:HelpCodiId' element={<DetailHelpCodi/>}></Route>
          <Route path="/closet" element={<MainCloset />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
