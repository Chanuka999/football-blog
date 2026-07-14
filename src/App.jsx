import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Articles from './pages/Articles'
import ArticleDetails from './pages/ArticleDetails'
import About from './pages/About'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className='app'>
       <Navbar />
       <main>
     <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </main>

          <Footer />
    </div>
  )
}

export default App
