import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import RecipeDetails from '../pages/RecipeDetails';
import { renderWithRouter } from './Helpers/renderWithRouter';
import {
  mockMealsDetails,
  mockMealsDetailsNoMeasure,
} from './Mocks/mockMealsDetails';
import { drinksMockDetail } from './Mocks/mockDrinkDetail';
import RecipeInProgress from '../pages/RecipeInProgress';

const mealsPath = '/meals/52977/in-progress';
const recipePhoto = 'recipe-photo';
const btnStartRecipe = 'start-recipe-btn';
const btnFavorite = 'favorite-btn';
const drinkPath = '/drink/15997';

test('Inputs de checkbox e finish button renderizam corretamente', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => mockMealsDetails,
  });

  renderWithRouter(<RecipeInProgress />, { route: mealsPath });

  expect(await screen
    .findByTestId('12-ingredient-step')).toBeInTheDocument();

  expect(await screen
    .findByTestId('finish-recipe-btn'));
});

test('É possível tickar as checkboxes e elas ficam riscadas', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => mockMealsDetails,
  });

  const { user } = renderWithRouter(<RecipeInProgress />, { route: mealsPath });

  const step = await screen.findByTestId('0-ingredient-step');

  expect(await screen.findByLabelText('Lentils - 1 cup')).toBeInTheDocument();

  await user.click(step);

  expect(step).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
});

test('É possível encontrar o id da Receita na localStorage após tickar ingrediente', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => mockMealsDetails,
  });

  const { user } = renderWithRouter(<RecipeInProgress />, { route: mealsPath });

  const step = await screen.findByTestId('0-ingredient-step');

  await user.click(step);

  const data = localStorage.getItem(
    'doneRecipes',
  );

  console.log(data);
});
