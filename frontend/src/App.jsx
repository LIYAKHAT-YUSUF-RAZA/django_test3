import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './react_test/Layout.jsx';
import HomePage from './react_test/HomePage.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
      <Route path='/' element={<HomePage />} />
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;