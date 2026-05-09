import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>💰 Suivi Dépenses</span>
      <div>
        <button onClick={() => navigate('/dashboard')} style={styles.btn}>Dashboard</button>
        <button onClick={() => navigate('/depenses')} style={styles.btn}>Dépenses</button>
        <button onClick={() => navigate('/conseils')} style={styles.btn}>Conseils IA</button>
        <button onClick={logout} style={{...styles.btn, background: '#f44336'}}>Déconnexion</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 30px', background: '#1976D2', color: 'white' },
  logo: { fontSize: 20, fontWeight: 'bold' },
  btn: { margin: '0 5px', padding: '6px 14px', background: 'transparent',
    color: 'white', border: '1px solid white', cursor: 'pointer' }
};