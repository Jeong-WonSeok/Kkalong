import React from 'react';
import './App.css';
import './styles/common.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components'

function App() {
  return (
    <div className="App">
      <TestBlock>var 화면</TestBlock>
      <Router>
        <Routes>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

// 사용 방법
const TestBlock = styled.article`
  background: var(--primary-color-500);
  font-family: var(--base-font-300);
`;