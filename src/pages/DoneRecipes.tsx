import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DoneRecipe } from '../types/typesLocalStorage';
import CardDoneRecipes from '../components/CardDoneRecipes';

export default function AllDoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const doneRecipesLocalStorage = useLocalStorage('doneRecipes', []);

  const handleClickShare = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setAlertMessage('Link copied!');
    } catch (error) {
      console.error(error);
    }
  };

  const filterByMeal = () => {
    const recipesToFilter = doneRecipes;
    const filteredByMeals = recipesToFilter
      .filter((recipe: DoneRecipe) => recipe.type === 'meals');
    setDoneRecipes(filteredByMeals);
  };

  const filterByDrink = () => {
    const recipesToFilter = doneRecipes;
    const filteredByDrinks = recipesToFilter
      .filter((recipe: DoneRecipe) => recipe.type === 'drinks');
    setDoneRecipes(filteredByDrinks);
  };

  const removeFilters = () => {
    setDoneRecipes(doneRecipesLocalStorage);
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
        doneRecipes?.map(({
          id,
          type,
          category,
          name,
          image,
          doneDate,
          tags,
          nationality,
          alcoholicOrNot,
        }: DoneRecipe, index: number) => (
          <CardDoneRecipes
            key={ id }
            id={ id }
            type={ type }
            index={ index }
            image={ image }
            category={ category }
            name={ name }
            doneDate={ doneDate }
            tags={ tags }
            nationality={ nationality }
            alcoholicOrNot={ alcoholicOrNot }
            handleClick={ handleClickShare }
            alert={ alertMessage }
          />
        ))
      }
    </div>
  );
}
