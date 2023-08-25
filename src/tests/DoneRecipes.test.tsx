import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouter } from './Helpers/renderWithRouter';
import { mockFetchDrinksByName } from './Mocks/mockDrinksByName';
import { mockFetchMealsByName } from './Mocks/mockMealsByName';

describe('Testando o componente DoneRecipes', () => {
  const ROUTE = '/done-recipes';

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica se o componente renderiza corretamente quando esta na rota "/done-recipes"', () => {
    global.fetch = vi.fn();

    renderWithRouter(<App />, { route: ROUTE });

    const title = screen.getByText(/Done Recipes/i);
    expect(title).toBeInTheDocument();
  });

  test('Verifica se os drinks finalizados são renderizados', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mockFetchDrinksByName,
    });

    renderWithRouter(<App />, { route: ROUTE });

    const name = screen.getByText(/Moscow Mule/i);
    const alcoholicOrNot = screen.getByText(/Alcoholic'/i);
    const image = screen.getByRole('img');

    expect(name).toBeInTheDocument();
    expect(alcoholicOrNot).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg');
  });

  test('Verifica se a meals finalizadas são renderizadas', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mockFetchMealsByName,
    });

    renderWithRouter(<App />, { route: ROUTE });

    const name = screen.getByText(/Creamy Tomato Soup/i);
    const image = screen.getByRole('img');
    const category = screen.getByText(/Starter/i);
    const nationality = screen.getByText(/British/i);

    expect(name).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(nationality).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg');
  });
});
