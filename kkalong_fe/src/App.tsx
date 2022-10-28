
import React from 'react';
import './App.css';
import './styles/common.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import FooterBar from './components/ui/FooterBar';
import Login from './pages/Login/Login'
import MainCloset from "./pages/Closet/MainCloset";
import MainCommunity from "./pages/Community/MainCommunity";
import MainBestDress from "./pages/Community/MainBestDress";
import DetailBestDress from "./pages/Community/DetailBestDress";
import AddBestDress from './pages/Community/AddBestDress';
import MainHelpCodi from "./pages/Community/MainHelpCodi";
import DetailHelpCodi from "./pages/Community/DetailHelpCodi";
import AddSelectHelpCodi from './pages/Community/AddSelectHelpCodi';
import AddHelpCodi from './pages/Community/AddHelpCodi';


function App() {
  return (
    <div className="App">
      <Router>                       
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/community' element={<MainCommunity/>}></Route>
          <Route path='/community/BestDress' element={<MainBestDress/>}></Route>
          <Route path='/community/BestDress/Add' element={<AddBestDress/>}></Route>
          <Route path='/community/BestDress/:BestDressId' element={<DetailBestDress/>}></Route>
          <Route path='/community/HelpCodi' element={<MainHelpCodi/>}></Route>
          <Route path='/community/HelpCodi/Add' element={<AddSelectHelpCodi/>}></Route>
          <Route path='/community/HelpCodi/Add/:Category' element={<AddHelpCodi/>}></Route>
          <Route path='/community/HelpCodi/:HelpCodiId' element={<DetailHelpCodi/>}></Route>
          <Route path="/closet" element={<MainCloset />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
