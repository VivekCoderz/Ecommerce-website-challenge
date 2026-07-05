import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
import ProductDetail from './pages/ProductDetail'
const App = () => {
  return (
    <div className='h-screen w-screen '>
      

      {/* Routeing */}  
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
      </Routes>
    </div>
  ) 
}

export default App