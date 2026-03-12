import React, { useState } from 'react';
import premi from './PremiLotteria.json';

const Lotteria = () => {
  const [query, setQuery] = useState('');

  // Filtro dei premi in base al numero cercato
  const premiFiltrati = query
    ? premi.filter((premio) => premio.numero.toString().includes(query))
    : premi;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className='title'>Lotteria</h1>
      </header>

      <div className='widget'>
        
        <p>
        Per confermare la propria vincita telefonare al +39 3478886602 (Arianna) oppure al numero +39 3382833134 (Anthony).
        <br></br>
        I premi devono essere ritirati presso Via Valverde 14, Bologna (40136) tassativamente entro il 31luglio 2026.
        </p>
      </div>

      <div className="">
        <input
          type="text"
          placeholder="Cerca numero vincente"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', width: '100%', marginTop: '10px' }}
        />
      </div>
      <div className="widget-container">
        {premiFiltrati.length > 0 ? (
          premiFiltrati.map((premio) => (
            <div key={premio.premio}>
              <h2>{premio.premio}° premio</h2>
              <p>{premio.descrizione}</p>
              {premio.commento && <p style={{ fontSize: '0.9em', color: '#666', fontStyle: 'italic', marginTop: '-10px' }}>{premio.commento}</p>}
              <p><strong>Numero vincente:</strong> {premio.numero}</p>
            </div>
          ))
        ) : (
          <p>Nessun numero vincente trovato.</p>
        )}
      </div>
    </div>
  );
};

export default Lotteria;