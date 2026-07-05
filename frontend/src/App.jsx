import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
const App = () => {
  return (
    <div className='h-screen w-screen '>
      

      {/* Routeing */}  
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  ) 
}

export default App