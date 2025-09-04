import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ Use createRoot
import './css/index.css';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // ✅ React 18 way
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
