import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DrinksContext } from '../context/DrinksContext/DrinksContext';
import { MealsContext } from '../context/MealsContext/MealsContext';

export default function SearchBar() {
  const drinksContext = useContext(DrinksContext);
  const mealsContext = useContext(MealsContext);

  const { inputValue } = drinksContext;

  const nav = useNavigate();
  const local = useLocation();
  const page = local.pathname.slice(1);

  const INITIAL_STATE = {
    ingredient: false,
    name: false,
    firstLetter: false,
    // url: '',
  };

  const [selected, setSelected] = useState(INITIAL_STATE);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (inputValue.length > 0 && inputValue !== null) {
      switch (target.name) {
        case 'ingredient':
          setSelected({
            firstLetter: false,
            name: false,
            ingredient: true,
            // url: page === 'meals'
            //   ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`
            //   : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`,
          });
          console.log(selected);
          break;
        case 'name':
          setSelected({
            firstLetter: false,
            ingredient: false,
            name: true,
            // url: page === 'meals'
            //   ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
            //   : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`,
          });
          console.log(selected);
          break;
        case 'first-letter':
          setSelected({
            name: false,
            ingredient: false,
            firstLetter: true,
            // url: page === 'meals'
            //   ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`
            //   : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`,
          });
          console.log(selected);
          break;
        default:
          setSelected({ ...selected });
      }
    }
  };

  const execSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(inputValue);
    // if (inputValue.length > 1 && selected.firstLetter) {
    //   return window.alert('Pesquisa Inválida');
    // }
    // if (page === 'meals' && mealsContext.meals?.meals === null) {
    //   return window.alert('Sorry, we haven\'t found any recipes for these filters');
    // }
    // if (page === 'drinks' && drinksContext.drinks?.drinks === null) {
    //   return window.alert('Sorry, we haven\'t found any recipes for these filters');
    // }
    if (page === 'meals' && selected.url.length > 0) {
      return mealsContext.fetchMeals(selected.url);
    }
    if (page === 'drinks' && selected.url.length > 0) {
      return drinksContext.fetchDrinks(selected.url);
    }
    // if (mealsContext.meals?.meals.length === 1) {
    //   nav(`/meals/${mealsContext.meals.meals[0].idMeal}`);
    // }
    // if (drinksContext.drinks?.drinks.length === 1) {
    //   nav(`/meals/${drinksContext.drinks.drinks[0].idDrink}`);
    // }
  };

  return (
    <div>
      <label htmlFor="ingredient">
        {' '}
        Ingredient
        {' '}
        <input
          type="radio"
          name="ingredient"
          id="ingredient"
          data-testid="ingredient-search-radio"
          checked={ selected.ingredient }
          onChange={ handleCheck }
        />
      </label>
      <label htmlFor="name">
        {' '}
        Name
        {' '}
        <input
          type="radio"
          name="name"
          id="name"
          data-testid="name-search-radio"
          checked={ selected.name }
          onChange={ handleCheck }
        />
      </label>
      <label htmlFor="first-letter">
        {' '}
        First-Letter
        {' '}
        <input
          type="radio"
          name="first-letter"
          id="first-letter"
          data-testid="first-letter-search-radio"
          checked={ selected.firstLetter }
          onChange={ handleCheck }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ execSearch }
      >
        Search
      </button>
    </div>
  );
}
