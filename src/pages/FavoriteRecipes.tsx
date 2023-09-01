import { useContext, useState, useEffect } from 'react';
import { Recipe } from '../types/typesLocalStorage';
import { LocalStorageContext } from '../context/LocalStorageContext/LocalStorageContext';
import CardFavoriteRecipes from '../components/CardFavoriteRecipes';
import './FavoriteRecipes.css';

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
      <div className="container-filter-buttons">
        <button
          data-testid="filter-by-all-btn"
          onClick={ removeFilters }
          className="filter-button"
        >
          <div className="cointainer-filter-button">
            <img
              src="src/images/group.png"
              alt="icon show all"
              className="filter-img"
            />
            All
          </div>
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ filterByMeal }
          className="filter-button"
        >
          <div className="cointainer-filter-button">
            <img
              src="src/images/icone-prato.png"
              alt="meal icon"
              className="filter-img"
            />
            Meals
          </div>
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrink }
          className="filter-button"
        >
          <div className="cointainer-filter-button">
            <img
              src="src/images/icone-bebida.png"
              alt="drink icon"
              className="filter-img"
            />
            Drinks
          </div>
        </button>
      </div>
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
