import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Login from './pages/Login';
import Register from './pages/Register';
import Depenses from './pages/Depenses';
import ConseilsIA from './pages/ConseilsIA';
import Navbar from './components/Navbar';
import api from './api/axios';

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

function Dashboard() {
  const [depenses, setDepenses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get('/depenses').then(res => {
      setDepenses(res.data);
      setTotal(res.data.reduce((sum, d) => sum + d.montant, 0));
    });
  }, []);

  // Données par catégorie
  const parCategorie = depenses.reduce((acc, d) => {
    acc[d.categorie] = (acc[d.categorie] || 0) + d.montant;
    return acc;
  }, {});
  const dataCategorie = Object.entries(parCategorie).map(([name, montant]) => ({ name, montant }));

  // Données par mois
  const parMois = depenses.reduce((acc, d) => {
    const mois = d.date ? d.date.substring(0, 7) : 'Inconnu';
    acc[mois] = (acc[mois] || 0) + d.montant;
    return acc;
  }, {});
  const dataMois = Object.entries(parMois).map(([name, montant]) => ({ name, montant }));

  return (
    <div style={{ padding: 30 }}>
      <h2>📊 Tableau de bord</h2>

      {/* Total */}
      <div style={styles.card}>
        <h3>💰 Total des dépenses</h3>
        <p style={styles.total}>{total.toFixed(2)} DH</p>
      </div>

      {/* Graphique par catégorie */}
      <div style={styles.card}>
        <h3>📂 Dépenses par catégorie</h3>
        {dataCategorie.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataCategorie}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value} DH`} />
              <Bar dataKey="montant" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>Aucune dépense enregistrée.</p>
        )}
      </div>

      {/* Graphique par mois */}
      <div style={styles.card}>
        <h3>📅 Tendances mensuelles</h3>
        {dataMois.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataMois}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value} DH`} />
              <Line type="monotone" dataKey="montant" stroke="#2196F3" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>Aucune donnée mensuelle.</p>
        )}
      </div>

      {/* Liste des dernières dépenses */}
      <div style={styles.card}>
        <h3>🕐 Dernières dépenses</h3>
        {depenses.slice(-5).reverse().map(d => (
          <div key={d.id} style={styles.item}>
            <span>{d.categorie}</span>
            <span style={{ color: '#f44336', fontWeight: 'bold' }}>{d.montant} DH</span>
            <span style={{ color: '#888' }}>{d.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#1e1e1e',
    border: '1px solid #333',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    color: 'white'
  },
  total: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    margin: 0
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #333',
    color: 'white'
  }
};

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