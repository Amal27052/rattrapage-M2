/**
 * POINT D'ENTRÉE DE L'APPLICATION
 * 
 * Ce fichier est le premier fichier qui s'exécute quand on lance l'app.
 * Il monte l'application React dans le DOM (la page HTML).
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// On cherche l'élément avec l'id "root" dans index.html
// et on monte notre application React dedans
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
