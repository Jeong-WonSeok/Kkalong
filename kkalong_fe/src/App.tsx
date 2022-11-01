
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
import AddCloset from "./pages/Closet/AddCloset";
import CodiPage from "./pages/Closet/CodiPage";
import PlusCodi from "./pages/Closet/PlusCodi";
import WeatherPage from "./pages/Closet/WeatherPage";
import DailyRecommend from "./pages/Closet/DailyRecommend";
import AddBestDress from './pages/Community/AddBestDress';
import MyPage from './pages/MyPage/MyPage'
import MainHelpCodi from "./pages/Community/MainHelpCodi";
import DetailHelpCodi from "./pages/Community/DetailHelpCodi";
import AddSelectHelpCodi from './pages/Community/AddSelectHelpCodi';
import AddHelpCodi from './pages/Community/AddHelpCodi';
import StartPage from './pages/StartPage';
import AddClothes from './pages/Closet/AddClothes';


function App() {
  return (
    <div id='container'>
      <div id="App">
      <Router>                       
        <Routes>
          <Route path="/" element={<StartPage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signupNext" element={<SignupNext/>}></Route>
          <Route path='/community' element={<MainCommunity/>}></Route>
          <Route path='/community/BestDress' element={<MainBestDress/>}></Route>
          <Route path='/community/BestDress/Add/' element={<AddBestDress/>}></Route>
          <Route path='/community/BestDress/Add/:Id' element={<AddBestDress/>}></Route>
          <Route path='/community/BestDress/:BestDressId' element={<DetailBestDress/>}></Route>
          <Route path='/community/HelpCodi' element={<MainHelpCodi/>}></Route>
          <Route path='/community/HelpCodi/Add' element={<AddSelectHelpCodi/>}></Route>
          <Route path='/community/HelpCodi/Add/:Category/:Id' element={<AddHelpCodi/>}></Route>
          <Route path='/community/HelpCodi/:HelpCodiId' element={<DetailHelpCodi/>}></Route>
          <Route path="/closet" element={<MainCloset />}></Route>
          <Route path="/closet/Add" element={<AddClothes/>}></Route>
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
          <Route path="/myPage" element={<MyPage/>}></Route>
        </Routes>
      </Router>
    </div>
  </div>
    
  );
}

export default App;
