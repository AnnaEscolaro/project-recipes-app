import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './Helpers/renderWithRouter';
import fetchData from './Mocks/mockFetch';
import meals from './Mocks/mockMeals';

const checkFirstTwelveRecipes = (recipes: object[], meal = true) => {
  // const recipeType = meal ? 'Meal' : 'Drink';

  recipes.slice(0, 12).forEach((recipe: any, index) => {
    expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();

    // expect(screen.getByTestId(`${index}-card-img`))
    //   .toHaveAttribute('src', recipe[`str${recipeType}Thumb`]);

    // expect(screen.getByTestId(`${index}-card-name`)).contains(recipe[`str${recipeType}`]);
  });

  // expect(screen.getByTestId('[data-testid="12-recipe-card"]')).not.toBeInTheDocument();
  // expect(screen.getByTestId(('[data-testid="12-card-img"]'))).not.toBeInTheDocument();
  // expect(screen.getByTestId('[data-testid="12-card-name"]')).not.toBeInTheDocument();
};

describe('Teste o componente Recipes.tsx', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica se na rota "/meals" carrega as 12 primeiras receitas', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    // global.fetch = vi.fn().mockResolvedValue(fetchData);
    await waitFor(() => {
      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    }, {
      timeout: 5000,
    });
    checkFirstTwelveRecipes(meals.meals);
  });
});
