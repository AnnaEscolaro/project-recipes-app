import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MealsProvider } from './context/MealsContext';
import { DrinksProvider } from './context/DrinksContext';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <DrinksProvider>
      <MealsProvider>
        <App />
      </MealsProvider>
    </DrinksProvider>,
  );
