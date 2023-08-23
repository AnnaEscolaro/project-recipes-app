import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Drinks, Meals } from '../types/typesApi';
import { LocalStorageContext } from '../context/LocalStorageContext/LocalStorageContext';

export default function MealsDetails({ meals }: { meals: Meals }) {
  const [data, setData] = useState<Drinks[]>([]);
  const { strMeal, strMealThumb, strCategory, strYoutube, strInstructions } = meals;

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

  const { inProgressRecipes, doneRecipes } = useContext(LocalStorageContext);

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
  }, []);

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
      { (status === 'Continue Recipe' || status === 'Start Recipe')
      && (
        <Link
          to={ `/meals/${meals.idMeal}/in-progress` }
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: 0 } }
        >
          { status }
        </Link>)}
    </div>
  );
}
