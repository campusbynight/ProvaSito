import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import BottomBar from './components/BottomBar/BottomBar';
import Footer from './components/Footer/Footer';
import { navLinks } from './config/navLinks';
import "./styles/swipe.css";
import './styles/App.css';
import logoAnimato from './files/animazione_logo_CBN26.webm';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleVideoUpdate = (e) => {
    // Fai partire l'apertura 0.5 secondi PRIMA della fine del video
    // Modifica '0.5' per anticipare o ritardare l'apertura
    const timeLeft = e.target.duration - e.target.currentTime;
    if (timeLeft < 0.2) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Torna in cima alla pagina ad ogni cambio di rotta
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Gestione del redirect tramite parametro nell'URL principale (?redirect=1)
    const urlParams = new URLSearchParams(window.location.search);
    const redirectId = urlParams.get('redirect');

    if (redirectId) {
      // Puliamo l'URL dal parametro per evitare loop di redirect
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash;
      window.history.replaceState({path: newUrl}, '', newUrl);

      // Usiamo React Router per navigare (senza il #)
      switch (redirectId) {
        case '1':
          navigate('/images', { replace: true });
          break;
        case '2':
          navigate('/food', { replace: true });
          break;
        case '3':
          navigate('/info', { replace: true });
          break;
        case '4':
          navigate('/lottery', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
          break;
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div>
       {/* Preloader */}
       <div className={`preloader ${loading ? '' : 'hidden'}`}>
        <div className="preloader-backdrop"></div>
        <div className="loader-content">
           <video 
             src={logoAnimato} 
             autoPlay 
             muted 
             playsInline 
             preload="auto"
             style={{ width: '700px', height: 'auto' }}
             onTimeUpdate={handleVideoUpdate}
           />
        </div>
      </div>

      {/* Contenuto del sito */}
      <div className={`site-content ${loading ? '' : 'visible'}`}>
        <div className="appContainer">
          <div className="swipePage">
            <Routes>
              {navLinks
                .filter(link => link.enabled)
                .map((link, index) => (
                  <Route key={index} path={link.path} element={link.component} />
                ))
              }
            </Routes>
          </div>
          <BottomBar />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
