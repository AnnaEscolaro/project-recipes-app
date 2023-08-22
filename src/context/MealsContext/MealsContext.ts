import { createContext } from 'react';
import { Meals } from '../../types/typesApi';

type MealsType = {
  meals: Meals | { meals: null } | undefined,
  setMeals: React.Dispatch<React.SetStateAction<Meals | { meals: null } | undefined>>,
};

export const MealsContext = createContext({} as MealsType);
