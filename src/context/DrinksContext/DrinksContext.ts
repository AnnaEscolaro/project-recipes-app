import { createContext } from 'react';
import { Drinks } from '../../types/typesApi';

type DrinksType = {
  drinks: Drinks | undefined,
  fetchDrinks: (url: string) => void,
};

export const DrinksContext = createContext({} as DrinksType);
