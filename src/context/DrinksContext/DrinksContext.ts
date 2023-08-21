import { createContext } from 'react';
import { Drinks } from '../../types/typesApi';

type DrinksType = {
  drinks: Drinks | undefined,
  fetchDrinks: (url: string) => void,
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
};

export const DrinksContext = createContext({} as DrinksType);
