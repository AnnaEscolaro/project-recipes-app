import { useContext, useState } from 'react';
import { DoneRecipe } from '../types/typesLocalStorage';
import CardDoneRecipes from '../components/CardDoneRecipes';
import { LocalStorageContext } from '../context/LocalStorageContext/LocalStorageContext';
import './DoneRecipes.css';

export default function AllDoneRecipes() {
  const { doneRecipes } = useContext(LocalStorageContext);

  const doneRecipesLocalStorage = doneRecipes;

  const [filteredMealsOrDinks, setFilteredMealsOrDrinks] = useState<
  DoneRecipe[]>(doneRecipesLocalStorage);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleClickShare = async (link: string) => {
    // try {
    await navigator.clipboard.writeText(link);
    setAlertMessage('Link copied!');
    // } catch (error) {
    //   console.error(error);
    // }
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
      <div className="container-filter-buttons">
        <button
          className="filter-button"
          data-testid="filter-by-all-btn"
          onClick={ removeFilters }
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
          className="filter-button"
          data-testid="filter-by-meal-btn"
          onClick={ filterByMeal }
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
          className="filter-button"
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrink }
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
