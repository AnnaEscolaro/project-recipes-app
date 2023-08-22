import { Meals } from '../types/typesApi';

export default function MealsDetails({ meals }: { meals: Meals }) {
  const { strMeal, strMealThumb, strCategory, strYoutube, strInstructions } = meals;

  const ingredients = Object.entries(meals).reduce(
    (acc: string[], curr: string[]) => {
      if (curr[0].includes('strIngredient') && curr[1] !== null) {
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

  return (
    <div>
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
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
        data-testid="video"
        title="Vídeo do YouTube"
        width="560"
        height="315"
        src={ strYoutube }
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
