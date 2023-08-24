import { useContext, useEffect, useState } from 'react';
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
    doneRecipes, favoriteRecipes } = useContext(LocalStorageContext);
  const [data, setData] = useState<Drinks[]>([]);
  const { strMeal, strMealThumb, strCategory, strYoutube, strInstructions } = meals;
  const [isFavorite, setIsFavorite] = useState<boolean>();

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
  }, [favoriteRecipes, meals.idMeal]);

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
      {ingredients.map((ingredient, index) => (
        <li
          key={ ingredient }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {measures[index] === undefined
            ? `${ingredient}`
            : `${ingredient} - ${measures[index]}`}
        </li>
      ))}
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
      {(status === 'Continue Recipe' || status === 'Start Recipe') && (
        <Buttons
          page={ `/meals/${meals.idMeal}/in-progress` }
          btnName={ status }
          testID="start-recipe-btn"
        />
      )}
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
