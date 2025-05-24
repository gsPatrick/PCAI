// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Certifique-se que aqui não há .JSX maiúsculo
import LandingPage from './pages/LandingPage/LandingPage'; // Correto e preferível
// OU
// import LandingPage from './pages/LandingPage/LandingPage.jsx'; // Também correto

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;