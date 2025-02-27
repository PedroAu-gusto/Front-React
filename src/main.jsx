import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './Pages/Cadastro';
import Login from './Pages/Login'; // ✅ Mantém apenas essa importação
import { AuthProvider } from './AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router> {/* ✅ Adiciona basename para GitHub Pages */}
        <Routes>
          <Route path="/" element={<Login />} />   {/* ✅ Página inicial corrigida */}
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
