import { useEffect, useState } from 'react';
import {
  Drinks, Meals, MealsCategories, MealsIngredients, MealsNacionality,
} from '../types/typesApi';
import { api } from '../services/api';

export function useFetch(url: string) {
  const [data, setData] = useState<
  Meals | MealsCategories | MealsIngredients | MealsNacionality | Drinks>();

  useEffect(() => {
    const fetchData = async () => {
      const fetching = await api(url);
      setData(fetching);
    };
    fetchData();
  });

  return data;
}
