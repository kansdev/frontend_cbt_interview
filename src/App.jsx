import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CekPeserta from './pages/CekPeserta';
import WawancaraPeserta from './pages/WawancaraPeserta'; 
// import SelesaiPeserta from './pages/SelesaiPeserta'; 
import './App.css'

function App() {
  return (
    <Router>
      <div className='container my-5'>
        <Routes>
          <Route path="/" element={<CekPeserta />}></Route>
          <Route path="/wawancara/:user_id" element={<WawancaraPeserta />}></Route>
          {/* <Route path="/wawancara/selesai" element={<SelesaiPeserta />}></Route> */}
        </Routes>
      </div>
    </Router>
  )

}

export default App;
