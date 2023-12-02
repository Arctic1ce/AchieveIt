import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './AchieveIt';
import 'achieveit-frontend/dist/output.css';
import './additional.css';
import { NextUIProvider } from '@nextui-org/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="achieveit-light text-foreground bg-background">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
);
