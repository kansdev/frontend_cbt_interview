import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedServices';
import LoginPewawancara from './pages/LoginPewawancara';
import CekPeserta from './pages/CekPeserta';
import WawancaraPeserta from './pages/WawancaraPeserta';
// import SelesaiPeserta from './pages/SelesaiPeserta';
import './App.css'

function App() {
  return (
    <Router>
      <div className='container my-5'>
        <Routes>
          <Route path='/wawancara' element={
            <ProtectedRoute>
              <CekPeserta />
            </ProtectedRoute>
          }>
          </Route>
          <Route path="/" element={<LoginPewawancara />}></Route>                
          <Route path="/wawancara/peserta/:nomor_pendaftaran" element={<WawancaraPeserta />}></Route>
          <Route path="/wawancara/selesai/:nomor_pendaftaran" element={<SelesaiPeserta />}></Route>
        </Routes>
      </div>
    </Router>
  )

}

export default App;
