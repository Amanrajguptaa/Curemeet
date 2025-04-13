import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DoctorsProvider } from './store/store.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DoctorsProvider>
      <App />
    </DoctorsProvider>
  </BrowserRouter>
);