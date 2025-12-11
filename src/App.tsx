import './App.css'
// import { useState } from 'react'
import {  BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RecipeList from './pages/RecipeList'
import RecipeDetail from './pages/RecipeDetail'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

function App() {
    
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeList />} /> 
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
   
  );
}

export default App;
