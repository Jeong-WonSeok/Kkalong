
import React from 'react';
import './App.css';
import './styles/common.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import FooterBar from './components/ui/FooterBar';
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import SignupNext from './pages/Signup/SignupNext'
import MainCloset from "./pages/Closet/MainCloset";
import MainCommunity from "./pages/Community/MainCommunity";
import MainBestDress from "./pages/Community/MainBestDress";
import DetailBestDress from "./pages/Community/DetailBestDress";
import AddBestDress from './pages/Community/AddBestDress';
import MyPage from './pages/MyPage/MyPage'

function App() {
  return (
    <div className="App">
      <Router>                       
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signupNext" element={<SignupNext/>}></Route>
          <Route path='/community' element={<MainCommunity/>}></Route>
          <Route path='/community/BestDress' element={<MainBestDress/>}></Route>
          <Route path='/community/BestDress/Add' element={<AddBestDress/>}></Route>
          <Route path='/community/BestDress/:BestDressId' element={<DetailBestDress/>}></Route>
          <Route path="/closet" element={<MainCloset />}></Route>
          <Route path="/myPage" element={<MyPage/>}></Route>
        </Routes>
        <FooterBar/>
      </Router>
    </div>
  );
}

export default App;
