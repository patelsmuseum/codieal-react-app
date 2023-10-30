import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {App}  from './components'
import { BrowserRouter  } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider>
        
            <App />
        
        
     </AuthProvider>
  </React.StrictMode>
);


