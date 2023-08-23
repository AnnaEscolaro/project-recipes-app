import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { renderWithRouter } from './Helpers/renderWithRouter';
import { MockFetchMeals } from './Mocks/MockFetchMeals';
import App from '../App';

describe('Testando o componente SearchBar', () => {
  const searchInput = 'search-input';
  const expectedMeal = 'Spicy Arrabiata Penne';

  beforeEach(() => {
    window.alert = vi.fn(() => {});
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => MockFetchMeals,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Se as opções de input e o botão search são renderizados na tela meals', () => {
    renderWithRouter(<App />, { route: '/meals' });
    const ingredient = screen.getByLabelText(/Ingredient/i);
    const name = screen.getByLabelText(/Name/i);
    const firstLetter = screen.getByLabelText(/First-Letter/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('Se o filtro ingredient funciona corretamente na tela meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const ingredient = screen.getByLabelText(/Ingredient/i);
    const searchButtonHeader = screen.getByTestId('btn-Click');
    const searchButtonBar = screen.getByRole('button', { name: /Search/i });

    await user.click(searchButtonHeader);
    const textInput = screen.getByTestId(searchInput);
    await user.type(textInput, 'penne rigate');
    await user.click(ingredient);
    await user.click(searchButtonBar);

    const meal = await screen.findByText(expectedMeal);
    expect(meal).toBeInTheDocument();
  });

  test('Se o filtro name funciona corretamente na tela meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const name = screen.getByLabelText(/Name/i);
    const searchButtonHeader = screen.getByTestId('btn-Click');
    const searchButtonBar = screen.getByRole('button', { name: /Search/i });

    await user.click(searchButtonHeader);
    const textInput = screen.getByTestId(searchInput);
    await user.type(textInput, 'Arrabiata');
    await user.click(name);
    await user.click(searchButtonBar);

    const meal = await screen.findByText(expectedMeal);
    expect(meal).toBeInTheDocument();
  });

  test('Se o filtro firstletter funciona corretamente na tela meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const firstLetter = screen.getByLabelText(/First-Letter/i);
    const searchButtonHeader = screen.getByTestId('btn-Click');
    const searchButtonBar = screen.getByRole('button', { name: /Search/i });

    await user.click(searchButtonHeader);
    const textInput = screen.getByTestId(searchInput);
    await user.type(textInput, 's');
    await user.click(firstLetter);
    await user.click(searchButtonBar);

    const meal = await screen.findByText(expectedMeal);
    expect(meal).toBeInTheDocument();
  });

  test('Se aparece um alerta na tela de meals caso sejam digitadas mais de uma letra no filtro firstletter', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const firstLetter = screen.getByLabelText(/First-Letter/i);
    const searchButtonHeader = screen.getByTestId('btn-Click');
    const searchButtonBar = screen.getByRole('button', { name: /Search/i });

    await user.click(searchButtonHeader);
    const textInput = screen.getByTestId(searchInput);
    await user.type(textInput, 'aa');
    await user.click(firstLetter);
    await user.click(searchButtonBar);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});

describe('Testando o alerta de receita não encontrada', () => {
  test('Se aparece um alerta na tela de meals caso a receita não exista', async () => {
    window.alert = vi.fn();
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => null,
    });
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const name = screen.getByLabelText(/Name/i);
    const searchButtonHeader = screen.getByTestId('btn-Click');
    const searchButtonBar = screen.getByRole('button', { name: /Search/i });

    await user.click(searchButtonHeader);
    const textInput = screen.getByTestId('search-input');
    await user.type(textInput, 'trybe');
    await user.click(name);
    await user.click(searchButtonBar);

    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
