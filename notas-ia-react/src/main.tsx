import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/styles.css';
import App from './App.tsx';

createRoot(document.getElementById('contenedor')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
