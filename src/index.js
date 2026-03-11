import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { HashRouter } from "react-router-dom";


const urlParams = new URLSearchParams(window.location.search);
const redirectId = urlParams.get('redirect');

if (redirectId) {
  let targetPath = '/';
  switch (redirectId) {
    case '1': targetPath = '/images'; break;
    case '2': targetPath = '/food'; break;
    case '3': targetPath = '/info'; break;
    case '4': targetPath = '/lottery'; break;
    default: targetPath = '/'; break;
  }
  const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '#' + targetPath;
  window.history.replaceState({ path: newUrl }, '', newUrl);
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);


