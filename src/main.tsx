import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './App.tsx'
import './App.css'
import { configureAppStore } from './store.ts';
import { Toaster } from 'react-hot-toast';

const root = document.getElementById('root') as HTMLElement;
const store = configureAppStore({});

createRoot(root).render(
  <Provider store={store}>
    <StrictMode>
      <App />
      <Toaster position='bottom-center'/>
    </StrictMode>
  </Provider>
)
