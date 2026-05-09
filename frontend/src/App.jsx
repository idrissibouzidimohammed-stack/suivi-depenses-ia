import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Depenses from './pages/Depenses';
import ConseilsIA from './pages/ConseilsIA';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

function Dashboard() {
  return (
    <div style={{ padding: 30 }}>
      <h2>Bienvenue sur votre tableau de bord ! 👋</h2>
      <p>Utilisez la navbar pour naviguer.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Navbar /><Dashboard /></PrivateRoute>
        } />
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