// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UrlShortenerPage from './pages/UrlShortenerPage'
import RedirectPage from './pages/RedirectPage'
import StatsPage from './pages/StatsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<UrlShortenerPage />} />
      <Route path="/:shortcode" element={<RedirectPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  )
}

export default App

