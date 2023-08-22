import { useEffect, useState } from 'react';
import { Drinks, Meals } from '../types/typesApi';

export default function DrinksDetail({ drink }: { drink: Drinks }) {
  const [data, setData] = useState<Meals[]>([]);
  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions } = drink;
  const ingredients = Object.entries(drink).reduce(
    (acc: string[], curr: string[]) => {
      if (curr[0].includes('strIngredient') && curr[1] !== null) {
        acc.push(curr[1]);
      }
      return acc;
    },
    [],
  );
  const measures = Object.entries(drink).reduce(
    (acc: string[], curr: string[]) => {
      if (curr[0].includes('strMeasure') && curr[1] !== null) {
        acc.push(curr[1]);
      }
      return acc;
    },
    [],
  );

  useEffect(() => {
    const recomandationDrink = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        );
        const mealsRecomentation = await response.json();
        setData(mealsRecomentation.meals);
      } catch (error) {
        console.log(error);
      }
    };
    recomandationDrink();
  }, []);

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <h2 data-testid="recipe-category">{strAlcoholic}</h2>
      <ul>
        Ingredientes:
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
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <div style={ { display: 'flex', overflowY: 'scroll' } }>
        {data
          && data.slice(0, 6).map((meals, index) => (
            <div
              key={ meals.strMeal }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ meals.strMealThumb }
                alt={ meals.strMeal }
                style={ { width: '50vw' } }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {meals.strMeal}
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
