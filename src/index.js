import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'normalize.css';
import App from './App';
import { Provider } from "react-redux";
import store from './redux/store';
import {BrowserRouter as Router} from 'react-router-dom';


import { AppProvider } from './context/appContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <AppProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
      </Provider> 
    </AppProvider>  
    
  </React.StrictMode>
);

