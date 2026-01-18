import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RecipeList from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div style={{ 
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column' 
        }}
      >
        <Header />
        <main style={{ 
          flex: 1, 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '20px' 
          }}
        >
          <Routes>
            <Route path="/" element={<RecipeList />} /> 
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;