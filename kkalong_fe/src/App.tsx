import React from 'react';
import './App.css';
import './styles/common.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import MainCommunity from './pages/Community/MainCommunity';
import MainBestDress from './pages/Community/MainBestDress';
import DetailBestDress from './pages/Community/DetailBestDress';

function App() {
  return (
    <AppDiv>
      <Router>
        <Routes>
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
const AppDiv = styled.div`
  font-family: var(--base-font-300);
`;