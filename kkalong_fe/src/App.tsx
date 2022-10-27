
import React from "react";
import "./App.css";
import "./styles/common.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MainCloset from "./pages/Closet/MainCloset";
import MainCommunity from './pages/Community/MainCommunity';
import MainBestDress from './pages/Community/MainBestDress';
import DetailBestDress from './pages/Community/DetailBestDress';


function App() {
  return (
    <AppDiv>
      <Router>
        <Routes>

          <Route path="/closet" element={<MainCloset />}></Route>

          <Route path='/community' element={<MainCommunity/>}></Route>
          <Route path='/community/BestDress' element={<MainBestDress/>}></Route>
          <Route path='/community/BestDress/:BestDressId' element={<DetailBestDress/>}></Route>
        </Routes>
      </Router>
    </AppDiv>
  );
}

export default App;

// 사용 방법
// Nav, Footer 크기만큼 margin 지정
const AppDiv = styled.div`
  font-family: var(--base-font-300);
  margin-top: 60px;
  margin-bottom: 70px;
`;

