import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './app/App.jsx';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
  </StrictMode>,
)
