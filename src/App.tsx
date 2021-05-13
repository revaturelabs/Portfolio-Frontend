import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
