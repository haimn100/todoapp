import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { todoApi } from './store';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <ApiProvider api={todoApi}>
    <App />
  </ApiProvider>
);
