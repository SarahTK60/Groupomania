import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './styles/index.scss';
import './styles/custom.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);