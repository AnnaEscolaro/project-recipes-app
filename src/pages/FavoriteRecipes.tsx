import { useContext, useState, useEffect } from 'react';
import { Recipe } from '../types/typesLocalStorage';
import { LocalStorageContext } from '../context/LocalStorageContext/LocalStorageContext';
import CardFavoriteRecipes from '../components/CardFavoriteRecipes';

export default function AllDoneRecipes() {
  const { favoriteRecipes } = useContext(LocalStorageContext);
  const [favoriteRecipesLocalStorage,
    setFavoriteRecipesLocalStorage] = useState<Recipe[]>(favoriteRecipes);

  useEffect(() => {
    setFavoriteRecipesLocalStorage(favoriteRecipes);
    setFilteredMealsOrDrinks(favoriteRecipesLocalStorage);
  }, [favoriteRecipes, favoriteRecipesLocalStorage]);

  const [filteredMealsOrDrinks,
    setFilteredMealsOrDrinks] = useState<Recipe[]>(favoriteRecipesLocalStorage);

  const filterByMeal = () => {
    const recipesToFilter = favoriteRecipesLocalStorage;
    const filteredByMeals = recipesToFilter
      .filter((recipe: Recipe) => recipe.type === 'meal');
    setFilteredMealsOrDrinks(filteredByMeals);
  };

  const filterByDrink = () => {
    const recipesToFilter = favoriteRecipesLocalStorage;
    const filteredByDrinks = recipesToFilter
      .filter((recipe: Recipe) => recipe.type === 'drink');
    setFilteredMealsOrDrinks(filteredByDrinks);
  };

  const removeFilters = () => {
    setFilteredMealsOrDrinks(favoriteRecipesLocalStorage);
  };

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ removeFilters }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ filterByMeal }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ filterByDrink }
      >
        Drinks
      </button>
      {
        filteredMealsOrDrinks?.map((recipe: Recipe, index: number) => (
          <CardFavoriteRecipes
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
          />
        ))
      }

    </div>
  );
}
