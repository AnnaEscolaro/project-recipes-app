import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { api } from '../services/api';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const [details, setDetails] = useState({});

  useEffect(() => {
    const getDetails = async () => {
      if (pathname.includes('meals')) {
        const data = await api(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDetails(data);
      } else {
        const data = await api(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDetails(data);
        console.log(details);
      }
    };
    getDetails();
  }, [pathname, id]);

  return (
    <div>RecipeDetails</div>
  );
}
