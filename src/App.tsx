import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layont from './components/Layont';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layont />
      </BrowserRouter>
    </div>
  );
}

export default App;
