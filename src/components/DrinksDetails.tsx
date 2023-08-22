import { Drinks } from '../types/typesApi';

export default function DrinksDetail({ drink }: { drink: Drinks }) {
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
    </div>
  );
}
