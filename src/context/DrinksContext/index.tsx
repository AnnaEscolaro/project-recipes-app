import { useState } from 'react';
import { DrinksContext } from './DrinksContext';
import { Drinks } from '../../types/typesApi';
import { api } from '../../services/api';

export function DrinksProvider({ children }: { children: React.ReactNode }) {
  const [drinks, setDrinks] = useState<Drinks>();

  const fetchDrinks = async (url: string) => {
    try {
      const data = await api(url);
      setDrinks(data.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  const shared = {
    drinks,
    fetchDrinks,
  };

  return (
    <DrinksContext.Provider value={ shared }>
      { children }
    </DrinksContext.Provider>
  );
}
