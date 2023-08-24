import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { MealsAndDrinks } from '../types/typesApi';
import DrinksDetail from '../components/DrinksDetails';
import MealsDetails from '../components/MealsDetails';
import { Recipe } from '../types/typesLocalStorage';
import { LocalStorageContext } from '../context/LocalStorageContext/LocalStorageContext';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [alertMessage, setAlertMessage] = useState<string>('');
  const { favoriteRecipes, setFavoriteRecipes } = useContext(LocalStorageContext);

  const [details, setDetails] = useState<MealsAndDrinks>();
  const [isMeals, setIsMeals] = useState<boolean>();

  useEffect(() => {
    const getDetails = async () => {
      try {
        if (pathname.includes('meals')) {
          const data = await api(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
          );
          setIsMeals(true);
          setDetails(data);
        } else {
          const data = await api(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
          );
          setIsMeals(false);
          setDetails(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [pathname, id]);

  const handleClickShare = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setAlertMessage('Link copied!');
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDrinkFavorite = (favoriteRecipe:Recipe) => {
    const favorite = favoriteRecipes.some(
      (recipe) => recipe.id === favoriteRecipe.id,
    );
    if (favorite) {
      const newFavorite = favoriteRecipes.filter(
        (recipe) => recipe.id !== favoriteRecipe.id,
      );
      setFavoriteRecipes(newFavorite);
    } else {
      setFavoriteRecipes([...favoriteRecipes, favoriteRecipe]);
    }
  };

  return (
    <section>
      {isMeals
        ? details && (
          <MealsDetails
            meals={ details.meals[0] }
            handleClick={ handleClickShare }
            alert={ alertMessage }
            handleClickFavorite={ handleClickDrinkFavorite }
          />
        )
        : details && (
          <DrinksDetail
            drink={ details.drinks[0] }
            handleClick={ handleClickShare }
            alert={ alertMessage }
            handleClickFavorite={ handleClickDrinkFavorite }
          />
        )}
    </section>
  );
}
