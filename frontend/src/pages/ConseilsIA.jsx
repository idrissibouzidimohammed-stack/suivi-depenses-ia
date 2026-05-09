import { useState } from 'react';
import api from '../api/axios';

export default function ConseilsIA() {
  const [conseils, setConseils] = useState('');
  const [loading, setLoading] = useState(false);

  const getConseils = async () => {
    setLoading(true);
    try {
      const res = await api.get('/ia/conseils');
      const data = JSON.parse(res.data);
      setConseils(data.choices[0].message.content);
    } catch {
      setConseils('Erreur lors de la récupération des conseils.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Conseils IA 🤖</h2>
      <button onClick={getConseils} style={styles.btn} disabled={loading}>
        {loading ? 'Chargement...' : 'Obtenir des conseils budgétaires'}
      </button>
      {conseils && (
        <div style={styles.box}>
          <p>{conseils}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  btn: { padding: '10px 30px', background: '#9C27B0', color: 'white', border: 'none', cursor: 'pointer', fontSize: 16 },
  box: { marginTop: 20, padding: 20, background: '#f9f9f9', borderRadius: 8, border: '1px solid #ddd' }
};