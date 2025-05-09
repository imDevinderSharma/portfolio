import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import InstagramLocked from './components/pages/InstagramLocked'
import ErrorBoundary from './components/utils/ErrorBoundary'
import { useTheme } from './hooks/useTheme'

// Import CSS files
import './styles/globals.css'
import './styles/layout.css'
import './styles/sections.css'

function App() {
  const { theme } = useTheme()
  
  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      
      const id = target.getAttribute('href')
      if (!id || id === '#') return
      
      const element = document.querySelector(id)
      if (element) {
        e.preventDefault()
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
    
    // Add touch event handler for mobile devices
    const handleTouchStart = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      
      const id = target.getAttribute('href')
      if (!id || id === '#') return
      
      const element = document.querySelector(id)
      if (element) {
        e.preventDefault()
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
    
    document.addEventListener('click', handleAnchorClick)
    document.addEventListener('touchstart', handleTouchStart)
    
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  return (
    <div className="app" data-theme={theme}>
      <Routes>
        <Route path="/instagram-locked" element={<InstagramLocked />} />
        <Route path="/" element={
          <Layout>
            <ErrorBoundary>
              <Hero />
            </ErrorBoundary>
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
          </Layout>
        } />
      </Routes>
    </div>
  )
}

export default App
