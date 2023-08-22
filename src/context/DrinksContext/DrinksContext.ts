import { createContext } from 'react';
import { Drinks } from '../../types/typesApi';

type DrinksType = {
  drinks: Drinks | { drinks: null } | undefined,
  setDrinks: React.Dispatch<React.SetStateAction<Drinks | { drinks: null } | undefined>>,
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  searchFilter: string,
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>,
};

export const DrinksContext = createContext({} as DrinksType);
