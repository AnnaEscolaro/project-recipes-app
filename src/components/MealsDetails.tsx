import { useEffect, useState } from 'react';
import { Drinks, Meals } from '../types/typesApi';

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

  useEffect(() => {
    const recomandationMeals = async () => {
      try {
        const response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        );
        const drinkRecomantation = await response.json();
        setData(drinkRecomantation.drinks);
      } catch (error) {
        console.log(error);
      }
    };
    recomandationMeals();
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
      <button
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: 0 } }
      >
        Start Recipe
      </button>
    </div>
  );
}
