import { createContext } from 'react';

type DrinksType = {
  any: string,
};

export const DrinksContext = createContext({} as DrinksType);
