import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Depenses from './pages/Depenses';
import ConseilsIA from './pages/ConseilsIA';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/depenses" element={
          <PrivateRoute><Navbar /><Depenses /></PrivateRoute>
        } />
        <Route path="/conseils" element={
          <PrivateRoute><Navbar /><ConseilsIA /></PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}