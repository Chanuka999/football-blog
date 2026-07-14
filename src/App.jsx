import React from 'react'

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
