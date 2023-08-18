import { createContext } from 'react';

type MealsType = {
  any: string,
};

export const MealsContext = createContext({} as MealsType);
