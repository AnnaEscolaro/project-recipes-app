import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DrinksContext } from '../context/DrinksContext/DrinksContext';
import { MealsContext } from '../context/MealsContext/MealsContext';
import { drinksSearch, mealsSearch } from '../services/api';

export default function SearchBar() {
  const drinksContext = useContext(DrinksContext);
  const mealsContext = useContext(MealsContext);

  const { inputValue, setSearchFilter, searchFilter } = drinksContext;

  const nav = useNavigate();
  const local = useLocation();
  const page = local.pathname.slice(1);

  const INITIAL_STATE = {
    ingredient: false,
    name: false,
    firstLetter: false,
  };

  const [selected, setSelected] = useState(INITIAL_STATE);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setSearchFilter(target.name);
    switch (target.name) {
      case 'ingredient':
        setSelected({
          firstLetter: false,
          name: false,
          ingredient: true,
        });
        break;
      case 'name':
        setSelected({
          firstLetter: false,
          ingredient: false,
          name: true,
        });
        break;
      case 'first-letter':
        setSelected({
          name: false,
          ingredient: false,
          firstLetter: true,
        });
        break;
      default:
        setSelected({ ...selected });
    }
  };

  const execSearch = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(inputValue);
    console.log(searchFilter);
    if (inputValue.length > 1 && searchFilter === 'first-letter') {
      return window.alert('Your search must have only 1 (one) character');
    }
    if (page === 'meals') {
      const data = await mealsSearch(searchFilter, inputValue);
      mealsContext.setMeals(data);
      if (page === 'meals' && !mealsContext.meals.meals) {
        console.log(mealsContext.meals.meals);
        return window.alert('Sorry, we haven\'t found any recipes for these filters');
      }
    }
    if (page === 'drinks') {
      const data = await drinksSearch(searchFilter, inputValue);
      drinksContext.setDrinks(data);
      if (page === 'drinks' && !drinksContext.drinks.drinks) {
        return window.alert('Sorry, we haven\'t found any recipes for these filters');
      }
    }
    if (mealsContext.meals?.meals.length === 1) {
      return nav(`/meals/${mealsContext.meals.meals[0].idMeal}`);
    }
    if (drinksContext.drinks?.drinks.length === 1) {
      return nav(`/drinks/${drinksContext.drinks.drinks[0].idDrink}`);
    }
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
