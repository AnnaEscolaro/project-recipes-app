import { createContext } from 'react';
import { Meals } from '../../types/typesApi';

type MealsType = {
  meals: Meals | undefined,
  fetchMeals: (url: string) => void,
};

export const MealsContext = createContext({} as MealsType);
