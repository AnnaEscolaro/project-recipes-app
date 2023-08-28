import { useContext, useState } from 'react';
import { DoneRecipe } from '../types/typesLocalStorage';
import CardDoneRecipes from '../components/CardDoneRecipes';
import ShareButton from '../components/Buttons/ShareButtton';
import { LocalStorageContext } from '../context/LocalStorageContext/LocalStorageContext';

export default function AllDoneRecipes() {
  const { doneRecipes, setDoneRecipes } = useContext(LocalStorageContext);

  const doneRecipesLocalStorage = doneRecipes;

  const [filteredMealsOrDinks, setFilteredMealsOrDrinks] = useState<
  DoneRecipe[]>(doneRecipesLocalStorage);
  const [alertMessage, setAlertMessage] = useState<string>('');

  console.log(filteredMealsOrDinks);

  const handleClickShare = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setAlertMessage('Link copied!');
    } catch (error) {
      console.error(error);
    }
  };

  const filterByMeal = () => {
    const recipesToFilter = doneRecipesLocalStorage;
    const filteredByMeals = recipesToFilter
      .filter((recipe: DoneRecipe) => recipe.type === 'meal');
    setFilteredMealsOrDrinks(filteredByMeals);
  };

  const filterByDrink = () => {
    const recipesToFilter = doneRecipesLocalStorage;
    const filteredByDrinks = recipesToFilter
      .filter((recipe: DoneRecipe) => recipe.type === 'drink');
    setFilteredMealsOrDrinks(filteredByDrinks);
  };

  const removeFilters = () => {
    setFilteredMealsOrDrinks(doneRecipesLocalStorage);
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
        filteredMealsOrDinks?.map(({
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
          <>
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
            {/* <ShareButton link={ `http://localhost:3000/${type}/${id}` } /> */}
          </>
        ))
      }

    </div>
  );
}
