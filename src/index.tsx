import ReactDOM from 'react-dom/client';

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './features/api/apiSlice';

import { App } from './App';

import './index.css';

const app = (
  <ApiProvider api={apiSlice}>
    <App />
  </ApiProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(app);
