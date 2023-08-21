import { useState } from 'react';
import { MealsContext } from './MealsContext';
import { Meals } from '../../types/typesApi';
import { api } from '../../services/api';

export function MealsProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meals>();

  const fetchMeals = async (url: string) => {
    try {
      const data = await api(url);
      setMeals(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const shared = {
    meals,
    fetchMeals,
  };

  return (
    <MealsContext.Provider value={ shared }>
      { children }
    </MealsContext.Provider>
  );
}
