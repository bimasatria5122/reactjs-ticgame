import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import db from './db';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={db}>

    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full">
        <App />
      </div>
    </div>
    
  </Provider>,
)
