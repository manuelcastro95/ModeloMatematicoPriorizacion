import Login from './pages/Login';


import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Dashboard from './pages/Dashboard';
import Loader from './components/dashboard/Loader';
import Criterios from './pages/Criterios';
import CasosUso from './pages/CasosUso';
import Evaluadores from './pages/Evaluadores';
import Evaluaciones from './pages/Evaluaciones';


export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) :  (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login callback={setToken} />}></Route>
        <Route path="/dashboard" element={<Dashboard token={token} />}></Route>

        <Route path='/casos-uso-historias' element={<CasosUso />}></Route>
        <Route path='/criterios' element={<Criterios />}></Route>
        <Route path='/evaluadores' element={<Evaluadores />}></Route>
        <Route path='/evaluaciones' element={<Evaluaciones token={token} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}