import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartProvider } from './context/CartContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <ThemeProvider>
      <CartProvider>
        <App />
        <ToastContainer position="bottom-right" theme="colored" autoClose={2500} limit={2} />
      </CartProvider>
    </ThemeProvider>
  </BrowserRouter>

)
