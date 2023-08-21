import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DrinksContext } from '../context/DrinksContext/DrinksContext';
import { MealsContext } from '../context/MealsContext/MealsContext';

type Props = {
  inputValue: string
};

export default function SearchBar({ inputValue }: Props) {
  const drinksContext = useContext(DrinksContext);
  const mealsContext = useContext(MealsContext);

  /*   const nav = useNavigate(); */
  const local = useLocation();
  const page = local.pathname.slice(1);

  const INITIAL_STATE = {
    ingredient: false,
    name: false,
    firstLetter: false,
    url: '',
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
            url: page === 'meals'
              ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`
              : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`,
          });
          break;
        case 'name':
          setSelected({
            firstLetter: false,
            ingredient: false,
            name: true,
            url: page === 'meals'
              ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
              : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`,
          });
          break;
        case 'first-letter':
          setSelected({
            name: false,
            ingredient: false,
            firstLetter: true,
            url: page === 'meals'
              ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`
              : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`,
          });
          break;
        default:
          setSelected({ ...selected });
      }
    }
  };

  const execSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inputValue.length > 1 && selected.firstLetter) {
      window.alert('Pesquisa Inválida');
    }
    if (page === 'meals' && selected.url.length > 0) {
      mealsContext.fetchMeals(selected.url);
    /*       if (mealsContext.meals?.meals.length === 1) {
        nav(`/meals/`)
      } */
    } else if (page === 'drinks' && selected.url.length > 0) {
      drinksContext.fetchDrinks(selected.url);
    }
    /*     if (mealsContext.meals === null || drinksContext.drinks === null) {
      window.alert('Sorry, we haven\'t found any recipes for these filters');
    } */
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
