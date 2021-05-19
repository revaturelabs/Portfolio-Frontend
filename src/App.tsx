import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <CookiesProvider>
          <Layout />
        </CookiesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
