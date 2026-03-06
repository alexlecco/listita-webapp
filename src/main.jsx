import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Listita from './screens/Listita.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Listita />
  </StrictMode>
);
