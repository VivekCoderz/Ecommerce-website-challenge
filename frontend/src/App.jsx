import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
import ProductDetail from './pages/ProductDetail'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
const App = () => {
  return (
    <div className='h-screen w-screen '>
      

      {/* Routeing */}  
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  ) 
}

export default App