import { useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    try {
      if (mealsContext.meals && mealsContext.meals.meals?.length === 1) {
        console.log(mealsContext.meals.meals);
        nav(`/meals/${mealsContext.meals.meals[0].idMeal}`);
      }
      if (drinksContext.drinks?.drinks?.length === 1) {
        console.log(drinksContext.drinks.drinks);
        nav(`/meals/${drinksContext.drinks.drinks[0].idDrink}`);
      }
      if (drinksContext.drinks?.drinks === null || mealsContext.meals?.meals === null) {
        window.alert('Sorry, we haven\'t found any recipes for these filters');
      }
    } catch (error) {
      console.error(error);
    }
  }, [drinksContext.drinks?.drinks, nav, mealsContext.meals]);

  const execSearch = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (inputValue.length > 1 && searchFilter === 'first-letter') {
      return window.alert('Your search must have only 1 (one) character');
    }
    const mealsData = await mealsSearch(searchFilter, inputValue, page);
    if (mealsData) mealsContext.setMeals(mealsData);
    const drinksData = await drinksSearch(searchFilter, inputValue, page);
    if (drinksData) drinksContext.setDrinks(drinksData);
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
