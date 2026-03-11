import React from 'react';
import { FiHome, FiCalendar, FiFolder } from 'react-icons/fi';
import { IoFastFoodOutline } from "react-icons/io5";
import { TbListNumbers } from "react-icons/tb";

// Importiamo i componenti delle pagine
import Home from '../pages/Home/Home';
import Info from '../pages/Info/Info';
import Food from '../pages/Food/Food';
import Lottery from '../pages/Lottery/Lottery';
import Gallery from '../pages/Gallery/Gallery';

/**
 * Configurazione centralizzata per la navigazione.
 * 
 * @property {string} label - Etichetta del pulsante (utile per aria-label)
 * @property {string} path - Percorso della rotta (URL)
 * @property {JSX.Element} icon - Icona da mostrare nella BottomBar
 * @property {React.Component} component - Il componente pagina da renderizzare
 * @property {boolean} enabled - Se false, la pagina non viene mostrata nel sito (simula il commentare il codice)
 */
export const navLinks = [
  {
    label: 'Home',
    path: '/',
    icon: <FiHome size={24} />,
    component: <Home />,
    enabled: true
  },
  {
    label: 'Info',
    path: '/info',
    icon: <FiCalendar size={24} />,
    component: <Info />,
    enabled: true
  },
  {
    label: 'Food',
    path: '/food',
    icon: <IoFastFoodOutline size={24} />,
    component: <Food />,
    enabled: true
  },
  {
    label: 'Lotteria',
    path: '/lottery',
    icon: <TbListNumbers size={24} />,
    component: <Lottery />,
    enabled: true
  },
  {
    label: 'Immagini',
    path: '/images',
    icon: <FiFolder size={24} />,
    component: <Gallery />,
    enabled: true
  }
];
