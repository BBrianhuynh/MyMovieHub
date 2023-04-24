import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Create from './Pages/Create'
import Update from './Pages/Update'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Create" element={<Create />}/>
        <Route path="/Update/:id" element={<Update />}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
