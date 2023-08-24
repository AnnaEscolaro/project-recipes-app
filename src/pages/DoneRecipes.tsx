import { useLocalStorage } from '../hooks/useLocalStorage';
import { DoneRecipe, DoneRecipes } from '../types/typesLocalStorage';
import CardDoneRecipes from '../components/CardDoneRecipes';

export default function AllDoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);

  return (
    <div>
      <h1>DoneRecipes</h1>
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        doneRecipes?.map(({
          id,
          category,
          name,
          image,
          doneDate,
          tags,
        }: DoneRecipe, index) => (
          <CardDoneRecipes
            key={ id }
            id={ id }
            index={ index }
            image={ image }
            category={ category }
            name={ name }
            doneDate={ doneDate }
            tags={ tags }
          />
        ))
      }
    </div>
  );
}
