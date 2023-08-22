import { useEffect, useState } from 'react';
import {
  MealsAndDrinks, Meals, MealsCategories, MealsNacionality,
} from '../types/typesApi';
import { api } from '../services/api';

export function useFetch(url: string) {
  const [data, setData] = useState<
  Meals | MealsCategories | MealsNacionality | MealsAndDrinks>();

  useEffect(() => {
    const fetchData = async () => {
      const fetching = await api(url);
      setData(fetching);
    };
    fetchData();
  });

  return data;
}
