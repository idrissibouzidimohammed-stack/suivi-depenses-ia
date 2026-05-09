import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function Depenses() {
  const [depenses, setDepenses] = useState([]);
  const [categorie, setCategorie] = useState('');
  const [montant, setMontant] = useState('');
  const [description, setDescription] = useState('');

  const load = async () => {
    const res = await api.get('/depenses');
    setDepenses(res.data);
  };

  useEffect(() => { load(); }, []);

  const ajouter = async () => {
    await api.post('/depenses', {
      categorie, montant: parseFloat(montant),
      description, date: new Date().toISOString().split('T')[0]
    });
    setCategorie(''); setMontant(''); setDescription('');
    load();
  };

  const supprimer = async (id) => {
    await api.delete(`/depenses/${id}`);
    load();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Mes Dépenses</h2>
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Catégorie" value={categorie}
          onChange={e => setCategorie(e.target.value)} style={styles.input} />
        <input placeholder="Montant (DH)" value={montant}
          onChange={e => setMontant(e.target.value)} style={styles.input} />
        <input placeholder="Description" value={description}
          onChange={e => setDescription(e.target.value)} style={styles.input} />
        <button onClick={ajouter} style={styles.btn}>Ajouter</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={styles.th}>Catégorie</th>
            <th style={styles.th}>Montant</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {depenses.map(d => (
            <tr key={d.id}>
              <td style={styles.td}>{d.categorie}</td>
              <td style={styles.td}>{d.montant} DH</td>
              <td style={styles.td}>{d.description}</td>
              <td style={styles.td}>{d.date}</td>
              <td style={styles.td}>
                <button onClick={() => supprimer(d.id)}
                  style={{ color: 'red', cursor: 'pointer' }}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  input: { margin: '5px', padding: 8, fontSize: 14 },
  btn: { padding: '8px 20px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' },
  th: { padding: 10, textAlign: 'left', border: '1px solid #ddd' },
  td: { padding: 10, border: '1px solid #ddd' }
};