import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './App.tsx'
import './App.css'
import { configureAppStore } from './store.ts';

const root = document.getElementById('root') as HTMLElement;
const store = configureAppStore({});

createRoot(root).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
