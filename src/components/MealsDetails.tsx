import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Drinks, Meals } from '../types/typesApi';
import { LocalStorageContext } from '../context/LocalStorageContext/LocalStorageContext';
import { Recipe } from '../types/typesLocalStorage';
import favoriteIcon from '../images/blackHeartIcon.svg';
import noIsFavoriteIcon from '../images/whiteHeartIcon.svg';
import Buttons from './Buttons';

export default function MealsDetails({
  meals,
  handleClick,
  alert,
  handleClickFavorite,
}: {
  meals: Meals;
  handleClick: (link: string) => void;
  alert: string;
  handleClickFavorite: (FavoriteRecipe: Recipe) => void;
}) {
  const { inProgressRecipes,
    doneRecipes, favoriteRecipes,
    setInProgressRecipes } = useContext(LocalStorageContext);
  const [data, setData] = useState<Drinks[]>([]);
  const { strMeal, strMealThumb, strCategory, strYoutube, strInstructions } = meals;
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const path = useLocation().pathname;

  const ingredients = Object.entries(meals).reduce(
    (acc: string[], curr: string[]) => {
      if (
        curr[0].includes('strIngredient')
        && curr[1] !== null
        && curr[1] !== ''
      ) {
        acc.push(curr[1]);
      }
      return acc;
    },
    [],
  );

  const ingredientsAndNumbers = Object.entries(meals).reduce(
    (acc: string[], curr: string[]) => {
      if (
        curr[0].includes('strIngredient')
        && curr[1] !== null
        && curr[1] !== ''
      ) {
        acc.push(`${curr[0].substring(curr[0].length - 1)} ${curr[1]}`);
      }
      return acc;
    },
    [],
  );

  // Busca os dados do localStorage e retorna se o ingrediente estava checkado anteriormente
  const getChecked = (ingredientNum: number) => {
    if (inProgressRecipes.meals[meals.idMeal]) {
      return inProgressRecipes.meals[meals.idMeal].includes(ingredientNum);
    }
  };
  // Cria a chave da receita no seu respectivo objeto e adiciona o número do ingrediente nela.

  const addProgress = (ingredientNum: number) => {
    if (inProgressRecipes.meals[meals.idMeal].includes(ingredientNum)) {
      const ingredientList = inProgressRecipes.meals[meals.idMeal];
      const filtered = ingredientList.filter((ing) => ing !== ingredientNum);

      setInProgressRecipes({
        ...inProgressRecipes,
        [meals.idMeal]: filtered,
      });

      console.log({ filtered, ingredientList });
    } else {
      setInProgressRecipes({
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [meals.idMeal]: [...inProgressRecipes.meals[meals.idMeal], ingredientNum],
        },
      });
      console.log('ok');
    }
  };

  const measures = Object.entries(meals).reduce(
    (acc: string[], curr: string[]) => {
      if (curr[0].includes('strMeasure') && curr[1] !== null) {
        acc.push(curr[1]);
      }
      return acc;
    },
    [],
  );

  const recipeStatus = () => {
    if (inProgressRecipes.meals[meals.idMeal]) {
      return 'Continue Recipe';
    }
    if (doneRecipes.some((recipe) => recipe.id === meals.idMeal)) {
      return '';
    }
    return 'Start Recipe';
  };

  const status = recipeStatus();

  useEffect(() => {
    const recommendationMeals = async () => {
      try {
        const response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        );
        const drinkRecommendation = await response.json();
        setData(drinkRecommendation.drinks);
      } catch (error) {
        console.log(error);
      }
    };
    recommendationMeals();
    setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === meals.idMeal));
  }, [favoriteRecipes, meals.idMeal, inProgressRecipes]);

  return (
    <div>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        width="320"
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <h2 data-testid="recipe-category">{strCategory}</h2>
      {path.includes('progress') ? (
        ingredientsAndNumbers.map((ingredient, index) => (
          <label
            htmlFor={ ingredient }
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              name={ ingredient }
              id={ ingredient }
              checked={ getChecked(Number(ingredient.slice(0, 1))) }
              onChange={ () => addProgress(Number(ingredient.slice(0, 1))) }
            />
            {measures[index] === undefined
              ? `${ingredient.slice(2)}`
              : `${ingredient.slice(2)} - ${measures[index]}`}
          </label>
        ))
      ) : (ingredients.map((ingredient, index) => (
        <li
          key={ ingredient }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {measures[index] === undefined
            ? `${ingredient}`
            : `${ingredient} - ${measures[index]}`}
        </li>
      )))}
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        width="300"
        height="200"
        src={ strYoutube.replace('watch?v=', 'embed/') }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
        web-share"
        data-testid="video"
        allowFullScreen
      />
      <div style={ { display: 'flex', overflowY: 'scroll' } }>
        {data
          && data.slice(0, 6).map((drink, index) => (
            <div
              key={ drink.strDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                style={ { width: '50vw' } }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {drink.strDrink}
              </p>
            </div>
          ))}
      </div>
      {!path.includes('progress')
      && (status === 'Continue Recipe' || status === 'Start Recipe') && (
        <Buttons
          page={ `/meals/${meals.idMeal}/in-progress` }
          btnName={ status }
          testID="start-recipe-btn"
        />
      )}
      {path.includes('progress')
      && <Buttons
        page={ `/meals/${meals.idMeal}/done-recipes` }
        btnName="Finish Recipe"
        testID="finish-recipe-btn"
        visibility={ inProgressRecipes.meals[meals.idMeal] === undefined }
      />}
      <p>{alert}</p>
      <div>
        <button
          data-testid="share-btn"
          onClick={ () => handleClick(`http://localhost:3000/meals/${meals.idMeal}`) }
        >
          Share
        </button>
        <button
          onClick={ () => handleClickFavorite({
            id: meals.idMeal,
            type: 'meal',
            category: meals.strCategory,
            nationality: meals.strArea,
            alcoholicOrNot: '',
            name: meals.strMeal,
            image: strMealThumb,
          }) }
        >
          favorite
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? favoriteIcon : noIsFavoriteIcon }
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
