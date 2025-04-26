import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AdminProvider } from './store/store.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminProvider>
    <App />
    </AdminProvider>
  </BrowserRouter>

)
