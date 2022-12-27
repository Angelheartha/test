import React from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
//import 'bootstrap/dist/css/bootstrap.css';
//import './components/index.css';
import App  from './components/App';
import reportWebVitals from './components/reportWebVitals';
import { render } from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { BrowserRouter, Router, Route, Routes, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';


//const root = createRoot(container);
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 2500,
  offset: '240px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

root.render(
<AlertProvider template={AlertTemplate} {...options}>
<BrowserRouter>
    <App />
</BrowserRouter>
</AlertProvider>
);