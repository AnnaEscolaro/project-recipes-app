import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { renderWithRouter } from './Helpers/renderWithRouter';
import App from '../App';
import { MockFetchMeals } from './Mocks/MockFetchMeals';

describe('Testando o componente SearchBar', () => {
  const searchInput = 'search-input';

  beforeEach(() => {
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
    await user.type(textInput, 'chicken');
    await user.click(ingredient);
    await user.click(searchButtonBar);

    expect('Brown Stew Chicken').toBeInTheDocument();
  });

  test('Se o filtro name funciona corretamente na tela meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const name = screen.getByLabelText(/Name/i);
    const searchButtonHeader = screen.getByTestId('btn-Click');
    const searchButtonBar = screen.getByRole('button', { name: /Search/i });

    await user.click(searchButtonHeader);
    const textInput = screen.getByTestId(searchInput);
    await user.type(textInput, 'carbonara');
    await user.click(name);
    await user.click(searchButtonBar);

    expect('Spaghetti alla Carbonara').toBeInTheDocument();
  });

  test('Se o filtro firstletter funciona corretamente na tela meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const firstLetter = screen.getByLabelText(/First-Letter/i);
    const searchButtonHeader = screen.getByTestId('btn-Click');
    const searchButtonBar = screen.getByRole('button', { name: /Search/i });

    await user.click(searchButtonHeader);
    const textInput = screen.getByTestId(searchInput);
    await user.type(textInput, 'a');
    await user.click(firstLetter);
    await user.click(searchButtonBar);

    expect('Apple Frangipan Tart').toBeInTheDocument();
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

  test('Se aparece um alerta na tela de meals caso a receita não exista', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const ingredient = screen.getByLabelText(/Ingredient/i);
    const searchButtonHeader = screen.getByTestId('btn-Click');
    const searchButtonBar = screen.getByRole('button', { name: /Search/i });

    await user.click(searchButtonHeader);
    const textInput = screen.getByTestId(searchInput);
    await user.type(textInput, 'trybe@trybe');
    await user.click(ingredient);
    await user.click(searchButtonBar);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
