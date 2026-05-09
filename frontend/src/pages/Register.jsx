import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { nom, email, motDePasse });
      alert('Inscription réussie !');
      navigate('/login');
    } catch {
      alert('Erreur lors de l\'inscription');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Inscription</h2>
      <input placeholder="Nom" value={nom}
        onChange={e => setNom(e.target.value)} style={styles.input} />
      <input placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)} style={styles.input} />
      <input placeholder="Mot de passe" type="password" value={motDePasse}
        onChange={e => setMotDePasse(e.target.value)} style={styles.input} />
      <button onClick={handleRegister} style={styles.btn}>S'inscrire</button>
      <p>Déjà un compte ? <a href="/login">Se connecter</a></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 400, margin: '100px auto', padding: 30, textAlign: 'center' },
  input: { display: 'block', width: '100%', margin: '10px 0', padding: 10, fontSize: 16 },
  btn: { padding: '10px 30px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', fontSize: 16 }
};