import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Header} from '../components/header.jsx'
import { Navbar } from '../components/Navbar.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Header/>
    <App/>
    <Navbar/>
    </BrowserRouter>
  </StrictMode>,
)
