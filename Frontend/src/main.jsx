import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './context/auth.jsx'
import { SearchProvider } from './context/Search.jsx'
import { CartProvider } from './context/Cart.jsx'

createRoot(document.getElementById('root')).render(
<AuthProvider>
  <SearchProvider>
    <CartProvider>
  <BrowserRouter>
 
    <App />
  
  </BrowserRouter>
  </CartProvider>
  </SearchProvider>
  </AuthProvider>
)
