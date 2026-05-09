import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, motDePasse });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      alert('Email ou mot de passe incorrect');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Connexion</h2>
      <input placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)} style={styles.input} />
      <input placeholder="Mot de passe" type="password" value={motDePasse}
        onChange={e => setMotDePasse(e.target.value)} style={styles.input} />
      <button onClick={handleLogin} style={styles.btn}>Se connecter</button>
      <p>Pas de compte ? <a href="/register">S'inscrire</a></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: '100px auto', padding: 30, textAlign: 'center' },
  input: { display: 'block', width: '100%', margin: '10px 0', padding: 10, fontSize: 16 },
  btn: { padding: '10px 30px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', fontSize: 16 }
};